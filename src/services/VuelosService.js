import validation from "../utils/validation.js"
import Factory from "../models/Factory.js"

class VuelosService {
    constructor() {
        this.model = Factory.get(process.env.PERSISTENCE)
    }

    getVuelos = async () => {
        const vuelos = await this.model.getVuelos()
        return vuelos
    }

    postVuelo = async (vuelo) => {
        const validateVuelo = validation.schema.validate(vuelo)
        if(validateVuelo.error){
            return { errorMsg: "datos no válidos" }
        } else {
            const nuevoVuelo = await this.model.postVuelo(vuelo)
            return nuevoVuelo
        }
    }
}

export default VuelosService
