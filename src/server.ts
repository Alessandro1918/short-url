import fastify from "fastify"

const PORT = 4000
const app = fastify()

app.get("/", () => {return "Hello, world!"})

app
  .listen({port: PORT})
  .then(() => {console.log(`Server running on http://localhost:${PORT}`)})