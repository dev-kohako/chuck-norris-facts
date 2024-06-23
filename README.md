Para começar com o projeto, clone o repositório e instale as dependências:

bash
Copiar código
git clone https://github.com/seu-usuario/chuck-norris-facts.git
cd chuck-norris-facts
npm install
Scripts Disponíveis
No diretório do projeto, você pode executar:

npm start
Inicia o aplicativo no modo de desenvolvimento.
Abra http://localhost:3000 para ver no navegador.

A página será recarregada se você fizer edições.
Você também verá quaisquer erros de lint no console.

npm test
Inicia o Cypress para testes end-to-end.

npm run build
Constrói o aplicativo para produção na pasta build.
Ele agrupa corretamente o React no modo de produção e otimiza a construção para o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.
Seu aplicativo está pronto para ser implantado!

npm run lint
Roda o linter para verificar erros no código.

Configuração do Ambiente
Certifique-se de que você tenha um arquivo .env na raiz do seu projeto com as seguintes variáveis de ambiente:

bash
Copiar código
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
Estrutura do Projeto
Aqui está uma breve descrição da estrutura de pastas do projeto:

css
Copiar código
chuck-norris-facts/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── DarkModeButton.tsx
│   │   ├── Modal.tsx
│   │   ├── SearchByCategorySection.tsx
│   ├── pages/
│   │   ├── RandomFact.tsx
│   │   ├── Categories.tsx
│   │   ├── FactByFreeText.tsx
│   ├── queries/
│   │   ├── index.ts
│   │   └── GET_CHUCK_NORRIS_FACT_BY_TEXT.ts
│   ├── styles/
│   │   ├── index.css
│   ├── utils/
│   │   ├── delay.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
└── ...
Deploy no Netlify
Passo a Passo para o Deploy
Configuração do Repositório:

Faça o push do seu código para um repositório GitHub, GitLab ou Bitbucket.
Crie uma Conta no Netlify:

Acesse Netlify e crie uma conta.
Novo Site no Netlify:

No painel do Netlify, clique em "New site from Git".
Conecte ao Repositório:

Escolha o provedor Git e selecione o repositório do seu projeto.
Configurações de Build:

Build Command: npm run build
Publish Directory: build
Variáveis de Ambiente:

Adicione as variáveis de ambiente necessárias no painel de configurações do Netlify.
Deploy:

Clique em "Deploy site". O Netlify vai iniciar o processo de build e deploy do seu projeto.
Contribuindo
Se você quiser contribuir com este projeto, por favor, abra uma issue ou envie um pull request com suas mudanças. Certifique-se de seguir as diretrizes de contribuição.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
