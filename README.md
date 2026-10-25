# 💬 Super Chat — Front-end

Interface web de um chat em tempo real com salas temáticas, construída com **Next.js (App Router)** e **React 19**, que se comunica com um servidor **WebSocket**.

O usuário escolhe um *nick*, entra no chat e troca mensagens com outras pessoas conectadas, alternando entre as salas disponíveis.

> 🔗 Back-end correspondente: [SuperChat-Backend](https://github.com/MarcosValerioDev/Backend-Chat) (Node.js + `ws`)

---

## ✨ Funcionalidades

- **Login por nick**: o nick precisa ter **no mínimo 6 caracteres**; caso contrário, um alerta é exibido.
- **Identificação de sessão**: cada usuário recebe um `userId` único gerado com `crypto.randomUUID()` ao entrar.
- **Mensagens em tempo real** via WebSocket.
- **Salas temáticas**: Programação, IA, JavaScript, C# e Games.
- **Diferenciação visual** entre mensagens próprias e de outros usuários (estas exibem o nick do autor).
- **Rolagem automática** e suave para a última mensagem recebida.

## 🛠️ Tecnologias

| Tecnologia | Versão |
| --- | --- |
| [Next.js](https://nextjs.org/) | 16.1.1 |
| [React](https://react.dev/) / React DOM | 19.2.3 |
| [TypeScript](https://www.typescriptlang.org/) | 5 |
| [@mui/material-nextjs](https://mui.com/material-ui/integrations/nextjs/) + [@emotion/cache](https://emotion.sh/) | 7.3.6 / 11.14.0 |
| [react-icons](https://react-icons.github.io/react-icons/) | 5.5.0 |
| ESLint (`eslint-config-next`) | 9 |
| WebSocket API nativa do navegador | — |

Estilização com **CSS Modules** e CSS global ([src/app/globals.css](src/app/globals.css)). Fontes **Geist** e **Geist Mono** via `next/font/google`.

## 📁 Estrutura do projeto

```
SuperChat-Front/
├── public/                     # Arquivos estáticos
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz (fontes + AppRouterCacheProvider do MUI)
│   │   ├── page.tsx            # Página principal: controla o fluxo entre as telas
│   │   ├── globals.css         # Estilos globais (chat, salas, mensagens, input)
│   │   └── page.module.css
│   └── component/
│       ├── LoginSuperChat/     # Tela de entrada do nick
│       ├── AlertSuperChat/     # Modal de alerta (nick inválido)
│       ├── SuperChatView/      # Tela do chat: salas, mensagens e conexão WebSocket
│       ├── MessageOwner/       # Balão de mensagem do próprio usuário
│       └── MessageOther/       # Balão de mensagem de outros usuários
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 🔄 Fluxo da aplicação

A página principal ([src/app/page.tsx](src/app/page.tsx)) funciona como uma pequena máquina de estados:

| Estado | Tela | Descrição |
| --- | --- | --- |
| `0` | `LoginSuperChat` | Usuário informa o nick |
| `1` | `SuperChatView` | Chat ativo (nick válido) |
| `100` | `AlertSuperChat` | Nick vazio ou com menos de 6 caracteres; o botão **Entendi** volta ao login |

## 📡 Comunicação com o servidor

Ao abrir o chat, o componente `SuperChatView` conecta-se a:

```
ws://localhost:8081
```

Cada mensagem é enviada como JSON:

```json
{
  "type": 0,
  "userId": "b1f0c6e2-...-9a1d",
  "nickName": "MeuNick",
  "message": "Olá, pessoal!"
}
```

| Campo | Descrição |
| --- | --- |
| `type` | ID da sala: `0` Programação · `1` IA · `2` JavaScript · `3` C# · `4` Games |
| `userId` | UUID da sessão do usuário |
| `nickName` | Nick escolhido no login |
| `message` | Texto da mensagem |

O servidor faz *broadcast* da mensagem para todos os clientes conectados, e cada cliente exibe apenas as mensagens cujo `type` corresponde à sala selecionada.

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- O [back-end do SuperChat](https://github.com/MarcosValerioDev/Backend-Chat) rodando na porta `8081`

### 1. Suba o back-end

```bash
git clone https://github.com/MarcosValerioDev/Backend-Chat.git
cd Backend-Chat
npm install
npm start
```

### 2. Suba o front-end

```bash
git clone https://github.com/MarcosValerioDev/SuperChat-FrontEnd.git
cd SuperChat-FrontEnd
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

> ⚠️ O back-end só aceita conexões das origens `http://localhost:3000` e `https://superchat-marcosdev.netlify.app`. Se rodar o front em outra porta ou domínio, adicione a origem em `ALLOWED_ORIGINS` no `server.js` do back-end.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm start` | Executa o build de produção |
| `npm run lint` | Executa o ESLint |

## 🌐 Deploy

Para publicar, altere a URL do WebSocket em [src/component/SuperChatView/index.jsx](src/component/SuperChatView/index.jsx) para o endereço do servidor em produção (usando `wss://` quando o site estiver em HTTPS) e libere o domínio do front-end em `ALLOWED_ORIGINS` no back-end.

## 📌 Melhorias futuras

- [ ] Mover a URL do WebSocket para uma variável de ambiente (`NEXT_PUBLIC_WS_URL`)
- [ ] Indicador visual do status da conexão (o estado já existe em `SuperChatView`)
- [ ] Enviar mensagem ao pressionar **Enter** e ignorar mensagens vazias
- [ ] Reconexão automática quando o WebSocket cair
- [ ] Destacar a sala selecionada na lista
- [ ] Layout responsivo para telas pequenas
- [ ] Atualizar `metadata` (título/descrição) e `lang="pt-BR"` em `layout.tsx`

## 👤 Autor

Desenvolvido por **Marcos Valério** — [GitHub](https://github.com/MarcosValerioDev)
