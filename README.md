[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"><h1>Taxi24</h1></p>

## Requirement

- Instalar docker para correr la aplicacion
  - Windows (https://docs.docker.com/desktop/install/windows-install/)
  - Linux (https://docs.docker.com/desktop/install/linux-install/)
  - Mac (https://docs.docker.com/desktop/install/mac-install/)

## Installation

Correr la aplicacion

```bash
$ docker-compose up -d --build
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
