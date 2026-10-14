# Recortes preparados para a animação 6.7

Derivações das imagens existentes, sem geração de novos cenários. Exportadas com Canvas `toDataURL('image/webp', .94)` em 14/10/2026. Preservam a autoria e os avisos de ilustração dos materiais de origem.

- `skyline-tower-0.webp` a `skyline-tower-20.webp`: silhuetas produzidas por `makeFacade` do módulo histórico `skyline-scene.js`, a partir de `skyline-boa-viagem-v5.webp`. Posição, dimensão lógica e início de cada subida em `skyline.json`.
- `skyline-ground.webp`: painel inferior da mesma imagem, omitindo três pixels da borda de divisão; reduzido para 1448×543 e com transparência gradual nos 28 pixels superiores, conforme o algoritmo da revisão 6.6.
- `skyline-palms.webp`: máscara de vegetação/chão produzida por `makeForeground` do módulo histórico, 1448×543. O cálculo de pixels sai do navegador do visitante.
- `mozart-pose.webp`: recorte x673, y630, 231×592 de `mozart-atlas-v65.webp`, sem filtro adicional. Mantém transparência; a preparação da articulação continua em `person-motion.js`.
- `elevator-car.webp`: recorte x80, y120, 790×1420 de `cabin-coast-v6.webp`, reduzido para 240×460; mesmos filtros anteriores `brightness(.76) saturate(.75)`.
- `elevator-interior.webp`: usando fw como metade da largura e fh como altura de `elevator-frames.webp`, recorte `(fw+fw*.406, fh*.167, fw*.247, fh*.635)` para 400×880; mesmos filtros `saturate(.58) brightness(.72)`.

As imagens são apenas os materiais que já apareciam na animação. Fontes e proveniência anteriores: `../skyline-v5-provenance.md`, `../coastal-v6-provenance.md` e `../v66-provenance.md`.
