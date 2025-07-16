import fs from "fs"

class VuelosModelFS {

    constructor(){
        this.path = "./vuelos.txt"
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, "[]")
        }
    }

    getVuelos = async () => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }

    postVuelo = async (vuelo) => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const vuelos = JSON.parse(data)

        const index = vuelos.findIndex(v => v.id === vuelo.id)

        if(index !== -1){
            vuelos[index] = vuelo
        } else {
            vuelos.push(vuelo)
        }

        await fs.promises.writeFile(this.path, JSON.stringify(vuelos, null, 2))

        const colisiones = []

        for(const otro of vuelos){
            if(otro.id !== vuelo.id){
                const d = Math.sqrt(
                    Math.pow(vuelo.xa - otro.xa, 2) +
                    Math.pow(vuelo.ya - otro.ya, 2) +
                    Math.pow(vuelo.za - otro.za, 2)
                )

                if(d < 500){
                    colisiones.push(otro.id)
                }
            }
        }

        return colisiones
    }
}

export default VuelosModelFS
