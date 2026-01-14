import express from "express"
import { createServer } from "http"
import { createColyseusServer } from "../colyseus/server"

export function bootstrap(): void {
  const port = Number(process.env.PORT ?? 2567)
  const app = express()
  app.get("/", (_req, res) => {
    res.status(200).send("ok")
  })
  const httpServer = createServer(app)
  createColyseusServer(httpServer)
  httpServer.listen(port, "0.0.0.0")
}
