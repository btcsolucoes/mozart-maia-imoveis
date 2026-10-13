# Mozart Maia | Negócios Imobiliários

Landing page em português, inglês e espanhol para quem deseja comprar, vender ou avaliar um imóvel em Recife. A revisão 5 mantém uma única abertura, serviços detalhados, perfil profissional, atuação pericial, processo de atendimento e contato, com a descida do elevador pela fachada, o crescimento dos prédios e movimentos no restante da página.

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
- `i18n.js`: traduções PT/EN/ES, textos acessíveis e mensagens dinâmicas; captura o português original antes de traduzir.
- `film.js`: montagem fotográfica no Canvas 2D, sincronizada à rolagem.
- `elevator-scene.js`: deslocamento da cabine pela fachada, acompanhamento da câmera, reflexos e chegada ao térreo.
- `skyline-scene.js`: crescimento independente de 21 camadas de fachadas, atrás da vegetação e da orla.
- `film.css`: composição da abertura, texto sobre as imagens e apresentação estática.
- `content-motion.js` e `content-motion.css`: enquadramento das fotografias, luz, títulos, serviços, retrato, credenciais, serviços técnicos, percurso do processo, contato, redes sociais, dúvidas e rodapé.
- `assets/vendor/gsap.min.js` e `assets/vendor/ScrollTrigger.min.js`: GSAP e ScrollTrigger 3.13.0, servidos localmente.
- `assets/fonts.css`: fontes Outfit e Plus Jakarta Sans hospedadas localmente.
- `assets/icons/`: ícones SVG locais do Tabler, com origem e licença MIT.
- `DESIGN.md`: auditoria dos caminhos, direção visual e critérios taste.

O runtime atual usa Canvas 2D e ScrollTrigger. Three.js e WebGL deixaram de ser dependências da apresentação. GSAP acompanha a progressão de rolagem; o posicionamento fixo temporário da cena usa `position: sticky` nativo. Não há vídeo transmitido nem etapa de renderização 3D no navegador.

## Imagens e roteiro

| Arquivo | Uso e origem |
| --- | --- |
| `assets/roof-photo.webp` | Vista de um rooftop de aparência fotográfica, gerada para a abertura e inspirada na arquitetura da orla. |
| `assets/elevator-frames.webp` | Composição gerada com estados do elevador; fornece os planos de fundo e as portas usados na montagem. |
| `assets/tower-facade-v5.webp` | Fachada completa gerada, inspirada na arquitetura de Boa Viagem, para acompanhar a descida do elevador. |
| `assets/lift-cabin-v5.webp` | Cabine gerada com transparência, composta separadamente sobre a fachada. |
| `assets/skyline-boa-viagem-v5.webp` | Composição gerada em dois painéis, com e sem prédios, que fornece as 21 camadas do crescimento da cidade. |
| `assets/mozart-photo-atlas.png` | Oito poses de aparência fotográfica geradas a partir do retrato de Mozart, com fundo transparente. |
| `assets/recife.webp` | Fotografia real de Recife, usada nos serviços e como alternativa se o módulo do horizonte não carregar. |
| `assets/recife-small.webp` | Versão redimensionada da mesma fotografia para telas menores. |
| `assets/mozart.webp` | Retrato de Mozart obtido no site original do profissional. |

A abertura parte do rooftop, aproxima o enquadramento e mostra uma cabine deslocando-se pela fachada enquanto a câmera acompanha a descida por 24 andares. A cabine acelera, percorre o trecho central e desacelera antes do térreo; o contador acompanha sua posição. Só depois da chegada a cena passa ao hall, as portas abrem e Mozart sai por uma sequência de poses. A transição final revela a orla inspirada em Boa Viagem, com 21 camadas de fachadas crescendo em momentos diferentes, enquanto aparecem as informações do escritório. As fachadas mantêm suas proporções e surgem por trás da vegetação. A rolagem controla a sequência nos dois sentidos.

O efeito é uma **montagem de imagens com movimento de câmera, camadas independentes, transições e animação quadro a quadro**. As cenas geradas e a caminhada não são filmagem real de Mozart ou de um empreendimento. Oito poses discretas também não equivalem à continuidade de uma captura de movimento. A origem e os briefs de geração das novas imagens estão em [`assets/elevator-v5-provenance.md`](assets/elevator-v5-provenance.md) e [`assets/skyline-v5-provenance.md`](assets/skyline-v5-provenance.md).

## Navegação, movimento e contato

Há uma estrutura de navegação compartilhada entre desktop e celular, com Serviços, Sobre Mozart e Contato. Comprar, vender e avaliar têm descrições próprias e informações para preparar a primeira conversa; a escolha do objetivo acontece no formulário. Perícia, assistência técnica, revisão de aluguel, viabilidade e análise imobiliária ficam em uma seção técnica separada. O perfil apresenta formação, CRECI-PE 6826, CNAI 5829, filiações CONPEJ/APJEP e um link para o perfil profissional na APJEP.

As âncoras antigas foram preservadas. URLs com `?objetivo=comprar`, `vender`, `avaliar` ou `pericia` ainda podem preencher a seleção inicial, mas os controles não geram novos parâmetros na URL.

“Reduzir movimento” controla a abertura e os movimentos do conteúdo. A preferência do sistema é considerada, e a abertura possui uma versão estática para ausência de JavaScript, redução de movimento ou falha de carregamento das cenas. Os efeitos de conteúdo não ocultam o texto nem mudam o foco. O link de acessibilidade permite ir diretamente ao conteúdo.

O formulário prepara uma mensagem para [o WhatsApp de Mozart](https://wa.me/5581999712940). O visitante confirma o envio no próprio WhatsApp. Não há banco de dados, armazenamento dos campos ou envio automático. Nome é obrigatório; objetivo é selecionável; mensagem é opcional. Sem JavaScript, há um link direto para o WhatsApp. Telefone, endereço, registros e experiência vieram do site original do profissional.

O acesso fixo ao WhatsApp permanece disponível durante a leitura e assume uma apresentação compacta perto do formulário. O destino é `5581999712940`, correspondente ao telefone exibido, (81) 99971-2940; o link antigo do site original omitia um dígito.

## Idiomas e redes sociais

Os controles PT/EN/ES traduzem o conteúdo, os metadados, os textos alternativos, os rótulos acessíveis e as mensagens do formulário por meio de `i18n.js`, sem serviço externo de tradução. Português é o idioma padrão. `html.lang` e `aria-pressed` acompanham a seleção; o evento `mozart:languagechange` permite atualizar os textos dinâmicos e recalcular o movimento. As rotas, as âncoras e os dados já digitados no formulário são preservados.

O único dado persistido em `localStorage` é a preferência de idioma, sob a chave `mozart-language`. A leitura e a escrita são protegidas por `try/catch`; armazenamento indisponível não impede o uso da página. Os campos do formulário não são armazenados.

Destinos extraídos do HTML do [site original de Mozart](https://www.mozartperitojudicial.com.br/), preservados na revisão 4:

- [Instagram](https://instagram.com/mozart.peritojudicial)
- [Facebook](https://www.facebook.com/mozart.maia.perito.judicial?mibextid=LQQJ4d)
- [LinkedIn](https://www.linkedin.com/in/mozartnegociosimobiliarios)
- [X / Twitter](https://x.com/mozartperito?s=11&t=zC0QPhEzoSuFwY5K3j6iBQ)
- [YouTube](https://www.youtube.com/@mozartperitojudicial)
- [Perfil profissional na APJEP](https://www.apjep.org.br/perito/148)

## Créditos e licenças

A fotografia de Recife é de [Arne Müseler](https://www.arne-mueseler.com/), disponível no [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Recife_aerial_view.jpg), sob [CC BY-SA 3.0 DE](https://creativecommons.org/licenses/by-sa/3.0/de/). As versões do projeto recebem recorte, redimensionamento e sobreposição visual de cor. Preserve a atribuição e a licença da fotografia adaptada.

O retrato vem do [site de Mozart Maia](https://www.mozartperitojudicial.com.br/). A geração do personagem a partir desse retrato foi autorizada pelo solicitante. Rooftop, fachada, cabine, horizonte animado e poses são representações artísticas produzidas para este projeto; não documentam uma visita real, uma caminhada real ou um imóvel anunciado.

Outfit e Plus Jakarta Sans são distribuídas sob SIL Open Font License. As cópias das licenças estão em `assets/outfit-OFL.txt` e `assets/plusjakartasans-OFL.txt`.

GSAP e ScrollTrigger 3.13.0 conservam os cabeçalhos de autoria e copyright da GreenSock nos arquivos locais. Os cabeçalhos apontam para os [termos de licença do GSAP](https://gsap.com/standard-license).

Os ícones de redes sociais e WhatsApp são SVG do Tabler servidos localmente em `assets/icons/`. A licença MIT está em `assets/icons/LICENSE.txt`, e a origem está registrada em `assets/icons/SOURCE.txt`.

## Verificações da revisão 5

- PT/EN/ES em 320, 390, 768, 1100 e 1440px, sem overflow horizontal. Formulário com erro e preparação de mensagem localizada testados com a abertura do WhatsApp interceptada, sem envio.
- Menu mobile fecha com Escape e devolve o foco ao botão. Abertura inicial com movimento reduzido e página sem JavaScript mantêm conteúdo e contato disponíveis.
- Posição da cabine verificada durante a descida: o contador chega ao térreo antes do início da abertura das portas e da caminhada.
- Crescimento direto e reverso do horizonte verificado: 21 camadas completas ao final, com retorno ao estado intermediário ao rolar para cima.
- Integração com 24 ScrollTriggers ativos; redução de movimento remove todos, e a reativação restaura 24 sem duplicar a moldura do retrato nem a rota SVG.
- Capturas da sequência em desktop de 1440px e celular de 390px, sem overflow horizontal nos pontos conferidos.
- Troca de idioma e reativação do movimento verificadas em conjunto.
- Lighthouse mobile local da revisão 5: acessibilidade 100, boas práticas 100 e SEO 100; 59 verificações aprovadas e nenhuma reprovada. Não foram medidas novas métricas de desempenho nesta rodada.

Os resultados históricos abaixo pertencem à revisão 4 e são mantidos como registro separado. As notas de laboratório não representam medições de visitantes reais.

## Histórico: verificações executadas na revisão 4

Os resultados abaixo correspondem ao QA local da revisão 4 integrada:

- Larguras de 320, 390, 768, 1100 e 1440px, nos três idiomas, sem overflow horizontal.
- Formulário com erro de nome obrigatório e mensagens localizadas; destino `5581999712940` conferido. A abertura do WhatsApp foi interceptada durante os testes, sem envio de mensagens.
- Menu mobile, fechamento com Escape e comportamento de foco verificados.
- Redução de movimento com zero ScrollTriggers ativos; reativação restaurou oito triggers e uma única rota SVG do processo, sem duplicação.
- Página funcional a 390px com JavaScript desativado, incluindo alternativa de contato.
- Sequência direta e reversa confirmada: portas permanecem fechadas acima do térreo; abertura e saída do personagem respeitam a chegada ao andar zero.
- Lighthouse mobile local: 100 em acessibilidade, 100 em boas práticas e 100 em SEO; 59 verificações aprovadas e nenhuma reprovada no relatório.

Não foram medidas novas métricas de LCP ou CLS nesta rodada. Os valores de laboratório de uma revisão anterior não são apresentados como resultados da revisão 4. As notas do Lighthouse são locais e não representam medições de visitantes reais.

Em mudanças futuras, repetir os testes com os três idiomas e os dois estados de movimento, além de conferir o carregamento na subpasta pública do GitHub Pages, histórico/bfcache e falhas de imagens. O uso de imagens geradas e oito poses impõe limites à continuidade dos movimentos; não há promessa de “100% realismo”.

## Publicação

A configuração do GitHub Pages publica os arquivos da raiz da branch `main` a cada push. Não há etapa de build. O arquivo `.nojekyll` mantém a publicação estática direta. O endereço permanece [https://btcsolucoes.github.io/mozart-maia-imoveis/](https://btcsolucoes.github.io/mozart-maia-imoveis/).
