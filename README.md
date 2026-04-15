# Desafio Técnico — Listagem de Usuários

Aplicação Angular desenvolvida para o desafio técnico.

---

## Tecnologias utilizadas

| Tecnologia | Versão |
|---|---|
| Node.js | 20.20.2 |
| npm | 10.8.2 |
| Angular | 17.3.x |
| Angular Material | 17.3.x |
| Angular CDK | 17.3.x |
| TypeScript | 5.4.x |
| RxJS | 7.8.x |
| ngx-mask | 21.x |
| Tailwind CSS | 3.4.x |
| Jest | 30.x |
| jest-preset-angular | 16.x |
| zone.js | 0.14.x |

---

## Pré-requisitos

- **Node.js** `>= 20` — [nodejs.org](https://nodejs.org)
- **npm** `>= 10`

Verifique suas versões:

```bash
node --version
npm --version
```

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd teste-desafio-pratico
npm install
```

---

## Executando o projeto

```bash
npm start
```

Acesse em: `http://localhost:4200`

---

## Executando os testes

Rodar todos os testes:

```bash
npm test
```

---

## Funcionalidades implementadas

- Listagem de usuários em tabela com nome, e-mail e ações
- Busca por nome com debounce de 300ms
- Modal de criação de novo usuário
- Modal de edição com formulário preenchido automaticamente
- Formulário reativo com validação de e-mail, nome, CPF e telefone
- Máscara de input para CPF (`000.000.000-00`) e telefone (`(00) 00000-0000`) via ngx-mask
- Notificaçoes via MatSnackBar ao criar ou editar usuário
- Botão salvar desabilitado enquanto o formulário estiver inválido
- Mensagens de erro em inputs mandatórios

## Decisões técnicas

- **Angular Signals + computed** para reatividade local do estado de usuários
- **RxJS** com `debounceTime`, `switchMap`, `takeUntil` e `map` para gerenciamento de subscriptions sem memory leaks
- **Componentes standalone** — sem NgModules
- **destroy$ pattern** com `Subject` + `takeUntil` para limpeza de subscriptions no `ngOnDestroy`
- **Dados mockados** array estático no `UsersService`
