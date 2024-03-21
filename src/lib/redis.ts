import { createClient } from "redis"

//DATABASE_URL = provider://:PASSWORD@HOST:PORT (no USER, no DATABASE)

export const redis = createClient({
  url: "redis://:docker@localhost:6379",
})

redis.connect()