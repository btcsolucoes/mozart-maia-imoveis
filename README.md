# Mozart Maia | Negócios Imobiliários

Landing page em português para quem deseja comprar ou vender um imóvel em Recife. Uma única abertura conduz aos serviços, ao perfil de Mozart e ao contato.

Endereço do projeto: [btcsolucoes.github.io/mozart-maia-imoveis](https://btcsolucoes.github.io/mozart-maia-imoveis/).

## Executar localmente

Com Python instalado, execute nesta pasta:

```powershell
python -m http.server 4174
```

Abra [localhost:4174](http://localhost:4174). Use um servidor HTTP para carregar o módulo JavaScript; abrir `index.html` diretamente como arquivo não reproduz o ambiente de publicação. Não há etapa de build nem pacotes a instalar.

## Estrutura e dependências

- `index.html`: abertura única, conteúdo profissional, navegação e contato.
- `styles.css`: identidade mineral, grafite e verde; layout responsivo e tema automático.
- `app.js`: menu, preferência de movimento e preparação da mensagem de WhatsApp.
- `film.js`: montagem fotográfica no Canvas 2D, sincronizada à rolagem.
- `film.css`: composição da abertura, texto sobre as imagens e apresentação estática.
- `assets/vendor/gsap.min.js` e `assets/vendor/ScrollTrigger.min.js`: GSAP e ScrollTrigger 3.13.0, servidos localmente.
- `assets/fonts.css`: fontes Outfit e Plus Jakarta Sans hospedadas localmente.
- `DESIGN.md`: auditoria dos caminhos, direção visual e critérios taste.

O runtime atual usa Canvas 2D e ScrollTrigger. Three.js e WebGL deixaram de ser dependências da apresentação. GSAP acompanha a progressão de rolagem; o posicionamento fixo temporário da cena usa `position: sticky` nativo. Não há vídeo transmitido nem etapa de renderização 3D no navegador.

## Imagens e roteiro

| Arquivo | Uso e origem |
| --- | --- |
| `assets/roof-photo.webp` | Vista de um rooftop de aparência fotográfica, gerada para a abertura e inspirada na arquitetura da orla. |
| `assets/elevator-frames.webp` | Composição gerada com estados do elevador; fornece os planos de fundo e as portas usados na montagem. |
| `assets/mozart-photo-atlas.png` | Oito poses de aparência fotográfica geradas a partir do retrato de Mozart, com fundo transparente. |
| `assets/recife.webp` | Fotografia real de Recife, usada no horizonte final e na seção de serviços. |
| `assets/recife-small.webp` | Versão redimensionada da mesma fotografia para telas menores. |
| `assets/mozart.webp` | Retrato de Mozart obtido no site original do profissional. |

A abertura parte do rooftop, aproxima o enquadramento e passa ao elevador. A indicação dos andares acompanha a descida; as portas abrem depois da chegada ao térreo. Mozart aparece por uma sequência de poses, seguida da transição para a fotografia real de Recife. As informações do escritório surgem durante essa passagem. A rolagem controla a sequência nos dois sentidos.

O efeito é uma **montagem de imagens com movimento de câmera, transições e animação quadro a quadro**. As cenas geradas e a caminhada não são filmagem real de Mozart ou de um empreendimento. O horizonte utiliza uma aproximação da fotografia inteira; não há crescimento independente dos prédios. Oito poses discretas também não equivalem à continuidade de uma captura de movimento.

## Navegação, movimento e contato

Há uma estrutura de navegação compartilhada entre desktop e celular, com Serviços, Sobre Mozart e Contato. Comprar, vender e avaliar são apresentados como informações; a escolha do objetivo acontece apenas no formulário. Perícia e assistência técnica aparecem juntas no perfil.

As âncoras antigas foram preservadas. URLs com `?objetivo=comprar`, `vender`, `avaliar` ou `pericia` ainda podem preencher a seleção inicial, mas os controles não geram novos parâmetros na URL.

“Reduzir movimento” controla a apresentação. A preferência do sistema é considerada, e a abertura possui uma versão estática para ausência de JavaScript, redução de movimento ou falha de carregamento das cenas. O link de acessibilidade permite ir diretamente ao conteúdo.

O formulário prepara uma mensagem para [o WhatsApp de Mozart](https://wa.me/5581999712940). O visitante confirma o envio no próprio WhatsApp. Não há banco de dados, armazenamento dos campos ou envio automático. Nome é obrigatório; objetivo é selecionável; mensagem é opcional. Sem JavaScript, há um link direto para o WhatsApp. Telefone, endereço, registros e experiência vieram do site original do profissional.

## Créditos e licenças

A fotografia de Recife é de [Arne Müseler](https://www.arne-mueseler.com/), disponível no [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Recife_aerial_view.jpg), sob [CC BY-SA 3.0 DE](https://creativecommons.org/licenses/by-sa/3.0/de/). As versões do projeto recebem recorte, redimensionamento e sobreposição visual de cor. Preserve a atribuição e a licença da fotografia adaptada.

O retrato vem do [site de Mozart Maia](https://www.mozartperitojudicial.com.br/). A geração do personagem a partir desse retrato foi autorizada pelo solicitante. Rooftop, elevador e poses são representações artísticas produzidas para este projeto; não documentam uma visita real, uma caminhada real ou um imóvel anunciado.

Outfit e Plus Jakarta Sans são distribuídas sob SIL Open Font License. As cópias das licenças estão em `assets/outfit-OFL.txt` e `assets/plusjakartasans-OFL.txt`.

GSAP e ScrollTrigger 3.13.0 conservam os cabeçalhos de autoria e copyright da GreenSock nos arquivos locais. Os cabeçalhos apontam para os [termos de licença do GSAP](https://gsap.com/standard-license).

## Verificação da revisão atual

Este é um roteiro de QA, não um registro de aprovação automática. Resultados de versões anteriores com Three.js ou abas de serviços não validam o runtime atual.

- Navegação, foco, Escape e menu em desktop, celular e paisagem curta.
- Tema claro e escuro, contraste, carregamento das fontes e ausência de overflow horizontal.
- Uma única abertura e H1; destinos internos existentes; compatibilidade de `?objetivo=`.
- Sequência direta e reversa: chegada ao térreo antes das portas, seguida da saída do personagem.
- Redução de movimento antes da carga, a meio scroll e por mudança da preferência do sistema; coerência do controle e preservação do contexto visível.
- Ausência de JavaScript, falha de uma imagem, carregamento lento e ida ao contato antes de a apresentação carregar.
- Retorno pelo histórico do navegador, inclusive restauração pelo bfcache.
- Validação do formulário e endereço do WhatsApp, interceptando a abertura durante o teste para não enviar mensagens.
- Carregamento e console no caminho de projeto do GitHub Pages, não apenas em `localhost`.

A comparação visual precisa incluir pontos intermediários da montagem. O uso de imagens geradas e oito poses impõe limites à continuidade dos movimentos; não há promessa de “100% realismo”. Esta documentação não apresenta uma medição de Core Web Vitals da revisão atual.

## Publicação

A configuração do GitHub Pages publica os arquivos da raiz da branch `main` a cada push. Não há etapa de build. O arquivo `.nojekyll` mantém a publicação estática direta. O endereço permanece [https://btcsolucoes.github.io/mozart-maia-imoveis/](https://btcsolucoes.github.io/mozart-maia-imoveis/).
### Verificações executadas nesta revisão

Playwright: larguras 320, 390, 768 e 1440 px sem overflow horizontal; um H1; âncoras válidas; sequência direta e reversa; porta fechada nos andares superiores e no primeiro momento do térreo; saída após abertura. Menu e Escape, paisagem 667 × 375, JavaScript desativado, preferência de movimento do sistema e controle manual, preservação do conteúdo ao alternar, navegação de ida e volta e formulário com abertura do WhatsApp interceptada passaram.

Chrome DevTools, localhost, sem limitação de CPU/rede: LCP observado 278 ms e CLS 0,00. São resultados de laboratório local, não medições de visitantes reais ou de conexão móvel. Lighthouse mobile local retornou 100 em acessibilidade, boas práticas e SEO. O aviso experimental sobre nome acessível da marca foi corrigido removendo o rótulo que omitia parte do texto visível.
