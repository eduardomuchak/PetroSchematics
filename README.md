# **Projeto DaaS Origem com ChakraUI, React, Redux Toolkit e Typescript**

Este repositório contempla uma aplicação [Create React App](https://create-react-app.dev/) pre-configurada com as seguintes dependências

- [Chakra UI](https://chakra-ui.com/getting-started)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Formik](https://formik.org/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router](https://reactrouter.com/)
- [Serve](https://github.com/vercel/serve)
- [Sass](https://sass-lang.com/)
- [Yup](https://github.com/jquense/yup)
- Dev Tools
  - [ESlint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Husky](https://typicode.github.io/husky/#/)
  - [Lint-Staged](https://github.com/okonet/lint-staged)
  - [Commitlint](https://commitlint.js.org/#/)
  - [Commitizen](https://commitizen-tools.github.io/commitizen/)


## **Scripts**

```bash
    "start": Inicia uma versão gerada,
    "build": Gera o build de uma versão de produção,
    "test": Roda todos os testes,
    "dev": Inicia na porta 3000,
    "lint": Lint dos arquivos,
    "lint:fix": Lint dos arquivos e autofix,
    "format":  Formatação dos arquivos,
    "format:check": Checagem da formatação dos arquivos,
    "commit": Comitar mudanças,
    "prepare": Será executado quando instalar todas as dependências do projeto.
```

## **Iniciando**

* Crie uma nova branch a partir da development
* O nome da branch deve ser feature/nome-da-feature ou fix/nome-da-feature-a-ser-corrigida

Certifique-se de possuir a versão correta do node instalada (v14) e então rode:

```bash
yarn && yarn dev
```

Para visualizar a aplicação, abra [http://localhost:3000](http://localhost:3000) no seu browser.

## **Padrões de commit**

  * `fix(:scope): (descrição)`: Corrige um bug.

  * `feat(:scope): (descrição)`: Adiciona uma nova funcionalidade.

  * `docs(:scope): (descrição)`: Adiciona uma nova documentação.

  * `style(:scope): (descrição)`: Corrige um bug de estilo.

  * `refactor(:scope): (descrição)`: Refatora um código.

  * `perf(:scope): (descrição)`: Melhora a performance.

  * `test(:scope): (descrição)`: Adiciona um novo teste.

  * `chore(:scope): (descrição)`: Altera o comportamento do projeto.

  * `revert(:scope): (descrição)`: Reverte um commit.

  * `release(:scope): (descrição)`: Lançamento de uma nova versão.

* **As descrições são opcionais. Caso coloque ele deverá ser breve.**

## **Enviado suas mudanças**

### 🚨 **Importante**

**Antes de enviar suas mudanças, certifique-se de que você fez um merge da branch `development` para a sua branch `feature/nome-da-feature`.**

* Para adicionar suas mudanças, faça uma Pull Request para a `development` e peça para alguém validar suas mudanças e fazer o merge.
* Depois de validado, faça outra Pull Request de `development` para `staging` e peça para alguém validar suas mudanças e fazer o merge.
* Depois de validado, faça outra Pull Request de `staging` para `homolog` e faça o merge.
* Depois de validado, faça outra Pull Request de `homolog` para `main` e faça o merge.

## **Branchs e ambientes**:

* **`development`** -> Branch do ambiente de Desenvolvimento

* **`staging`** -> Branch do ambiente de Quality Assurance (QA)

* **`homolog`** -> Branch do ambiente de Homologação

* **`main`** -> Branch do ambiente de Produção

## **Exemplos de PR**

- Pull Request de `feature/nome-da-feature` para `development`
  * `[FEAT] to [DEV] - (descrição)`

- Pull Request de `development` para `staging`:
  * `[DEV] to [STG] - (descrição)`

- Pull Request de `staging` para `homolog`:
  * `[STG] to [HMG] - (descrição)`

- Pull Request de `homolog` para `main`:
  * `[HMG] to [MAIN] - (descrição)`

**🚨 Qualquer PR que não siga o padrão acima será rejeitado.**
