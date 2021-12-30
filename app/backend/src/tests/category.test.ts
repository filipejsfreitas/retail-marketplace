import { validateEnv } from '../utils/validateEnv';
validateEnv();

import { App } from '../app';
import request from "supertest";
import mongoose from 'mongoose';
import { CONTROLLERS } from '../controllers';

const app = new App(CONTROLLERS);
app.init();
//app.listen();

describe("POST / - registo de uma categoria", () => {
  it("tenta registar uma categoria", async () => {
    const result = await request(app).post("/category/")
    .send({name:'categoria teste2keubntudagisgreo'});
    expect(result.statusCode).toEqual(200);
  });
});

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get("/category/");
    expect(result.statusCode).toEqual(200);


  });
});

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get("/category/61a4c71ef2d604032f7d735c");
    expect(result.statusCode).toEqual(200);
    expect(result.body.data._id).toEqual("61a4c71ef2d604032f7d735c");


  });
});


describe("PuT / - update de uma categoria", () => {
  it("tenta mudar uma categoria", async () => {
    const result = await request(app).put("/category/61a4c71ef2d604032f7d735c")
    .send({name:'categoria teste2000',parent_id: 'srdtfgyihojpk'});
    expect(result.statusCode).toEqual(200);


  });
});
/*
describe("Delete / - apagar uma categoria e os seus descendentes", () => {
  it("tenta apagar uma categoria", async () => {
    const result = await request(app).delete("/category/61a3f64a76ecb383b829f74b")
    //expect(result.text).toEqual('Ok');
    expect(result.statusCode).toEqual(200);


  });
});

*/
afterAll(() => mongoose.disconnect());
