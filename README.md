
# Authentication Kit – Sikkert og enkelt

Et enkelt og moderne autentiserings-kit bygget med:

- JavaScript
- Node.js
- Express
- Prisma ORM
- Neon Serverless PostgreSQL

Kittet er laget for å fungere med Neon Serverless Database, men kan også brukes med andre databaser som for eksempel MongoDB eller vanlig PostgreSQL med små tilpasninger.

---

## Funksjoner

Dette prosjektet inkluderer:

- Registrering av bruker (Sign Up)
- Innlogging (Login)
- Utlogging (Logout)
- Henting av brukerdata
- JWT-basert autentisering
- Prisma ORM integrasjon

---

## Kom i gang

### 1. Installer dependencies

```bash
npm install
```

---

### 2. Sett opp miljøvariabler

Kopier `.env.example` filen og opprett en `.env` fil:

```bash
cp .env.example .env
```

Fyll inn nødvendige miljøvariabler.

---

## Database migrering

For å opprette `User`-tabellen og kjøre Prisma migrering:

```bash
npx prisma migrate dev --name add_users_table
```

Dette vil:

* Opprette databasen/tabeller
* Generere Prisma Client
* Synkronisere schema mot databasen

---

## Prisma Studio (valgfritt)

For å se og redigere data i databasen via GUI:

```bash
npx prisma studio
```

---

## Seed dummy data

Du kan opprette en `seed.js` fil for å legge inn test- eller dummy-data i databasen.

Eksempel:

```js
const prisma = require("./prisma");

async function main() {
  await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "hashedPassword",
    },
  });

  console.log("Dummy data lagt til");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Kjør seed-filen med:

```bash
node seed.js
```

---

## Starte prosjektet

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

## Teknologier brukt

* Node.js
* Express.js
* Prisma ORM
* Neon Serverless PostgreSQL
* JWT Authentication
* bcrypt

---

## Prosjektstruktur

```bash
├── prisma
├── routes
├── controllers
├── middleware
├── utils
├── .env.example
├── server.js
└── README.md
```

---

## Lisens

MIT

```
```

