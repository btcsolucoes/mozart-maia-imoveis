# Mozart Maia — Negócios Imobiliários

Landing page em português com foco na captação de compradores e vendedores de imóveis em Recife.

## Executar localmente

Com Python instalado, execute `python -m http.server 4173` nesta pasta e abra http://localhost:4173. Um servidor HTTP é necessário para carregar os módulos JavaScript e a cena WebGL. Não há etapa de build nem dependências a instalar.

## Estrutura

- `index.html`: conteúdo, informações profissionais e contatos.
- `styles.css`: identidade visual e layout responsivo.
- `app.js`: abas de serviços, menu, preferência de movimento e formulário.
- `cinematic.js`: apresentação Three.js vinculada à rolagem.
- `cinematic.css`: composição e sobreposições da apresentação.
- `coastal.css`: paleta, tipografia e composição atual da direção Boa Viagem.
- `coastal-scene.js`: arquitetura 3D, materiais, elevador e paisagismo.
- `coastal-horizon.js`: horizonte fotográfico com aproximação contínua e crescimento visual da cidade.
- `assets`: imagens, fontes e Three.js 0.180.0 hospedados localmente.

## Roteiro de movimento

A câmera começa no topo de um arranha-céu, aproxima-se do elevador e acompanha sua descida. As portas permanecem fechadas até o térreo; então Mozart sai. Uma transição revela um horizonte costeiro, com aproximação contínua da cidade e informações do escritório surgindo em etapas. A rolagem controla e reverte a sequência. O personagem é uma representação artística estilizada gerada a partir da foto do site original, e o edifício é cenográfico.

O site inclui atalho para pular a apresentação, pausa de movimento, preferência `prefers-reduced-motion` e fallback quando WebGL não está disponível.

## Contato

O formulário prepara uma mensagem para `https://wa.me/5581999712940`. O visitante confirma o envio no WhatsApp. Não há banco de dados ou envio automático. Nome obrigatório, objetivo selecionável e mensagem opcional. Telefone, endereço, registros e experiência foram extraídos do site original do profissional.

## Créditos

Foto de Recife: Arne Müseler, https://www.arne-mueseler.com/, via https://commons.wikimedia.org/wiki/File:Recife_aerial_view.jpg. Licença CC BY-SA 3.0 DE: https://creativecommons.org/licenses/by-sa/3.0/de/. Foram aplicados recorte, redimensionamento e sobreposição de cor; preservar atribuição e licença da fotografia adaptada.

Retrato: site de Mozart Maia. Personagem estilizado: geração de imagem autorizada pelo solicitante a partir desse retrato; prompt em CHARACTER-PROMPT.txt. Panorama de Boa Viagem: representação artística gerada para este projeto, usada na abertura e na capa. Fontes atuais: Outfit e Plus Jakarta Sans, distribuídas sob SIL Open Font License, com arquivos de licença em `assets/`. Three.js: licença MIT em `assets/vendor/THREE-LICENSE.txt`.

## Verificação

Revisão Boa Viagem testada com Playwright em larguras de 320, 390, 768 e 1440 px, sem overflow horizontal. Verificados ordem da chegada/portas/saída, movimento reduzido, fontes carregadas, abas por teclado e destino WhatsApp sem enviar mensagens. Nenhum erro de JavaScript observado. O detector Impeccable não apontou problemas nos novos arquivos. A medição de desempenho documentada na versão anterior não é uma medição desta revisão visual.

Publicado em https://btcsolucoes.github.io/mozart-maia-imoveis/. O GitHub Pages publica automaticamente os arquivos da raiz da branch main a cada push. Não há etapa de build. O arquivo .nojekyll mantém a publicação estática direta.
