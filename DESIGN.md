# Mozart Maia: direção visual e percurso

Leitura da revisão 5: landing page de corretagem, avaliação e serviços técnicos para compradores e proprietários em Recife, disponível em PT/EN/ES. A linguagem arquitetônica e a aparência fotográfica de Boa Viagem organizam uma única apresentação cinematográfica e um percurso de conteúdo detalhado. A revisão restaura o crescimento independente dos prédios e torna a descida do elevador visível na fachada.

## Critério taste

Modo: redesign com nova linguagem visual, preservando os fatos, a marca nominativa, as referências profissionais, os campos do formulário e as âncoras existentes. O pedido do usuário autoriza mudar a paleta e simplificar a navegação.

- DESIGN_VARIANCE: 7. A abertura cinematográfica é a assinatura; o restante usa composição assimétrica, fotografia ampla e espaço entre grupos.
- MOTION_INTENSITY: 8. A narrativa de rolagem continua no movimento próprio de cada seção: enquadramento e luz das fotografias, títulos, leitura dos serviços, retrato, credenciais, serviços técnicos, percurso do processo, contato, redes, dúvidas e rodapé. Não há loops decorativos, bloqueio da leitura ou mudanças de foco pelas animações.
- VISUAL_DENSITY: 3. Uma apresentação, compra/venda/avaliação detalhadas, perfil, serviços técnicos, processo, contato, redes e dúvidas. Sem segunda abertura ou abas de intenção.

A base é HTML, CSS e JavaScript nativos já presentes no projeto. A estética é própria, sem declarar uma biblioteca de componentes como sistema visual. Não há necessidade de migrar a aplicação estática para outro framework para este redesign.

## Auditoria e alterações

Antes, comprar/vender se repetia no menu, no hero posterior à animação, nas abas de serviços e no formulário. Perícia e assistência eram links diferentes para a mesma seleção. A abertura cinematográfica desembocava em um segundo hero, criando sensação de dois sites.

Agora a navegação é uma única estrutura responsiva com Serviços, Sobre Mozart e Contato, acompanhada do seletor PT/EN/ES. Compra, venda e avaliação têm textos próprios, finalidades e informações para preparar o atendimento. A escolha do objetivo acontece no formulário, que prepara a mensagem no WhatsApp. Há também um acesso fixo ao WhatsApp, reduzido a uma apresentação compacta perto do formulário. Telefones, e-mail, endereço e redes ficam na seção de contato; o rodapé contém assinatura e crédito da fotografia.

Perícia e assistência técnica não ficam limitadas ao perfil: a seção técnica distingue peritagem/assistência, avaliação/revisão de aluguel e viabilidade/análise imobiliária. O perfil conecta a trajetória de Mozart à formação, aos registros CRECI-PE 6826 e CNAI 5829, às filiações CONPEJ/APJEP e ao perfil público na APJEP.

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

## Idiomas e contato

`i18n.js` mantém traduções locais e integrais em português, inglês e espanhol, incluindo metadados, textos alternativos, rótulos acessíveis, menu, formulário e indicador de andar. Português é capturado do DOM antes de qualquer tradução. O seletor atualiza `html.lang` e `aria-pressed`, preserva rotas/âncoras e não apaga campos digitados. `mozart:languagechange` sincroniza textos dinâmicos e permite recalcular a composição após mudanças no comprimento do texto.

A única persistência é a preferência de idioma em `localStorage` (`mozart-language`), com leitura/escrita protegidas. Não há armazenamento de dados do formulário. O formulário prepara uma mensagem localizada para `5581999712940`; o visitante revisa e envia pelo WhatsApp. O botão flutuante usa o mesmo destino e se adapta visualmente quando o formulário está próximo.

Instagram, Facebook, LinkedIn, X/Twitter e YouTube usam os destinos exatos encontrados no HTML do site original, listados no README. Os ícones são SVG locais do Tabler em `assets/icons/`, com licença MIT e origem registradas na mesma pasta.

## Movimento, imagens e acessibilidade

A assinatura visual é uma única montagem cinematográfica em Canvas 2D. `film.js` reúne o enquadramento das imagens, a oclusão das portas, as poses do personagem e os textos. `elevator-scene.js` movimenta uma cabine independente pela fachada; `skyline-scene.js` revela 21 camadas de prédios. `film.css` compõe a abertura e sua versão estática. GSAP e ScrollTrigger 3.13.0 são servidos localmente em `assets/vendor`; a progressão tem uma única fonte de rolagem e o elemento visual usa `position: sticky` nativo. Three.js e WebGL não fazem parte do runtime atual.

`content-motion.js` e `content-motion.css` cuidam do restante do percurso. A fotografia dos serviços e o retrato ganham recorte, enquadramento e luz progressivos; títulos e serviços recebem ênfase de leitura; credenciais e divisórias são destacadas; uma rota SVG curva acompanha as etapas do processo. Contato, ícones sociais, dúvidas e assinatura do rodapé também respondem à rolagem. Os efeitos preservam o texto legível, os campos e as áreas de clique, não prendem seções e são removidos por completo quando o movimento é reduzido. A versão integrada utiliza 24 ScrollTriggers. Ao reconstruir, os triggers, a moldura do retrato e a rota anterior são limpos para impedir duplicação.

O roteiro começa na vista gerada do rooftop (`assets/roof-photo.webp`) e aproxima a fachada (`assets/tower-facade-v5.webp`). Uma cabine separada (`assets/lift-cabin-v5.webp`) percorre o poço envidraçado enquanto a câmera acompanha sua posição: aceleração, passagem dos andares e desaceleração no térreo. Cabos, trilhos, reflexos e oclusão pela fachada integram a cabine ao edifício. A contagem de 24 andares deriva do mesmo progresso do deslocamento.

A chegada precede a transição para o hall (`assets/elevator-frames.webp`); só então as portas abrem e Mozart sai. O hall é composto inteiro antes da transição, para impedir que o interior apareça através das portas fechadas. A pessoa utiliza oito poses de aparência fotográfica, reunidas em `assets/mozart-photo-atlas.png` e geradas com referência no retrato original. A transição final chega à composição costeira (`assets/skyline-boa-viagem-v5.webp`): 21 fachadas sobem em sequência por trás das palmeiras e da avenida, mantendo as proporções dos materiais e das janelas. As informações do escritório surgem durante o crescimento. A fotografia real de Recife permanece nos serviços e como alternativa se o novo horizonte não carregar.

Trata-se de montagem de imagens com movimento de câmera, camadas independentes, transições e sequência quadro a quadro. Não é uma filmagem real, captura de movimento ou documentação de um edifício anunciado. A substituição anterior do crescimento por uma aproximação da fotografia inteira foi revista: os prédios voltam a ter movimento independente. O atlas de oito poses é discreto e tem limites de continuidade. A direção busca aparência fotográfica, sem declarar “100% realismo”.

O cabeçalho contém o controle localizado de redução de movimento, com `aria-pressed`. O aplicativo aplica `.motion-off` e emite `mozart:motionchange`, incluindo `detail.reduced`. O estado inicial considera `prefers-reduced-motion`; preferência, estado efetivo e anúncio do botão permanecem sincronizados durante mudanças manuais e do sistema. A preferência de movimento não é persistida no armazenamento local.

A abertura oferece a mesma apresentação principal em modo estático quando o movimento é reduzido, o JavaScript está ausente ou uma cena não carrega. Os efeitos de conteúdo também ficam estáticos nesse modo. O formulário preserva os nomes e a ordem `objetivo`, `nome`, `mensagem`; mantém validação, mensagem de recuperação, aviso de privacidade e alternativa sem JavaScript. O menu responde a Escape e mantém o foco utilizável por teclado.

## Origem dos materiais

Outfit e Plus Jakarta Sans são hospedadas localmente com suas licenças SIL OFL em `assets/outfit-OFL.txt` e `assets/plusjakartasans-OFL.txt`.

A fotografia real dos serviços, também usada como alternativa de horizonte, é de Arne Müseler, disponível em https://commons.wikimedia.org/wiki/File:Recife_aerial_view.jpg sob CC BY-SA 3.0 DE. O crédito e a licença da fotografia adaptada permanecem no rodapé e no README. Rooftop, fachada, cabine, hall, horizonte animado e poses foram gerados para o projeto; o retrato que orienta o personagem veio do site original de Mozart, com uso na geração autorizado pelo solicitante. Os registros das novas imagens estão em `assets/elevator-v5-provenance.md` e `assets/skyline-v5-provenance.md`.

Os SVG de redes e WhatsApp vêm do Tabler e são servidos localmente. `assets/icons/LICENSE.txt` contém a licença MIT; `assets/icons/SOURCE.txt` registra a origem.

## QA da revisão 5

O QA de integração conferiu a progressão da cabine, a chegada ao térreo antes da abertura das portas, o crescimento direto e reverso das 21 fachadas e capturas em 1440px e 390px. A redução de movimento deixou zero ScrollTriggers ativos; a reativação restaurou 24, uma única moldura do retrato e uma única rota SVG. A troca de idioma também foi exercitada durante essa reconstrução.

O Lighthouse mobile local da revisão 5 registrou acessibilidade 100, boas práticas 100 e SEO 100, com 59 verificações aprovadas e nenhuma reprovada. Não foram medidas novas métricas de desempenho. Os resultados são de laboratório e não descrevem a experiência de visitantes reais.

## Histórico: QA da revisão 4 e limites de verificação

Resultados do QA local da revisão integrada:

- PT/EN/ES nas larguras de 320, 390, 768, 1100 e 1440px, sem overflow horizontal.
- Erro de nome obrigatório e preparação de mensagens localizadas no formulário; destino `5581999712940` confirmado com a abertura interceptada, sem envio.
- Menu mobile, Escape e comportamento de foco verificados.
- Movimento reduzido com zero ScrollTriggers; reativação com oito triggers e uma única rota SVG do processo, sem duplicação.
- Página funcional a 390px com JavaScript desativado.
- Chegada ao andar zero antes da abertura das portas e da saída do personagem, com sequência e reversão confirmadas.
- Lighthouse mobile local: acessibilidade 100, boas práticas 100 e SEO 100; 59 verificações aprovadas e nenhuma reprovada no relatório.

LCP e CLS não foram novamente medidos nesta rodada; métricas da revisão anterior não são atribuídas à revisão 4. A avaliação local não substitui medições de visitantes reais. Em revisões futuras, repetir a matriz de idiomas, larguras e movimento, além de verificar temas, histórico/bfcache, falhas de imagens e carregamento no caminho público do GitHub Pages.

As regras relativas a React, hooks e componentes de bibliotecas não se aplicam à base estática preservada. Não há logos de clientes, depoimentos, inventário de imóveis ou métricas inventadas. O movimento deve ser julgado por capturas do resultado e por sua continuidade em uso, considerando que a fonte é uma montagem de imagens e não vídeo.

O endereço de publicação continua https://btcsolucoes.github.io/mozart-maia-imoveis/.
