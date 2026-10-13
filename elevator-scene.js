// A photographed facade and a separate car share building coordinates.
// Camera tracking never substitutes for the actual car's vertical displacement.
const clamp = v => Math.max(0, Math.min(1, v));
const range = (p, a, b) => clamp((p - a) / (b - a));
const smooth = t => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

// Integrated trapezoidal speed profile: accelerate, cruise, brake to a stop.
export function travelCurve(t) {
  const a = .14;
  t = clamp(t);
  if (t < a) return t * t / (2 * a * (1 - a));
  if (t > 1 - a) return 1 - (1 - t) ** 2 / (2 * a * (1 - a));
  return (t - a / 2) / (1 - a);
}

export function renderBuildingDescent(ctx, plates, width, height, p, hallOpening) {
  const facade = plates.facade;
  const iw = facade.width, ih = facade.height;
  const trip = travelCurve(range(p, .225, .585));
  const approach = smooth(range(p, .565, .666));
  const floor = Math.max(0, Math.ceil(24 * (1 - trip) - .0001));
  const shaftX = iw * .511;
  const carHeight = ih * .033;
  const carWidth = carHeight * .64;
  const carFoot = lerp(ih * .108, ih * .916, trip);
  const carTop = carFoot - carHeight;
  const focalX = width < 700 ? .5 : .63;
  const baseScale = Math.max(width * focalX / shaftX, width * (1 - focalX) / (iw - shaftX), height / (ih * .24));
  const scale = baseScale * lerp(1.015, 1.18, smooth(range(p, .17, .34)));
  let x = width * focalX - shaftX * scale;
  let y = height * .47 - (carTop + carHeight * .5) * scale;
  let cameraScale = scale;

  // Match the photographed entrance to the lobby door before cutting inside.
  const groundDoor = { x: iw * .509, cy: ih * .896, h: ih * .043 };
  const landingScale = hallOpening.h / groundDoor.h;
  const landingX = hallOpening.x + hallOpening.w / 2 - groundDoor.x * landingScale;
  const landingY = hallOpening.y + hallOpening.h / 2 - groundDoor.cy * landingScale;
  cameraScale = lerp(scale, landingScale, approach);
  x = lerp(x, landingX, approach);
  y = lerp(y, landingY, approach);
  // The facade plate covers the viewport even while the camera reframes.
  x = Math.min(0, Math.max(width - iw * cameraScale, x));
  y = Math.min(0, Math.max(height - ih * cameraScale, y));

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(cameraScale, cameraScale);
  ctx.drawImage(facade, 0, 0);

  // Everything in the shaft is behind its glass and behind the solid lobby wall.
  const glass = { x: iw * .470, y: ih * .061, w: iw * .083, h: ih * .794 };
  ctx.save();
  ctx.beginPath(); ctx.rect(glass.x, glass.y, glass.w, glass.h); ctx.clip();
  const left = shaftX - carWidth / 2;
  ctx.save();
  ctx.globalAlpha *= .32;
  ctx.fillStyle = '#101c21';
  ctx.fillRect(left - 2, carTop + 2, carWidth + 4, carHeight + 2);
  ctx.restore();
  // Suspension cables follow the cabin; steel-guide geometry stays stationary.
  ctx.strokeStyle = 'rgba(30,39,44,.52)'; ctx.lineWidth = .65;
  ctx.beginPath();
  for (const offset of [-4, -1.5, 1.5, 4]) {
    ctx.moveTo(shaftX + offset, glass.y); ctx.lineTo(shaftX + offset, carTop);
  }
  ctx.stroke();
  ctx.save(); ctx.filter = 'brightness(.82) saturate(.76)';
  ctx.drawImage(plates.cabin, 184, 73, 682, 1354, left, carTop, carWidth, carHeight);
  ctx.restore();

  // Mozart stays inside the travelling cabin. The same source pose is used in the lobby.
  const bodyH = carHeight * .69;
  const bodyW = bodyH * 231 / 592;
  ctx.save(); ctx.globalAlpha *= .65;
  ctx.drawImage(plates.person, 673, 630, 231, 592, shaftX - bodyW / 2, carFoot - carHeight * .064 - bodyH, bodyW, bodyH);
  ctx.restore();

  // Fixed shaft glazing is reflected over the car, not painted as an opaque box.
  ctx.save(); ctx.globalAlpha *= .28;
  ctx.drawImage(facade, left, carTop, carWidth, carHeight, left, carTop, carWidth, carHeight);
  ctx.restore();
  const glassLight = ctx.createLinearGradient(left, carTop, left + carWidth, carFoot);
  glassLight.addColorStop(0, 'rgba(245,235,203,.08)');
  glassLight.addColorStop(.45, 'rgba(226,236,236,.015)');
  glassLight.addColorStop(.52, 'rgba(247,247,227,.12)');
  glassLight.addColorStop(1, 'rgba(17,39,48,.08)');
  ctx.fillStyle = glassLight; ctx.fillRect(left, carTop, carWidth, carHeight);
  // Thin rails occlude the car. Real horizontal mullions are sampled from the plate.
  for (const rail of [.479, .545]) {
    ctx.drawImage(facade, iw * rail, glass.y, 1.4, glass.h, iw * rail, glass.y, 1.4, glass.h);
  }
  for (let level = 0; level < 24; level++) {
    const beamY = ih * (.108 + level * (.747 / 23));
    if (beamY < carTop - 2 || beamY > carFoot + 2) continue;
    ctx.save(); ctx.globalAlpha *= .72;
    ctx.drawImage(facade, glass.x, beamY, glass.w, 1.7, glass.x, beamY, glass.w, 1.7);
    ctx.restore();
  }
  ctx.restore();
  ctx.restore();
  return {
    floor, trip, worldCarY: carFoot / ih, cameraY: -y / cameraScale / ih,
    car: { x: x + shaftX * cameraScale, y: y + carTop * cameraScale, w: carWidth * cameraScale, h: carHeight * cameraScale },
    approach
  };
}
