import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DataSource } from 'typeorm';

describe('Nest.js GraphQL API (e2e)', () => {
  const testUsername = 'test@mail.com';
  const testPassword = 'password123';

  let app: INestApplication;
  let httpServer: any;
  let userId: string;
  let jwtToken: string;
  let reviewId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(reflector, {
        excludeExtraneousValues: true,
      }),
    );
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    await app.close();
  });

  it('should register a user', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `
        mutation {
          register(registerInput: {
            username: "${testUsername}",
            password: "${testPassword}",
          }) {
            id
            username
            createdAt
          }
        }`,
      });
    const { id, username, password, createdAt } = res.body.data.register;
    expect(id).toBeDefined();
    expect(username).toBe(testUsername);
    expect(password).toBeUndefined;
    expect(createdAt).toBeDefined();
    userId = id;
  });

  it('should login a user', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `
        mutation {
          login(loginInput: {
            username: "${testUsername}",
            password: "${testPassword}"
          }) {
            access_token
          }
        }`,
      });
    const { access_token } = res.body.data.login;
    expect(access_token).toBeDefined();
    jwtToken = access_token;
  });

  it('should create a review', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        query: `
        mutation {
          createReview(
            createReviewInput: {
              resourceUrl: "http://example.com/article",
              rating: 5,
              content: "Great resource!",
            }
          ) {
            id
            resourceUrl
            rating
            content
            createdAt
            updatedAt
            user {
              id
            }
          }
        }`,
      });
    const { id, resourceUrl, rating, content, user } =
      res.body.data.createReview;
    expect(id).toBeDefined();
    expect(resourceUrl).toBe('http://example.com/article');
    expect(rating).toBe(5);
    expect(content).toBe('Great resource!');
    expect(user.id).toBe(userId);
    reviewId = id;
  });

  it('should return reviews for a specified resource', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `
        query {
          reviewsForResource(resourceUrl: "http://example.com/article") {
            id
            content
          }
        }`,
      });
    expect(res.body.data.reviewsForResource.length).toBeGreaterThan(0);
  });

  it('should return reviews created by a specified user', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `
        query {
          reviewsCreatedByUser(userId: "${userId}") {
            id
          }
        }`,
      });
    expect(res.body.data.reviewsCreatedByUser.length).toBeGreaterThan(0);
  });

  it('should return review by ID', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `
        query {
          reviewById(reviewId: "${reviewId}") {
            id
          }
        }`,
      });
    expect(res.body.data.reviewById.id).toBe(reviewId);
  });

  it('should update a review', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        query: `
        mutation {
          updateReview(updateReviewInput: {
            reviewId: "${reviewId}",
            rating: 4,
            content: "Updated review content"
          }) {
            id
            rating
            content
          }
        }`,
      });
    const { rating, content } = res.body.data.updateReview;
    expect(rating).toBe(4);
    expect(content).toBe('Updated review content');
  });

  it('should delete a review', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        query: `
        mutation {
          deleteReview(reviewId: "${reviewId}") {
            id
          }
        }`,
      });
    expect(res.body.data.deleteReview.id).toBeNull();
  });

  it('should fail to create a review without JWT', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `
        mutation {
          createReview(createReviewInput: {
            resourceUrl: "http://fail.com"
            rating: 1,
            content: "Should fail"
          }) {
            id
          }
        }`,
      });
    expect(res.body.errors[0].message).toMatch(/Unauthorized/);
  });

  afterAll(async () => {
    await app.close();
  });
});
