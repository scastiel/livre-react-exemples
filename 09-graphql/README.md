## Création application Auth0

- Rendez-vous sur https://auth0.com/
- Cliquez sur « Use Auth0 for free »
- Suivez les étapes pour créer un compte et une nouvelle application
- Notez le domaine (`dev-XXXXXXX.auth0.com`) et le client ID (suite de 32
  caractères) qui vous seront donnés
- Dans la configuration de l’application:
  - Dans _Allowed Callback URLs_, ajoutez « http://localhost:1234/callback »
  - Dans _Allowed Logout URLs_, ajoutez « http://localhost:1234 »

## Lancement de l’API Graphcool

- Créer un fichier _api/.env_ :

```
AUTH0_DOMAIN=<domaine_auth0>
AUTH0_CLIENT_ID=<client_id_auth0>
```

- `cd api && yarn deploy`

Notez l’URL (Simple) qui vous sera donnée.

## Lancement du client

- Créer un fichier _client/.env_ :

```
AUTH0_CLIENT_DOMAIN=<domaine_auth0>
AUTH0_CLIENT_ID=<client_id_auth0>
GRAPHCOOL_URI=<uri_simple_graphcool>
```

- `yarn start`
