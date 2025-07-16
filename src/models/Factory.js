import VuelosModelMem from "./DAO/VuelosModelMemory.js"
import VuelosModelFS from "./DAO/VuelosModelFS.js"
import VuelosModelMongo from "./DAO/VuelosModelMongo.js"

class Factory {
    static get(persistence){
        switch (persistence) {
            case "fs":
                console.log("Pensistiendo en File System...")
                return new VuelosModelFS()

            case "memory":
                console.log("Persistiendo en la memoria del servidor...")
                return new VuelosModelMem()

            case "mongo":
                console.log("Persistiendo en MongoDB...")
                return new VuelosModelMongo()

            default:
                console.log("Persistiendo en memoria default...")
                return new VuelosModelMem()
        }
    }
}

export default Factory
