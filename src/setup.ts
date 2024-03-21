import { pg_db } from "./lib/postgres"

async function setup() {

  await pg_db`
    CREATE TABLE IF NOT EXISTS short_links (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE,
      original_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await pg_db.end()

  console.log('Setup feito com sucesso!')
}

setup()