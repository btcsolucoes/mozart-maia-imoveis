// Photographic skyline: rigid towers rise from the avenue, behind the palm canopy.
// The caller supplies the scroll clock. No timers, event handlers, or scroll ownership.
const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => value * value * value * (value * (value * 6 - 15) + 10);
const DESIGN_WIDTH = 1448;
const DESIGN_HEIGHT = 543;
const AVENUE = 405;

// Traced facade silhouettes in the photographic master. Ground-level architecture,
// palms, sand, and water remain on one uninterrupted foreground plate.
const facades = [
  { start: .02, points: [[0,299],[14,296],[14,290],[28,290],[28,296],[41,297],[49,304],[49,351],[0,351]] },
  { start: .04, points: [[49,88],[53,83],[66,83],[66,79],[101,79],[101,81],[113,82],[122,88],[122,351],[49,351]] },
  { start: .07, points: [[121,265],[129,262],[134,270],[134,287],[145,289],[145,301],[156,303],[156,351],[121,351]] },
  { start: .10, points: [[157,218],[165,214],[178,214],[178,206],[194,205],[197,213],[211,213],[211,220],[221,222],[221,351],[157,351]] },
  { start: .13, points: [[244,254],[255,249],[273,247],[273,241],[292,239],[306,244],[306,251],[324,252],[338,259],[338,351],[243,351]] },
  { start: .16, points: [[341,185],[347,183],[347,170],[368,169],[368,164],[387,164],[388,169],[399,171],[404,181],[404,351],[341,351]] },
  { start: .19, points: [[404,226],[420,223],[430,231],[430,252],[442,254],[446,282],[458,288],[460,351],[404,351]] },
  { start: .22, points: [[482,106],[488,101],[507,101],[507,96],[527,96],[532,102],[532,112],[555,112],[560,122],[563,351],[481,351]] },
  { start: .25, points: [[584,316],[599,310],[602,224],[611,220],[617,218],[628,220],[630,208],[639,206],[648,208],[648,218],[663,218],[663,222],[678,224],[681,351],[583,351]] },
  { start: .28, points: [[688,129],[694,125],[707,124],[707,129],[737,130],[739,151],[750,151],[750,157],[746,160],[749,351],[687,351]] },
  { start: .31, points: [[750,285],[761,285],[761,278],[770,284],[777,283],[779,264],[791,259],[793,256],[805,263],[805,351],[749,351]] },
  { start: .34, points: [[807,207],[824,206],[824,211],[838,212],[844,219],[845,351],[806,351]] },
  { start: .37, points: [[857,198],[862,190],[876,190],[877,186],[886,188],[888,194],[906,198],[911,204],[913,351],[857,351]] },
  { start: .40, points: [[919,328],[926,325],[926,292],[937,292],[938,284],[953,284],[959,292],[963,296],[965,325],[978,325],[980,306],[990,303],[996,309],[997,351],[918,351]] },
  { start: .43, points: [[997,219],[1008,213],[1032,210],[1032,203],[1045,203],[1047,209],[1071,210],[1083,217],[1083,351],[997,351]] },
  { start: .46, points: [[1097,307],[1107,304],[1107,297],[1118,298],[1120,292],[1129,293],[1131,302],[1149,303],[1159,310],[1163,351],[1097,351]] },
  { start: .49, points: [[1162,211],[1169,207],[1170,198],[1183,197],[1183,191],[1195,192],[1197,200],[1210,201],[1218,205],[1220,351],[1162,351]] },
  { start: .52, points: [[1252,184],[1263,180],[1264,175],[1286,173],[1289,179],[1304,181],[1308,190],[1308,351],[1252,351]] },
  { start: .55, points: [[1310,261],[1318,258],[1319,251],[1329,250],[1331,255],[1342,258],[1347,270],[1348,351],[1309,351]] },
  { start: .58, points: [[1348,208],[1361,198],[1365,188],[1378,188],[1379,181],[1401,183],[1403,196],[1419,199],[1421,213],[1427,351],[1348,351]] },
  { start: .61, points: [[1426,324],[1432,319],[1433,314],[1440,316],[1447,321],[1448,351],[1426,351]] }
];

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Skyline photograph could not load: ${source}`));
    image.src = source;
  });
}

function makeFacade(image, facade) {
  const scale = image.naturalWidth / DESIGN_WIDTH;
  const left = Math.floor(Math.min(...facade.points.map(point => point[0])));
  const top = Math.floor(Math.min(...facade.points.map(point => point[1])));
  const right = Math.ceil(Math.max(...facade.points.map(point => point[0])));
  const layer = document.createElement('canvas');
  layer.width = Math.ceil((right - left + 1) * scale);
  layer.height = Math.ceil((AVENUE + 1 - top) * scale);
  const context = layer.getContext('2d');
  context.scale(scale, scale);
  context.beginPath();
  facade.points.forEach(([x, y], index) => {
    const groundY = y === 351 ? AVENUE + 1 : y;
    if (index === 0) context.moveTo(x - left, groundY - top);
    else context.lineTo(x - left, groundY - top);
  });
  context.closePath();
  context.clip();
  context.drawImage(image, -left, -top, DESIGN_WIDTH, DESIGN_HEIGHT * 2);
  return { image: layer, left, top, width: right - left + 1, height: AVENUE + 1 - top, start: facade.start };
}

function makeForeground(image) {
  const layer = document.createElement('canvas');
  layer.width = DESIGN_WIDTH;
  layer.height = DESIGN_HEIGHT;
  const context = layer.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, image.naturalHeight / 2, image.naturalWidth, image.naturalHeight / 2, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  const pixels = context.getImageData(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  // The empty coastal plate supplies the actual palm silhouette. A luminance and
  // blue-channel matte retains leaves, trunks and lampposts, and removes their sky.
  // It is computed once; organic photographic edges replace a horizontal crop.
  for (let y = 0; y < DESIGN_HEIGHT; y++) {
    for (let x = 0; x < DESIGN_WIDTH; x++) {
      const index = (y * DESIGN_WIDTH + x) * 4;
      if (y < 320) { pixels.data[index + 3] = 0; continue; }
      if (y > 406) continue;
      const luminance = .2126 * pixels.data[index] + .7152 * pixels.data[index + 1] + .0722 * pixels.data[index + 2];
      const darkLeaf = ease(clamp((177 - luminance) / 46));
      const warmLeaf = ease(clamp((175 - pixels.data[index + 2]) / 55));
      const ground = ease(clamp((y - 392) / 14));
      pixels.data[index + 3] = Math.round(255 * Math.max(darkLeaf * warmLeaf, ground));
    }
  }
  context.putImageData(pixels, 0, 0);
  return layer;
}

export async function createSkylineScene() {
  const url = new URL('./assets/skyline-boa-viagem-v5.webp', import.meta.url).href;
  const photo = await loadImage(url);
  const layers = facades.map(facade => makeFacade(photo, facade));
  const foreground = makeForeground(photo);
  const panelHeight = photo.naturalHeight / 2;

  function render(context, width, height, rawProgress) {
    const progress = clamp(rawProgress);
    const scale = Math.max(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
    // The camera stays fixed while architecture rises. Portrait crops retain the
    // central towers without stretching their perspective or facade proportions.
    const focal = width < 700 ? .47 : .5;
    const x = (width - DESIGN_WIDTH * scale) * focal;
    const y = (height - DESIGN_HEIGHT * scale) * .48;
    const heights = [];
    context.save();
    context.translate(x, y);
    context.scale(scale, scale);
    context.drawImage(photo, 0, panelHeight, photo.naturalWidth, panelHeight, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
    context.save();
    context.beginPath();
    context.rect(0, 0, DESIGN_WIDTH, AVENUE + 1);
    context.clip();
    for (const layer of layers) {
      const amount = ease(clamp((progress - layer.start) / .37));
      heights.push(amount);
      if (amount <= 0) continue;
      const offset = layer.height * (1 - amount);
      context.drawImage(layer.image, layer.left, layer.top + offset, layer.width, layer.height);
    }
    context.restore();
    // The building-free lower plate supplies an organic canopy with no phantom
    // building stumps. Its photographic alpha matte occludes each facade naturally.
    context.drawImage(foreground, 0, 0);
    context.restore();
    return {
      progress,
      total: layers.length,
      complete: heights.filter(value => value >= .999).length,
      meanHeight: heights.reduce((sum, value) => sum + value, 0) / layers.length,
      heights
    };
  }

  return { render, assets: [url], totalBuildings: layers.length };
}
