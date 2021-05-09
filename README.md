# Image Repository Application

This is an Image Repository Application ExpressJS project.
This project supports uploading and deleting of images as well as adding tags/metadata and search functionality. This project also supports role based access control so users with ADMIN permissions can perform all actions, but USERS have read-only permissions.

## General Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by ExpressJS
2. [Prisma](https://www.prisma.io/) ORM for [PostgreSQL](https://www.postgresql.org/).
5. [Heroku](https://heroku.com) for application and database deploys.

## Run locally

Duplicate `.env.sample` to `.env` and replace with your appropriate environment variables.

To deploy your database schema, run (one-time):

```bash
# Deploy schema.sql to Heroku postgres
heroku pg:psql -a YOUR_APP_NAME -f prisma/schema.sql

# Regenerate Prisma schema and client
yarn prisma introspect && npx prisma generate

# Seeding the database with sample data
yarn prisma db seed --preview-feature
```

To run the application:

```bash
# Install dependencies
yarn

# Run locally
yarn start
```
