import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { NarangoService } from "@ronatilabs/narango";

describe("Auth E2E", () => {
  let app: INestApplication;
  let narango: NarangoService;

  const user = {
    username: "e2e_user",
    email: "e2e@test.com",
    password: "123456",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    narango = app.get(NarangoService);
  });

  /**
   * Clean DB before tests
   */
  beforeEach(async () => {
    await narango.db.query(`
      FOR u IN users
        REMOVE u IN users
    `);
  });

  afterAll(async () => {
    await app.close();
  });

  // ================= REGISTER =================

  it("POST /auth/register → should create user", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/register")
      .send(user)
      .expect(201);

    expect(res.body).toMatchObject({
      username: user.username,
      email: user.email,
    });

    expect(res.body.id).toBeDefined();
  });

  it("POST /auth/register → duplicate user should fail", async () => {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send(user)
      .expect(201);

    await request(app.getHttpServer())
      .post("/auth/register")
      .send(user)
      .expect(409);
  });

  // ================= LOGIN =================

  it("POST /auth/login → should login", async () => {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send(user);

    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(201);

    expect(res.body.username).toBe(user.username);
  });

  it("POST /auth/login → wrong password", async () => {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send(user);

    await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        username: user.username,
        password: "wrong password",
      })
      .expect(401);
  });

  it("POST /auth/login → user not found", async () => {
    await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        username: "unknown",
        password: "123456",
      })
      .expect(401);
  });
});