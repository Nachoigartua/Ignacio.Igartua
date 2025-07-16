import supertest from "supertest"
import { expect } from "chai"

const url = supertest("http://localhost:8080")

describe("Test entidad VUELOS", () => {
    it("GET con TKN ", async () => {
        const resToken = await url.post("/login").set({ email: "test", password: "test" });
        const token = resToken.text;
        const response = await url.get("/vuelos").set("Authorization", token);
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array")
    })

    it("GET sin TKN ", async () => {
        const response = await url.get("/vuelos");
        expect(response.status).to.equal(401)
    })

    it("POST ", async () => {
        const resToken = await url.post("/login").set({ email: "test", password: "test" });
        const token = resToken.text;
        const response = await url.post("/vuelos")
            .set("Authorization", token)
            .send({
                id: "AAB" + Math.floor(Math.random()*900+100),
                xa: 7500,
                ya: 6200,
                za: 1000
            })
        expect(response.status).to.equal(200)
    })
})
