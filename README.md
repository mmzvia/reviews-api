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

## Scenarios

### Registration & Login

- Register a new user account.
- Log in to an existing user account.

### Create & Manage Reviews

- Create a new review by providing a title, link, rating, and comment.
- Retrieve reviews for a specified resource.
- Retrieve reviews created by a specific user.
- Get a review by ID.
- Update an existing review.
- Delete a specific review.

## Modules

### Authentication

- User registration.
- User login.

### Users

- Get user profile.
- Update user profile.
- Delete user account.

### Reviews

- Create a new review.
- Get reviews for a resource.
- Get reviews by a user ID.
- Get review by ID.
- Update a review.
- Delete a review.
