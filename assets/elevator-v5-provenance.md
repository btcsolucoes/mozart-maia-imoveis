# Fachada e cabine do elevador — revisão 5

Imagens geradas com a ferramenta imagegen integrada em 12 de outubro de 2026 para a abertura do site de Mozart Maia. São composições ilustrativas de aparência fotográfica, inspiradas na arquitetura da orla de Boa Viagem. Não registram um edifício real, um imóvel anunciado ou uma viagem real de elevador.

## Arquivos e preparação

| Arquivo publicado | Dimensões | Papel na composição |
| --- | --- | --- |
| `tower-facade-v5.webp` | 725 × 2170 | Fachada completa, do rooftop ao térreo, com poço central envidraçado. |
| `lift-cabin-v5.webp` | 1045 × 1505, com transparência | Cabine independente, recortada em tempo de execução e deslocada pelo poço. |

Os PNG originais permanecem no diretório de imagens geradas. A conversão para WebP alterou apenas a codificação; recorte, posicionamento, reflexos, sombra e oclusão são feitos pelo Canvas em `elevator-scene.js`.

- Fachada: `C:\Users\berna\.codex\generated_images\01a11e8b-0ce2-7942-a42d-2b06d3726f3b\exec-2db20f40-eabd-4cd7-ad3d-a068ac2449d3.png`.
- Cabine: `C:\Users\berna\.codex\generated_images\01a11e8b-0ce2-7942-a42d-2b06d3726f3b\exec-e6d2871b-0f21-46c1-a6e6-6b305969b170.png`.

## Briefs de geração

Os registros abaixo resumem os prompts e as restrições usados na geração; não são transcrições literais das chamadas.

**Fachada.** Fotografia arquitetônica realista em elevação frontal, com correção de perspectiva, proporção vertical aproximada de 1:3 e um edifício costeiro inspirado em Boa Viagem, de aparência compatível com 24 andares. Mostrar a cobertura perto do topo e o térreo perto da base, concreto e pedra claros, vidro fumê e luz quente natural vinda da parte superior esquerda. Reservar um poço vertical central e reto, envidraçado, com largura próxima de 14% da imagem e percurso do alto até próximo do térreo. Incluir palmeiras e entrada no nível da rua. Não incluir cabine, pessoas, texto, logotipos ou colagem. Usar as imagens existentes do rooftop e do hall como referências de material, iluminação e coerência arquitetônica.

**Cabine.** Fotografia frontal de uma cabine de elevador panorâmico isolada, usando a fachada recém-gerada como referência. Enquadramento paralelo, sem vista lateral em perspectiva, estrutura metálica, interior marfim quente e portas frontais duplas de vidro fechadas, com reflexos suaves do céu. Luz costeira natural, proporção solicitada de aproximadamente 2 m de largura por 2,9 m de altura. Exterior transparente para permitir composição independente. Não incluir pessoa, cabos, edifício externo, texto ou logotipos.

## Integração e limites

A animação usa a posição da cabine como referência para o acompanhamento da câmera e para o contador de andares. A chegada ao térreo ocorre antes da transição para o hall e da abertura das portas. O personagem usa o atlas de poses já existente, produzido com referência no retrato de Mozart e autorização do solicitante. A fachada, a cabine e o hall foram gerados separadamente e integrados por enquadramento e transição; não constituem um modelo tridimensional fisicamente contínuo nem filmagem real.
