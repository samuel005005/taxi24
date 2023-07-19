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

#Ahora vamos a configurar acceso a bases de datos
cp .env.example .env

# Despliega el proyecto con Docker

docker-compose up -d --build
```

Listo! 🚀

Accede a Taxi24 en http://localhost:3000

## Para ver la documentacion del servicio (como se debe consumir)

Acceder a la ruta http://localhost:3000/api

(luego de haber desplegado el ambiente).

## Test

```bash
# unit tests
$ docker exec nest-docker-postgres yarn run test
```

## Postman File

[Taxi24.json](./Taxi24.postman_collection.json)

- Este archivo permite importar los endpoint para probarlos.
- Como importarlo a postman : https://learning.postman.com/docs/getting-started/importing-and-exporting-data/

## Arquitectura del proyecto

Este proyecto esta compuesto por 5 modulos:

- Driver
  - Domain (Modelos, Contratos, etc)
  - Application (Casos de usos de la aplicacion)
  - Infrasturure (Todo lo externo, como librerias de terceros o el framework mismo.)
- Invoices
  - Domain (Modelos, Contratos, etc)
  - Application (Casos de usos de la aplicacion)
  - Infrasturure (Todo lo externo, como librerias de terceros o el framework mismo.)
- Trip
  - Domain (Modelos, Contratos, etc)
  - Application (Casos de usos de la aplicacion)
  - Infrasturure (Todo lo externo, como librerias de terceros o el framework mismo.)
- Passengers
  - Domain (Modelos, Contratos, etc)
  - Application (Casos de usos de la aplicacion)
  - Infrasturure (Todo lo externo, como librerias de terceros o el framework mismo.)
- Shared
  - Domain (Modelos, Contratos, etc)
  - Application (Casos de usos de la aplicacion)
  - Infrasturure (Todo lo externo, como librerias de terceros o el framework mismo.)
