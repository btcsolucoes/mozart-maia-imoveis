---
name: Mozart Maia — Orla Atlântica
description: Corretagem em Recife com fotografia costeira, tipografia aberta e movimento espacial.
colors:
  paper: "#103d54"
  surface: "#174c62"
  field: "#15394c"
  ink: "#f6fafb"
  muted: "#c2d9e1"
  accent: "#b9e5d4"
  accent-hover: "#d5f4e7"
  on-accent: "#123c45"
  line: "#3d687a"
  field-line: "#82acbd"
  field-border: "#80aaba"
  error: "#ffb1a5"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(46px, 5.4vw, 76px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(40px, 4.9vw, 70px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(29px, 3vw, 43px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.035em"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.6
  button:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "17px"
    fontWeight: 650
    lineHeight: 1.3
rounded:
  photograph: "16px"
  field: "12px"
  capsule: "999px"
  round: "50%"
spacing:
  compact: "8px"
  inline: "16px"
  group: "24px"
  columns: "48px"
  gutter: "clamp(22px, 6vw, 92px)"
  section: "clamp(76px, 9vw, 140px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.capsule}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-motion:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.capsule}"
    padding: "10px 15px"
  button-motion-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  intent-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.capsule}"
    padding: "10px 15px"
  intent-chip-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "15px 18px"
  whatsapp-float:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.round}"
    width: "44px"
    height: "44px"
  contact-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
---

# Design System: Mozart Maia — Orla Atlântica

## Overview

**Creative North Star: "Orla Atlântica"**

A identidade aproxima o visitante da corretagem em Recife por meio da orla, da arquitetura e da presença de Mozart. Superfícies azuis contínuas, texto claro, ações verde-água e fotografias amplas criam um percurso espaçoso. A informação permanece em grupos abertos; fotografia, tipografia e divisórias organizam o conteúdo.

O movimento segue a posição da rolagem: aproximação da fachada, descida da cabine, chegada, abertura da porta, representação de Mozart e crescimento do horizonte. Nas seções seguintes, fotografias mudam de enquadramento, o retrato se revela e uma linha acompanha o processo de atendimento. Texto e contato continuam disponíveis na apresentação estática.

Este registro substitui a direção da revisão 5 por autorização de mudança visual e descreve o código da revisão 6.6. A ordem efetiva das folhas é estilos básicos, abertura, movimento de conteúdo e ajustes costeiros. O contrato está em `../work/v6-direction.md`; os fatos duráveis permanecem em `PRODUCT.md`. Os tokens acima refletem o resultado dessa cascata.

**Key Characteristics:**
- Azul oceânico contínuo com contraste claro e ações verde-água.
- Manrope para títulos; Source Sans 3 para leitura e controles.
- Fotografias amplas, cantos suaves e grupos de texto abertos.
- Movimento espacial reversível com alternativa estática completa.
- Cabeçalho transparente na abertura, controles flutuantes discretos e três idiomas.

## Colors

A paleta traduz água profunda, luz salina e verde-água; mantém a mesma identidade nas preferências clara e escura do sistema.

### Primary

- **Verde-água — accent:** ações principais, seleção, foco, progressão e ênfase de leitura; **accent-hover** clareia o estado de interação.
- **Azul de ação — on-accent:** texto e símbolos sobre o verde-água.

### Secondary

- **Atlântico — paper:** fundo contínuo da página e do cabeçalho fora da abertura.
- **Água iluminada — surface:** superfície de contato e estado de passagem dos controles de idioma.
- **Enseada — field:** interior dos campos, distinguido da superfície de contato.

### Neutral

- **Sal — ink:** títulos, conteúdo principal e rótulos.
- **Bruma — muted:** texto secundário, apoio, legendas e avisos de privacidade.
- **Linha costeira — line:** divisórias e trilha do processo.
- **Borda de controle — field-line:** chips e controles compactos. A borda dos campos usa o ajuste **field-border** da folha costeira.
- **Erro — error:** borda e mensagem de validação; não é um acento decorativo.

**The Continuous Coast Rule.** Preserve a continuidade azul entre navegação, conteúdo e contato; diferencie superfícies por tom e espaço.

## Typography

**Display Font:** Manrope, com fallback sans-serif. **Body Font:** Source Sans 3, com fallback sans-serif. As duas famílias são locais, com licenças SIL OFL em `assets`.

A geometria aberta de Manrope sustenta títulos amplos sem ornamentação; Source Sans 3 permite parágrafos, detalhes técnicos e formulários confortáveis. O texto não depende de caixas altas ou de uma segunda família dentro da mesma frase para ganhar destaque.

### Hierarchy

- **Display:** título da abertura, conforme o token display; na largura de até 700px usa `clamp(40px, 9.4vw, 60px)` e até 540px usa `clamp(32px, 8.8vw, 46px)`.
- **Headline:** título dos serviços, conforme o token headline; perfil e processo usam variações contextuais de `clamp(40px, 4.5vw, 64px)` e `clamp(40px, 4.7vw, 66px)`. O panorama usa `clamp(40px, 5.6vw, 80px)` com entrelinha 1.05.
- **Title:** títulos de compra, venda e avaliação; no celular passam a 34px. Títulos do processo usam 26px.
- **Body:** texto principal conforme o token body, limitado globalmente a 68ch. Introduções podem usar 20–22px; os textos de serviços têm largura de 43ch no desktop.
- **Label:** rótulos de formulário e legenda do assunto conforme o token label; navegação usa 16px e controles de idioma usam somente bandeiras. Informações auxiliares usam 13–16px conforme a função.

**The Reading First Rule.** Preserve o corpo de leitura e a área de interação durante animações; a ênfase recai sobre enquadramento, títulos e decoração.

## Layout

O contêiner principal tem largura máxima de 1440px, gutter fluido e respiro vertical definido nos tokens. Os serviços combinam fotografia e textos em proporção 1.25fr/0.75fr; o perfil usa duas colunas iguais; o processo usa três colunas; contato e formulário ocupam duas colunas sobre a superfície mais clara. O contato é uma faixa de largura total, com padding horizontal que alinha o conteúdo à área central de 1268px.

Aos 1000px, a introdução dos serviços passa a uma coluna. Aos 760px, fotografia e texto, perfil, processo e contato passam a uma coluna; a fotografia de serviços perde o posicionamento sticky e mede 440px de altura. O panorama mantém uma área de pelo menos 720px nessa faixa. O formulário conserva a ordem assunto, nome e mensagem e organiza as opções em duas colunas no celular.

O cabeçalho é fixo, com 72px no desktop e 64px até 700px. Durante toda a abertura, fica transparente: a marca compacta e o botão de menu ocupam cápsulas discretas nos cantos superiores. A navegação fica recolhida também no desktop durante essa sequência e recupera a disposição usual depois dela. A mudança é reversível ao rolar para cima.

O seletor de idiomas flutua no canto inferior esquerdo com bandeiras SVG circulares de 28px de Brasil, Estados Unidos e Espanha, sem fundo externo ou siglas, e com nomes acessíveis. Cada opção mantém alvo de 44px. O WhatsApp flutua no canto inferior direito em um círculo de 52px. Os controles respeitam as áreas seguras do dispositivo; os textos da abertura e o rodapé reservam espaço inferior.

A abertura usa sticky nativo em tela inteira, com altura ajustada ao viewport visível, proporção máxima de 2,32:1 e percurso de 620svh e 490svh até 700px. Em viewport de altura até 500px, fica estática. A implementação mantém âncoras, skip link, teclado e conteúdo sem JavaScript.

O README registra verificação em 320, 390, 600, 768, 1100 e 1440px nos três idiomas sem overflow horizontal. Este passe documental não repete essas medições; elas não substituem avaliação visual do movimento.

**The Stable Contact Rule.** Preserve os cantos inferiores para idiomas e WhatsApp, o foco visível e os alvos estáveis de formulário e navegação.

## Elevation & Depth

A interface usa camadas tonais e linhas, sem sombras de cards. A profundidade principal vem da fotografia, dos recortes, da escala de câmera e das oclusões da arquitetura. Sobre fotografias, gradientes escuros mantêm a leitura; a abertura organiza fotografia, sombra de leitura e texto em três planos locais. Os fatos sobre a cidade têm sombra de texto suave (`0 2px 15px rgba(14,24,20,.22)`). Essa sombra é localizada, não uma regra para todo título.

Na cena, a cabine passa atrás dos trilhos e recebe reflexos. As solas da figura são localizadas pelo alpha da imagem; cada pé tem contato e elevação alternados, e sua sombra acompanha o ponto de chão e a elevação. Essa implementação continua sendo articulação de uma imagem 2D. A correção dos pés não implica, por si só, aprovação visual da caminhada.

## Shapes

Fotografias e molduras têm cantos suaves definidos por photograph; campos usam field; botões de ação, movimento e assunto usam capsule. O acesso de WhatsApp é circular. Divisórias de 1px separam grupos informativos; ênfases de progresso usam linhas de 1–2px. Não existe uma biblioteca de cards informativos repetidos: os blocos são estruturados por espaço, títulos e linhas.

## Components

### Buttons

Ação clara, sem elevação. O botão principal usa accent sobre on-accent, padding e tipografia dos tokens, altura mínima de 58px e largura total no envio. O hover clareia o fundo; o estado ativo reduz a escala a .985. O link da abertura é uma variante de 54px mínimos, padding 14px 26px e texto 18px/600; seu hover reduz a opacidade a .76. O controle de movimento é uma cápsula transparente com borda, altura mínima 44px e estado pressionado verde-água.

O foco visível global usa contorno verde-água de 3px com afastamento de 5px. O estado desabilitado reduz a opacidade a .55. Esses estados são definidos além dos tokens de aparência no sidecar.

### Chips

As opções de assunto são radios nativos com apresentação de cápsula. A seleção usa accent e on-accent; as opções não selecionadas usam borda field-line e texto ink. O hover evidencia a borda e o foco do radio produz contorno de 3px com afastamento de 4px. A altura mínima atual é 48px.

### Inputs / Fields

Campos escuros com borda clara, texto de 18px, altura mínima de 58px e cantos field. O foco muda a borda para accent; erros usam error e mensagem associada. O textarea pode crescer verticalmente. O formulário prepara uma mensagem localizada para o WhatsApp; não envia nem armazena os campos. As três línguas preservam o conteúdo digitado.

### Navigation

Marca discreta, menu com três âncoras e controle de movimento compõem o cabeçalho. Os idiomas e o WhatsApp são flutuantes independentes. O idioma selecionado recebe um contorno fino na bandeira e `aria-pressed`. O menu fecha com Escape e devolve o foco ao botão, tanto no celular quanto na abertura do desktop.

### Photographic windows and coastal sequence

Fotografia de serviço, retrato e panorama organizam a página sem se tornarem cards. A cena costeira usa uma imagem principal com fachada e entrada e uma aproximação gerada a partir dela. Essa aproximação é registrada pela porta e substitui o enquadramento inteiro apenas quando seus limites contêm a câmera; ela não é um recorte de pixels idênticos. A cabine chega antes da abertura e a figura avança depois. O horizonte tem 21 edifícios com crescimento escalonado e reversível.

A representação de Mozart articula uma única pose fotográfica com transparência. Não é filmagem, captura de movimento ou reconstrução 3D, nem documentação de imóvel anunciado. Os materiais e limites estão registrados em `assets/coastal-v6-provenance.md`. A fotografia real de Recife mantém crédito de Arne Müseler e licença CC BY-SA 3.0 DE; interior ilustrativo e imagens geradas mantêm identificação de origem.

### Process, disclosures and social links

O processo usa texto em três etapas e uma rota SVG que se adapta à posição real dos blocos. Serviços técnicos e dúvidas usam `details`/`summary` nativos, divisórias e destaque verde-água ao abrir. Os cinco links sociais presentes no HTML são Instagram, Facebook, LinkedIn, X/Twitter e YouTube; os destinos exatos estão no README. Ícones Tabler locais acompanham rótulos de texto. Somente ícones e linhas decorativas recebem movimento; o alvo do link permanece estável.

### Motion and static state

GSAP/ScrollTrigger local controla a abertura e o conteúdo. A abertura usa scrub .24; as fotografias usam .5–.65 e os títulos e linhas .3–.4. Não há loop decorativo contínuo nem pinning das seções de conteúdo. A desmontagem remove triggers, linhas geradas, rota e moldura antes de reconstruir. O README registra 25 triggers ativos, zero com movimento reduzido e 25 após reativar, com uma rota e uma moldura.

O estado inicial respeita `prefers-reduced-motion`; a mudança manual emite `mozart:motionchange` e sincroniza `aria-pressed`. O código atual persiste apenas o idioma em `mozart-language`; a preferência de movimento é mantida na página e não gravada em armazenamento. Imagens indisponíveis, JavaScript ausente ou movimento reduzido preservam a apresentação principal estática e contato. Mensagens, rótulos e metadados acompanham PT/EN/ES.

## Do's and Don'ts

### Do:

- **Do** preserve a continuidade azul, a hierarquia de Manrope e a leitura em Source Sans 3.
- **Do** mantenha fotografia, percurso e conteúdo semanticamente disponíveis com movimento reduzido.
- **Do** preserve os cantos inferiores para os controles flutuantes, os alvos estáveis e o foco visível.
- **Do** mantenha a sequência chegada, porta e pessoa reversível e verifique contato dos pés em movimento.
- **Do** preserve fontes, créditos, proveniência e destinos reais ao estender a interface.

### Don't:

- **Don't** apresente a articulação 2D como filmagem ou prometa realismo total.
- **Don't** trate a aproximação gerada como recorte de pixels idênticos da fachada principal.
- **Don't** esconda informação essencial atrás da animação ou transforme o formulário em envio automático.
- **Don't** replique a paleta verde da revisão 5 ou fontes substituídas como regras atuais.

Não canonizado: seletores e aliases históricos ainda existentes no CSS, a diferença de borda entre o token básico e o ajuste costeiro, e limitações da articulação 2D. Não foram reparados neste passe documental; o build é a evidência, e ajustes de qualidade visual exigem revisão própria.


## Renderização 6.7

O desenho e a ordem das cenas permanecem. O horizonte usa 21 imagens com transparência preparadas na publicação; a subida usa uma view timeline CSS com inset zero, quando suportada, e transformações JavaScript como alternativa. A revelação da cidade usa duas translações opostas, preservando o cenário fixo atrás de uma abertura vertical. Falhas ao carregar o horizonte mantêm a apresentação inicial estática.

Nos celulares até 760px, as fotos continuam movendo-se com a rolagem, mas sem a máscara animada e o brilho com mistura de camadas. Os recortes da cabine, interior e personagem já contêm o enquadramento utilizado. A altura visível é atualizada depois de 180ms de estabilidade para evitar repetidas alocações durante o movimento das barras do navegador. A sequência segue reversível e o controle de reduzir movimento mantém a mesma função.
