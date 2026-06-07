import { test, expect, APIRequestContext } from '@playwright/test';

let authRequest: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  authRequest = await playwright.request.newContext({
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME || '',
      password: process.env.HTTP_PASSWORD || '',
    },
  });

  await authRequest.post('/api/auth/signin', {
    data: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      remember: false,
    },
  });
});

test.afterAll(async () => {
  await authRequest.dispose();
});

test('should create car', async () => {
  const response = await authRequest.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 100,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.status).toBe('ok');
  expect(body.data.mileage).toBe(100);
});

test('should return error when mileage is negative', async () => {
  const response = await authRequest.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: -100,
    },
  });

  expect(response.status()).toBe(400);
});

test('should return error when carBrandId is missing', async () => {
  const response = await authRequest.post('/api/cars', {
    data: {
      carModelId: 1,
      mileage: 100,
    },
  });

  expect(response.status()).toBe(400);
});