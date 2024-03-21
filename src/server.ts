import fastify from "fastify"
import { z } from "zod"
import postgres from "postgres"
import { pg_db } from "./lib/postgres"
import { redis } from "./lib/redis"

const PORT = 4000
const app = fastify()

app.get("/", () => {return "Hello, world!"})

//Create a new shortened url link in the db
app.post("/api/links", async (request, reply) => {
  const requestShema = z.object({
    code: z.string().min(3),
    url: z.string().url()
  })
  const { code, url } = requestShema.parse(request.body)
  
  try {
    const result = await pg_db`
      INSERT INTO short_links (code, original_url)
      VALUES (${code}, ${url})
      RETURNING id
    `

    const link = result[0]

    return reply.status(201).send({ shortLinkId: link.id })
  } catch (err) {
  
    if (err instanceof postgres.PostgresError) {
      if (err.code === "23505") {
        return reply.status(400).send({ message: "Duplicated code!" })
      }
    }

    console.error(err)

    return reply.status(500).send({ message: "Internal error." })
  }
})

//List all data from the db
app.get("/api/links", async () => {
  const result = await pg_db`
    SELECT *
    FROM short_links
    ORDER BY created_at DESC
  `
  return result
})

//Get "shortLink", redirect to "originalUrl"
app.get("/:code", async (request, reply) => {
  const getLinkSchema = z.object({
    code: z.string().min(3),
  })

  const { code } = getLinkSchema.parse(request.params)

  const result = await pg_db`
    SELECT id, original_url
    FROM short_links
    WHERE short_links.code = ${code}
  `

  if (result.length === 0) {
    return reply.status(400).send({ message: "Link not found." })
  }

  const link = result[0]

  await redis.zIncrBy("metrics", 1, String(link.id))

  return reply.redirect(301, link.original_url)
})

//Get access metrics
app.get("/api/metrics", async () => {
  //https://redis.io/commands/zrange/
  const result = await redis.zRangeByScoreWithScores("metrics", 0, 50)

  const metrics = result
    //Order by DEC score:
    .sort((a, b) => b.score - a.score)
    //Remap obj keys from "value" (id), "score" to "shortLinkId", "clicks":
    .map(item => {
      return {
        shortLinkId: Number(item.value),
        clicks: item.score,
      }
    })

  return metrics
})


app
  .listen({port: PORT})
  .then(() => {console.log(`Server running on http://localhost:${PORT}`)})