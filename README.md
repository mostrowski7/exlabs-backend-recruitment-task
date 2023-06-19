## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Authentication](#authentication)
* [Endpoints](#endpoints)

## General info
Exlabs backend recruitment task - User management API specification

## Technologies
* Express.js
* PostgreSQL raw queries
* TypeDI
* Winston
* Class-validator
* JWT
* Knex migration and seed
* Jest
* Docker
	
## Setup
### Run
```
# Rename .env.example to .env
$ mv .env.example .env

# Build
$ docker-compose build

# Start
$ docker-compose up -d
```

### Test
```
$ docker-compose run api npm run test
```

### Migration
```
$ docker-compose run api npm run migration
```

### Seed
```
$ docker-compose run api npm run seed

#  Created user

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "jsmith@gmail.com",
  "role": "user"
}

```

## Authentication
To use the endpoints you need to get a token first (application use JWT tokens)\
You can achieve that by making a POST request to `/api/auth` with email in body\
After that, remember to include token in requests using the bearer authentication scheme


## Endpoints

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`    | `/api/auth`                             | Authenticate user                      |
| `GET`    | `/api/users` or `/api/users?role=user`                             | Get all users                      |
| `GET`   | `/api/users/:id`                             | Get user                       |
| `POST`    | `/api/users`                          | Create user                       |
| `PATCH`  | `/api/users/:id`                          | Update user                 |
| `DELETE`   | `/api/users/:id`                 | Delete user                 |

