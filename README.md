# Nest.js GraphQL API

## Description

A simple GraphQL API that allows users to register accounts and submit reviews on any resource by specifying a title and link - such as a book, movie, product, or article.

## Scripts

```bash
# Project setup.
$ npm install

# Run e2e tests.
$ npm run test:e2e

# Run the development server.
$ npm run start:dev
```

## Use Cases

### Registration & Login

- Register a new user account.
- Log in to an existing user account.

### Create & Manage Reviews

- Create a new review by providing a title, link, rating, and comment.
- Retrieve all reviews.
- Retrieve all reviews by a specific user.
- Update an existing review.
- Delete a specific review.

## Project Modules

### Authentication

- User registration.
- User login.

### Users

- Get user profile.
- Update user profile.
- Delete user account.

### Reviews

- Create a new review.
- Get all reviews.
- Get all reviews by a user.
- Update a review.
- Delete a review.

## Database Schema

### User

| Field      | Type                             | Description     |
| ---------- | -------------------------------- | --------------- |
| id         | UUID PRIMARY KEY                 | -               |
| username   | VARCHAR UNIQUE                   | -               |
| email      | VARCHAR UNIQUE                   | -               |
| password   | VARCHAR                          | Hashed password |
| created_at | TIMESTAMP DEFAULT now() NOT NULL | -               |
| updated_at | TIMESTAMP DEFAULT now() NOT NULL | -               |

### Review

| Field      | Type                              | Description                    |
| ---------- | --------------------------------- | ------------------------------ |
| id         | UUID PRIMARY KEY                  | -                              |
| user_id    | UUID REFERENCES User(id) NOT NULL | Reviewer                       |
| title      | VARCHAR NOT NULL                  | Title of the reviewed resource |
| link       | TEXT                              | URL to the resource            |
| rating     | INTEGER NOT NULL                  | Rating score (1 to 10)         |
| comment    | TEXT                              | Review text                    |
| created_at | TIMESTAMP DEFAULT now() NOT NULL  | -                              |
| updated_at | TIMESTAMP DEFAULT now() NOT NULL  | -                              |
