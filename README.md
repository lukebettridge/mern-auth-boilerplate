# MERN Boilerplate with Authentication

![Node CI](https://github.com/lukebettridge/mern-auth-boilerplate/workflows/Node%20CI/badge.svg)

A boilerplate template project using the MongoDB, Express, React and Node.js technology stack.

## Getting Started

Follow the steps below to get this project running locally.

### Prerequisites

You'll need the following installed on your machine to run this project:

- Node.js (v8.x.x)
- npm (v6.x.x)

### Installation

Clone the repository to somewhere on your drive

```
git clone git@github.com:lukebettridge/mern-auth-boilerplate.git
```

Install the dependencies within the root of the project

```
npm install
```

Create a file named `.env` at the root of the project, using the `.env.example` file as a guide

```
cp .env.example .env
```

### Running the application

The application runs on two different ports, one for the client and the other for the server (set within the environment variables). To run the application for local development:

```
npm run dev
```

Which can now be viewed in the browser at:

```
http://localhost:5000/
```

## Testing

This boilerplate has unit and end-to-end testing written already for most of the functionality.

### Unit tests

The [Jest](https://jestjs.io) JavaScript testing framework is used for unit testing. To run these, execute the following:

```
npm run test
```

Pass in the `--coverage` flag to generate a coverage report which can then be found in a directory named `coverage` at the root of the project.

### E2E tests

The [Cypress](https://www.cypress.io) testing framework is used for end to end testing. To open the test runner, execute the following:

```
npm run cypress:open
```

Then select the specs you'd like to run. Alternatively, to run the tests within the Cypress CLI execute:

```
npm run cypress:run
```

The project _must_ be running locally for Cypress to run the specs correctly. A file named `cypress.env.json` will also need to exist in the project root with the following content:

```
{
  "apiUrl": "http://localhost:<server-port>",
  "baseUrl": "http://localhost:<client-port>"
}
```

## Deployment

There are workflows that get picked up and run by GitHub Actions on push to the `master` branch that build, test and deploy the application using a deploy script found in `/scripts`.

Otherwise, to build the project using webpack, run:

```
npm run build
```

Then start the project by executing:

```
npm start
```
