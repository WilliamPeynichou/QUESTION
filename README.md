# Vue.js + Express App

Application full-stack avec Vue.js (frontend) et Node.js/Express (backend).

## Structure

```
.
├── backend/          # API Node.js/Express
│   ├── src/
│   │   ├── index.js         # Point d'entrée
│   │   ├── app.js           # Configuration Express
│   │   ├── routes/          # Routes API
│   │   └── controllers/     # Logique métier
│   └── package.json
└── frontend/         # Application Vue.js
    ├── src/
    │   ├── main.js          # Point d'entrée Vue
    │   ├── App.vue          # Composant racine
    │   ├── router/          # Vue Router
    │   └── views/           # Pages
    ├── index.html
    └── package.json
```

## Installation

```bash
npm run install:all
```

## Développement

Dans deux terminaux séparés :

```bash
# Terminal 1 – Backend (port 3000)
npm run dev:backend

# Terminal 2 – Frontend (port 5173)
npm run dev:frontend
```

Accéder à l'application : http://localhost:5173

Le frontend proxifie automatiquement les requêtes `/api/*` vers le backend.
