import VuelosController from "../controllers/VuelosController.js"
import express from "express"
import authMiddleware from "../middlewares/auth.js"

class Router {
    constructor() {
        this.controller = new VuelosController()
        this.router = express.Router()
    }

    start(){
        this.router.post("/login", this.controller.login)
        this.router.get("/vuelos", authMiddleware.verifyToken, this.controller.getVuelos)
        this.router.post("/vuelos", this.controller.postVuelo)
        return this.router
    }
}

export default Router
