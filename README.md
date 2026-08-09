# Angular Course

Este repositório contém vários projetos Angular criados ao longo do curso. Cada pasta representa um aplicativo independente.

## Estrutura dos projetos

- data-binding: demonstração de data binding em Angular.
- diretivas: exemplos de diretivas estruturais e de atributo.
- forms: uso de formulários reativos e template-driven.
- pipes: exemplos de pipes customizados e embutidos.
- requests-http: consumo de APIs com HttpClient.
- rotas: navegação entre páginas com Angular Router.
- servicos: uso de serviços para compartilhar lógica e dados.

## Requisitos

Antes de executar qualquer projeto, certifique-se de ter instalado:

- Node.js
- npm

## Como executar um projeto

1. Entre na pasta do projeto desejado.
2. Instale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
4. Abra o navegador na URL informada pelo Angular, normalmente:
   ```text
   http://localhost:4200/
   ```

## Exemplos de execução

### Data Binding
```bash
cd data-binding
npm install --legacy-peer-deps
npm start
```

### Diretivas
```bash
cd diretivas
npm install --legacy-peer-deps
npm start
```

### Forms
```bash
cd forms
npm install --legacy-peer-deps
npm start
```

### Pipes
```bash
cd pipes
npm install --legacy-peer-deps
npm start
```

### Requests HTTP
```bash
cd requests-http
npm install --legacy-peer-deps
npm start
```

### Rotas
```bash
cd rotas
npm install --legacy-peer-deps
npm start
```

### Serviços
```bash
cd servicos
npm install --legacy-peer-deps
npm start
```

## Observação

Alguns projetos podem usar portas diferentes se a porta 4200 estiver ocupada. Nesse caso, o Angular irá sugerir outra porta automaticamente.
