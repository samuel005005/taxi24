[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"><h1>Taxi24</h1></p>

## ¿Que necesitas?

- Docker
- Git

## Installation

- Instalar docker para correr la aplicacion
  - Windows (https://docs.docker.com/desktop/install/windows-install/)
  - Linux (https://docs.docker.com/desktop/install/linux-install/)
  - Mac (https://docs.docker.com/desktop/install/mac-install/)

## Configurar el proyecto

1. Clona el repositorio

```bash
git clone git@github.com:samuel005005/taxi24.git
```

2. Ahora vamos a levantar el ambiente con Docker

```bash
# Accede al directorio taxi24

cd taxi24

# Despliega el proyecto con Docker

docker-compose up -d --build
```

Listo! 🚀

Accede a Taxi24 en http://localhost:3000

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
