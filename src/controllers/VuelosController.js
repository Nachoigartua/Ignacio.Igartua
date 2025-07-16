import VuelosService from "../services/VuelosService.js"

class VuelosController {
    constructor() {
        this.service = new VuelosService()
    }

    getVuelos = async (req, res) => {
        const vuelos = await this.service.getVuelos()
        res.send(vuelos)
    }

    postVuelo = async (req, res) => {
        const vuelo = req.body
        const resultado = await this.service.postVuelo(vuelo)
        res.send(resultado)
    }
}

export default VuelosController
