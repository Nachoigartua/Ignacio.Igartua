import MongoConnection from "../MongoConnection.js"

class VuelosModelMongo {
    constructor() {
    }

    async getVuelos() {
        if (!MongoConnection.db) {
            await MongoConnection.connection();
        }
        const collection = MongoConnection.db.collection("vuelos");
        return await collection.find({}).toArray();
    }

    async postVuelo(vuelo) {
        if (!MongoConnection.db) {
            await MongoConnection.connection();
        }
        const collection = MongoConnection.db.collection("vuelos");
        const existente = await collection.findOne({ id: vuelo.id });

        if (existente) {
            await collection.updateOne({ id: vuelo.id }, { $set: vuelo });
        } else {
            await collection.insertOne(vuelo);
        }

        const todos = await collection.find({}).toArray();
        const colisiones = [];

        for (const otro of todos) {
            if (otro.id !== vuelo.id) {
                const d = Math.sqrt(
                    Math.pow(vuelo.xa - otro.xa, 2) +
                    Math.pow(vuelo.ya - otro.ya, 2) +
                    Math.pow(vuelo.za - otro.za, 2)
                );

                if (d < 500) {
                    colisiones.push(otro.id);
                }
            }
        }

        return colisiones;
    }
}

export default VuelosModelMongo
