# Image Repository Application

This is an Image Repository Application ExpressJS project.

## General Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by ExpressJS with PassportJS JWT Auth
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

To run the tests:

```bash
yarn test
```

## Using the Application (examples with Postman below)
There are 2 image endpoints available:
- GET /images
    - Returns JSON response of all uploaded images
- POST /images/create
    - Uploads an image 

There are 3 authentication endpoints available:
- POST /auth/register
    - Registers a user to use the application
- POST /auth/login
    - Logs in a user to use the application and returns a JWT auth token
- GET /auth/status
    - Checks a JWT token to see the user authorized

![alt text](https://imgur.com/zJxtfb3)

https://imgur.com/KnP2t11

https://imgur.com/4wDOikr

https://imgur.com/fLHGUnp

https://imgur.com/mWUdXvU

## Next Steps
This project can support uploading and deleting of images as well as adding tags/metadata and search functionality.  The backend schema already supports a lot of new flexible features such as tags, API endpoints simply need to be created for this.  This project can also support basic role based access control so users with ADMIN permissions can perform all actions, but USERS have read-only permissions (see schema).  Again, API endpints need to be created for this.  Another extension to consider is automatically tagging the images by hooking in a ML Image Detection Classifier API.
