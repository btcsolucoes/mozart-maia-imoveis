# Mozart Maia | Negócios Imobiliários

Landing page em português, inglês e espanhol para comprar, vender ou avaliar imóveis em Recife. Publicação: [btcsolucoes.github.io/mozart-maia-imoveis](https://btcsolucoes.github.io/mozart-maia-imoveis/).

## Revisão 6

A identidade usa azul oceânico, branco e verde-água, com Manrope nos títulos e Source Sans 3 nos textos. A abertura começa com o prédio e a orla de Boa Viagem no mesmo enquadramento; acompanha a cabine até o térreo; abre as portas; apresenta a representação estilizada de Mozart; e revela o horizonte com 21 edifícios crescendo conforme a rolagem.

A fachada e a entrada pertencem à mesma composição arquitetônica. Uma aproximação gerada com essa imagem como referência fornece mais detalhe quando ocupa todo o enquadramento. É uma troca de nível de detalhe registrada pela porta, não uma reconstrução 3D ou filmagem. A cabine possui estrutura externa, reflexos e oclusão pelos trilhos. O personagem articula uma única pose fotográfica com alpha ajustado aos pés, evitando dissolvências entre braços e rostos diferentes; o movimento continua estilizado.

O conteúdo inclui fotografias com movimento de câmera, revelação do retrato, progressão das etapas de atendimento e um panorama de Recife. O WhatsApp flutua no canto inferior direito; PT/EN/ES ficam em uma cápsula no canto inferior esquerdo, com bandeiras de Brasil, Estados Unidos e Espanha. A abertura ocupa todo o viewport e mantém somente marca compacta e menu sobre a imagem. Ao sair da sequência, o cabeçalho recupera o fundo sólido. Serviços, formação, registros, endereço, redes sociais e perguntas frequentes permanecem disponíveis fora da sequência animada.

## Executar localmente

```powershell
python -m http.server 4174
```

Abra [localhost:4174](http://localhost:4174). Use HTTP para carregar os módulos; abrir o HTML diretamente como arquivo não reproduz a publicação. Não há build nem pacotes a instalar.

## Arquivos principais

- `index.html`: conteúdo, navegação, idiomas e contato.
- `styles.css`, `coastal.css`: tokens, tipografia, componentes e layout responsivo.
- `film.css`, `film.js`: palco e cronologia da abertura, sincronizados com a rolagem.
- `building-scene.js`: câmera, fachada, cabine, chegada e abertura das portas.
- `person-motion.js`: articulação contínua do personagem fotográfico.
- `skyline-scene.js`: 21 silhuetas fotográficas que crescem atrás da vegetação.
- `content-motion.js`, `content-motion.css`: movimentos nas demais seções e limpeza dos efeitos ao reduzir movimento.
- `app.js`: menu, movimento e preparação da mensagem de WhatsApp.
- `i18n.js`: traduções PT/EN/ES, rótulos acessíveis e mensagens do formulário.

Os scripts GSAP/ScrollTrigger 3.13.0 são locais. Módulos antigos e imagens históricas não importados pela página são mantidos como registros das revisões anteriores.

## Contato, privacidade e acessibilidade

O formulário prepara uma mensagem para [o WhatsApp de Mozart](https://wa.me/5581999712940). O visitante confirma o envio no WhatsApp; o site não envia a mensagem automaticamente e não armazena os campos. Nome é obrigatório, assunto é selecionável e mensagem é opcional. Sem JavaScript, o contato direto continua disponível.

Os controles PT/EN/ES traduzem conteúdo, metadados, textos alternativos, rótulos e mensagens. Apenas a preferência de idioma é armazenada localmente (`mozart-language`), com tratamento para armazenamento indisponível. As âncoras e os dados digitados são preservados ao traduzir.

“Reduzir movimento” desativa a abertura e os efeitos de conteúdo, considerando inicialmente a preferência do sistema. A versão estática preserva título, proposta e contato. O link de acessibilidade pula diretamente para o conteúdo. O menu fecha com Escape e devolve o foco ao botão.

Há uma única navegação de Serviços, Sobre Mozart e Contato. URLs anteriores com `?objetivo=comprar`, `vender`, `avaliar` ou `pericia` ainda selecionam o assunto; os controles não criam parâmetros adicionais.

## Destinos preservados do site original

- [Instagram](https://instagram.com/mozart.peritojudicial)
- [Facebook](https://www.facebook.com/mozart.maia.perito.judicial?mibextid=LQQJ4d)
- [LinkedIn](https://www.linkedin.com/in/mozartnegociosimobiliarios)
- [X / Twitter](https://x.com/mozartperito?s=11&t=zC0QPhEzoSuFwY5K3j6iBQ)
- [YouTube](https://www.youtube.com/@mozartperitojudicial)
- [Perfil APJEP](https://www.apjep.org.br/perito/148)

Telefone principal: (81) 99971-2940; secundário: (81) 99965-2940. Endereço: Av. Antônio de Góes, 60, 7º andar, Empresarial JCPM, Pina, Recife. CRECI-PE 6826 e CNAI 5829. Dados extraídos do [site original](https://www.mozartperitojudicial.com.br/).

## Créditos e licenças

A fotografia aérea de Recife é de [Arne Müseler](https://www.arne-mueseler.com/), disponível no [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Recife_aerial_view.jpg), sob [CC BY-SA 3.0 DE](https://creativecommons.org/licenses/by-sa/3.0/de/). Recebe recorte, redimensionamento e sobreposição de cor; preserve atribuição e licença.

O retrato vem do site original de Mozart. O solicitante autorizou a representação estilizada baseada nessa foto. Os demais cenários e o personagem são ilustrações produzidas para o projeto, não imóveis anunciados nem filmagem real. A imagem de interior tem legenda explícita. Proveniência: `assets/coastal-v6-provenance.md`, `assets/interior-v6-provenance.md`, registros históricos e sidecars `.webp.json`; o atlas PNG contém a origem em metadados.

Manrope e Source Sans 3 usam SIL Open Font License; licenças em `assets/manrope-OFL.txt` e `assets/source-sans-OFL.txt`. As licenças das fontes históricas também são preservadas. Bandeiras SVG de [flag-icons](https://github.com/lipis/flag-icons) usam MIT (`assets/flags/LICENSE.txt`). Ícones Tabler locais usam MIT (`assets/icons/LICENSE.txt`). GSAP mantém seus cabeçalhos e [termos de licença](https://gsap.com/standard-license).

## Verificações da revisão 6

- Larguras de 320, 390, 600, 768, 1100 e 1440px, nos três idiomas, sem overflow horizontal; controles flutuantes permanecem dentro da tela e separados entre si.
- 25 ScrollTriggers ativos; reduzir movimento remove todos; reativar restaura 25, uma moldura de retrato e uma rota do processo.
- Cronologia conferida: cabine chega ao térreo antes das portas; o personagem avança depois da abertura. Sequência reversível e 21 edifícios completos ao final.
- Capturas da abertura e conteúdo em desktop 1440 × 900 e celular 390 × 844, revisadas visualmente.
- Formulário, erros e preparação de mensagem nos três idiomas testados com abertura do WhatsApp interceptada, sem envio. Menu com Escape e foco verificado.
- Conteúdo e contato disponíveis com JavaScript desativado e movimento reduzido.
- JavaScript verificado e nenhuma exceção observada nos testes. Não são apresentados novos resultados de Lighthouse ou medições de visitantes reais.

## Publicação

GitHub Pages publica a raiz da branch `main` após o push, sem build de aplicação. `.nojekyll` mantém a publicação estática. Nas alterações, validar também os caminhos relativos na subpasta pública e a recuperação de histórico/bfcache. O uso de imagens e articulação 2D não permite prometer realismo de filmagem.
