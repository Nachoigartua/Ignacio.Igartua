class VuelosModelMem {

    constructor(){
        this.vuelos = []
    }

    getVuelos = async () => {
        return this.vuelos
    }

    calcularColisiones = (vuelo, vuelos) => {
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

    postVuelo = async (vuelo) => {
        const index = this.vuelos.findIndex(v => v.id === vuelo.id)

        if(index !== -1){
            this.vuelos[index] = vuelo
        } else {
            this.vuelos.push(vuelo)
        }

        return this.calcularColisiones(vuelo, this.vuelos)
    }
}

export default VuelosModelMem
