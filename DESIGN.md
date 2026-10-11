# Mozart Maia: direção visual e percurso

Leitura do projeto: landing page de corretagem para compradores e proprietários em Recife, com linguagem arquitetônica e fotografia de Boa Viagem, organizada em torno de uma única apresentação cinematográfica.

## Critério taste

Modo: redesign com nova linguagem visual, preservando os fatos, a marca nominativa, as referências profissionais, os campos do formulário e as âncoras existentes. O pedido do usuário autoriza mudar a paleta e simplificar a navegação.

- DESIGN_VARIANCE: 7. A abertura cinematográfica é a assinatura; o restante usa composição assimétrica, fotografia ampla e espaço entre grupos.
- MOTION_INTENSITY: 7. O movimento se concentra na narrativa de rolagem e nas respostas aos controles. Não há entradas repetidas em todos os blocos nem movimento contínuo decorativo.
- VISUAL_DENSITY: 3. Uma apresentação, serviços informativos, perfil, processo, contato e dúvidas. Sem segunda abertura, abas de intenção, indicadores decorativos ou vários convites equivalentes.

A base é HTML, CSS e JavaScript nativos já presentes no projeto. A estética é própria, sem declarar uma biblioteca de componentes como sistema visual. Não há necessidade de migrar a aplicação estática para outro framework para este redesign.

## Auditoria e alterações

Antes, comprar/vender se repetia no menu, no hero posterior à animação, nas abas de serviços e no formulário. Perícia e assistência eram links diferentes para a mesma seleção. A abertura cinematográfica desembocava em um segundo hero, criando sensação de dois sites.

Agora a navegação é uma única estrutura responsiva com Serviços, Sobre Mozart e Contato. O usuário lê as três atuações e escolhe seu objetivo apenas no formulário. O único botão de conversão prepara a mensagem no WhatsApp. Telefone, e-mail e endereço ficam juntos na seção de contato; o rodapé contém assinatura e crédito da fotografia.

As âncoras `#principal`, `#topo`, `#jornada`, `#conteudo`, `#experiencia`, `#servicos`, `#sobre`, `#como-funciona` e `#contato` permanecem. URLs antigas com `?objetivo=comprar`, `vender`, `avaliar` ou `pericia` ainda selecionam o formulário; novos cliques não alteram a URL com parâmetros de intenção.

## Cores

Tema automático, consistente em toda a página. O modo claro favorece a leitura em luz ambiente; o modo escuro respeita a preferência do sistema. Não há inversão isolada de uma seção.

| Token | Claro | Escuro | Função |
| --- | --- | --- | --- |
| `--paper` | `#F4F6F4` | `#17211D` | Superfície principal mineral |
| `--surface` | `#E8EDE9` | `#222E27` | Agrupamento do contato |
| `--ink` | `#20312A` | `#EEF3EE` | Texto e títulos |
| `--muted` | `#57675E` | `#B5C5B9` | Texto secundário |
| `--accent` | `#245B45` | `#AFD3BF` | Único acento verde e foco |
| `--on-accent` | `#FFFFFF` | `#142B1E` | Texto dos controles ativos |

A fotografia mantém as cores naturais de Boa Viagem. A interface não adiciona coral, azul ou dourado concorrentes. A cor semântica de erro só aparece na validação.

## Tipografia, forma e composição

Outfit, hospedada localmente, identifica os títulos e a marca. Plus Jakarta Sans, também local, serve ao texto e aos controles. As licenças OFL ficam em `assets`. Títulos mantêm tracking acima de -0.04em e tamanho de no máximo 88px na folha principal. Não há mistura de famílias dentro de uma frase para decorar palavras.

A escala de forma é explícita: fotografia com 16px de raio, campos com 8px e controles compactos em cápsula. Conteúdo informativo usa espaço e divisórias; não há conjuntos de cards idênticos. O cabeçalho é sólido para manter o contraste sobre todas as cenas.

A primeira fotografia de conteúdo ocupa uma área ampla ao lado de comprar/vender/avaliar. O perfil associa as credenciais à pessoa. O processo é um grupo textual curto; não usa números decorativos. Dúvidas usam detalhes nativos. O menu mobile reutiliza os mesmos links do desktop.

## Movimento, imagens e acessibilidade

A assinatura visual é uma única montagem cinematográfica em Canvas 2D. `film.js` reúne o enquadramento das imagens, a oclusão das portas, as poses do personagem e os textos. `film.css` compõe a abertura e sua versão estática. GSAP e ScrollTrigger 3.13.0 são servidos localmente em `assets/vendor`; a progressão tem uma única fonte de rolagem e o elemento visual usa `position: sticky` nativo. Three.js e WebGL não fazem parte do runtime atual.

O roteiro começa na vista gerada do rooftop (`assets/roof-photo.webp`), passa à composição do elevador (`assets/elevator-frames.webp`), chega ao térreo e abre as portas antes da saída de Mozart. A pessoa é construída a partir de oito poses de aparência fotográfica, reunidas em `assets/mozart-photo-atlas.png` e geradas com referência no retrato original. A transição final chega à fotografia real de Recife (`assets/recife.webp`), enquanto surgem informações do escritório.

Trata-se de montagem de imagens com movimento de câmera, transições e sequência quadro a quadro. Não é uma filmagem real, captura de movimento ou documentação de um edifício anunciado. A aproximação final aumenta o enquadramento da cidade inteira; não simula cada prédio crescendo separadamente. O atlas de oito poses é discreto e tem limites de continuidade. A direção busca aparência fotográfica, sem declarar “100% realismo”.

O cabeçalho contém “Reduzir movimento”, com `aria-pressed`. O aplicativo aplica `.motion-off` e emite `mozart:motionchange`, incluindo `detail.reduced`. O estado inicial considera `prefers-reduced-motion`; preferência, estado efetivo e anúncio do botão devem permanecer coerentes durante mudanças manuais e do sistema.

A interface estática não instala listeners de scroll próprios. A abertura oferece a mesma apresentação principal em modo estático quando o movimento é reduzido, o JavaScript está ausente ou uma cena não carrega. O formulário preserva os nomes e a ordem `objetivo`, `nome`, `mensagem`; preserva validação, mensagem de recuperação, aviso de privacidade e alternativa sem JavaScript.

## Origem dos materiais

Outfit e Plus Jakarta Sans são hospedadas localmente com suas licenças SIL OFL em `assets/outfit-OFL.txt` e `assets/plusjakartasans-OFL.txt`.

A fotografia real do horizonte e dos serviços é de Arne Müseler, disponível em https://commons.wikimedia.org/wiki/File:Recife_aerial_view.jpg sob CC BY-SA 3.0 DE. O crédito e a licença da fotografia adaptada permanecem no rodapé e no README. O rooftop, o elevador e as poses foram gerados para o projeto; o retrato que orienta o personagem veio do site original de Mozart, com uso na geração autorizado pelo solicitante.

## Preflight e limites de verificação

Esta lista orienta a validação da revisão atual; não afirma que todos os testes abaixo já foram executados. Verificações da antiga versão com Three.js não comprovam esta montagem.

- Uma única abertura e H1; um seletor de objetivo; nenhum CTA de conversão redundante.
- Formulário, menu, Escape, links internos e controle de movimento por teclado, sem elementos visualmente ocultos ainda focáveis.
- Contraste e composição em temas claro e escuro; larguras de 320, 390, 768 e 1440px; paisagem curta; nenhuma área importante presa fora da tela.
- Carregamento por servidor HTTP local com `python -m http.server 4174` e pela subpasta pública do GitHub Pages.
- Sequência de chegada, portas e saída em vários pontos da rolagem, incluindo reversão e movimentos rápidos.
- Pausa no meio da narrativa e reativação sem perda inesperada do contexto; preferência de sistema coerente com o botão.
- Entrada direta no contato antes do fim do carregamento das imagens, imagem indisponível e apresentação sem JavaScript.
- Restauração pelo histórico e bfcache, com a sequência novamente respondendo à rolagem.
- Mensagem de erro e recuperação do formulário; destino correto do WhatsApp, sem enviar mensagens durante QA.
- Console, tamanho de imagens e comportamento de renderização. Nenhuma medição de Core Web Vitals desta revisão é declarada neste documento.

As regras relativas a React, hooks e componentes de bibliotecas não se aplicam à base estática preservada. Não há logos de clientes, depoimentos, inventário de imóveis ou métricas inventadas. O movimento deve ser julgado por capturas do resultado e por sua continuidade em uso, considerando que a fonte é uma montagem de imagens e não vídeo.

O endereço de publicação continua https://btcsolucoes.github.io/mozart-maia-imoveis/.