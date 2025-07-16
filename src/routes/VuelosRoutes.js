import VuelosController from "../controllers/VuelosController.js"
import express from "express"

class Router {
    constructor() {
        this.controller = new VuelosController()
        this.router = express.Router()
    }

    start(){
        this.router.get("/vuelos", this.controller.getVuelos)
        this.router.post("/vuelos", this.controller.postVuelo)
        return this.router
    }
}

export default Router
