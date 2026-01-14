import { Server } from "colyseus"
import type { Server as HttpServer } from "http"
import { GameRoom } from "./rooms/GameRoom"

export function createColyseusServer(httpServer: HttpServer): Server {
  const gameServer = new Server({ server: httpServer })
  
  gameServer.define("game", GameRoom)
  
  return gameServer
}
