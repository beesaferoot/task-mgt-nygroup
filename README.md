

# Task MGMT NYGROUP 


## Project structure 

The project features a widely used design pattern for structuring robust applications

```
src/
    controllers/
    dtos/
    entities/
    interfaces/
    middlewares/
    repos/
    routes/
    types/
    utils/
    validators/
/test
...
```

Here we leverage the package `@ebukaodini/scaffoldjs` for scaffolding (see [express-typescript-api-template](https://github.com/ebukaodini/express-typescript-api-template))


# Setup 

To run project locally you need to follow the steps below;

- install dependencies
```bash
 $ npm install
 $ npm run build
```

- config database by setting the url to your postgres database in the `.env` file 

```
DATABASE_URL="postgresql://groot:groot@localhost:5432/task-mgt?schema=public"
NODE_ENV=development
```

- Run migration 

```bash
  npm run migrate:db-dev
```

- Start up API server 

```bash 
  npm run start:dev
```

# Testing 

To test this project follow the steps below; 

- Update `.env.test` file to include your test database (postgres)
```
NODE_ENV=test
DATABASE_URL=""
```
- Setup test db 
```bash
   npm run preset
```

- Run tests

```bash
    npm run test
```