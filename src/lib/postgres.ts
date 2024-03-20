import postgres from "postgres"

//DATABASE_URL = provider://USER:PASSWORD@HOST:PORT/DATABASE
export const pg_db = postgres("postgresql://docker:docker@localhost:5432/shortlinks")