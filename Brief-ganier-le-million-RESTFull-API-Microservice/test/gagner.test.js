const app = require('../app.js')
const supertest = require('supertest')
const mongoose = require('mongoose')
require('dotenv').config()


beforeAll(async () => {
    const URL_DATA = process.env.DATABASE
    await mongoose.connect(URL_DATA)
})


// Vérfier que le participant été connecter ou registrer ou déconnecter
//  ++++++++++++++++++++ Signin +++++++++++++++++
it("Vérfier que le participant est connecter", async done => {
    const login = {
        email : "belcaid@gmail.com",
        password : "belcaid2020"
    }
    const response = await supertest(app).get("/api/signin")
              .send(login);
       done()
})


// ++++++++++++++++ Signup ++++++++++++++++++++

it("Vérfier que le participant est regitre", async done => {
    const login = {
        username: "Amine hajjiri",
        email: "amine@gmail.com",
        password :  "amine2020",
        age: 28,
        phone: "+212696396679"
  }
  
    const response = await supertest(app).get("/api/signup")
              .send(login);
              expect(response.status).toBe(404);
       done()
})

// ++++++++++++++++ Signout ++++++++++++++++++++

it("Vérfier que le participant est déconnecter", async done => {  
    const response = await supertest(app).get("/api/signup")
       done()
})

