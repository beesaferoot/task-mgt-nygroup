# Task MGMT API 

We outline the API endpoints exposed by the task management rest service.



# Models 

The project makes use of prisma for defining the data schema for tasks and users. 

```prisma
model User {
    id       Int    @id @default(autoincrement())
    name     String
    email    String @unique
    password String
    tasks    Task[]

    @@map("users")
}

model Task {
    id          Int        @id @default(autoincrement())
    description String
    startDate   DateTime
    endDate     DateTime
    createdAt   DateTime   @default(now())
    status      TaskStatus
    userId      Int
    user        User       @relation(fields: [userId], references: [id])

    @@map("tasks")
}

enum TaskStatus {
    TODO
    IN_PROGRESS
    COMPLETED
    CANCELLED
}
```

# CRUD endpoints 

The table below shows the exposed endpoints and their functionalities. 


#### Creating new task

<details>
 <summary><code>POST</code> <code><b>/api/v1/tasks</b></code> <code>(create new task)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | description      |  required |  string | task description |
> | startDate      |  required |  DateTime | task start date |
> | endDate      |  required |  DateTime | task end date |
> | userId      |  required |  number | user id associated with task |
> | status      |  optional |  string | task status (defaults to "TODO") |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `Task created.`                                |
> | `422`         | `application/json`                | `{"message":"Validation failed","errors": { userId: "User id is required"}}`                            |

##### Example cURL

> ```javascript
>  curl -L "localhost:3000/api/v1/tasks/" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjE2MDgwNywiZXhwIjoxNzE2MTY4MDA3fQ.mGAF3Lo3Z48QCVvnHQ_4one1M5S6xBAqnA59yqteQYA" -H "Content-Type: application/json" -d "{ \"userId\": 1,\"description\": \"task 90\",\"startDate\": \"2024-5-25\", \"endDate\": \"2024-5-25\"}"
>
> ```
</details>

------------------------------------------------------------------------------------------





#### Get task by user id 

<details>
 <summary><code>GET</code> <code><b>/api/v1/tasks</b></code> <code>(fetch tasks by user id)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId      |  required |  number | user id associated with task |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "message": "All user tasks", data: {...}}`                                |
> | `422`         | `application/json`                | `{"message":"Validation failed","errors": { userId: "User id is required"}}`                            |

##### Example cURL

> ```javascript
>  curl -L -X GET "localhost:3000/api/v1/tasks/" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjE2MDgwNywiZXhwIjoxNzE2MTY4MDA3fQ.mGAF3Lo3Z48QCVvnHQ_4one1M5S6xBAqnA59yqteQYA" -H "Content-Type: application/json" -d "{\"userId\": 1}"
>
> ```
</details>

------------------------------------------------------------------------------------------




#### Get task by id 

<details>
 <summary><code>GET</code> <code><b>/api/v1/tasks/:taskId</b></code> <code>(fetch task with id)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | taskId      |  required |  number | id of associated task |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "message": "Task details.", data: {...}}`                                |
                           |

##### Example cURL

> ```javascript
> curl -L "localhost:3000/api/v1/tasks/1" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjE2MDgwNywiZXhwIjoxNzE2MTY4MDA3fQ.mGAF3Lo3Z48QCVvnHQ_4one1M5S6xBAqnA59yqteQYA" -d ""
>
> ```
</details>

------------------------------------------------------------------------------------------




#### Update task by id 

<details>
 <summary><code>PATCH</code> <code><b>/api/v1/tasks/:taskId</b></code> <code>(update task with id)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | taskId      |  required |  number | id of associated task |
> | description      |  optional |  string | task description |
> | startDate      |  optional |  DateTime | task start date |
> | endDate      |  optional |  DateTime | task end date |
> | userId      |  optional |  number | user id associated with task |
> | status      |  optional |  string | task status (defaults to "TODO") |
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "message": "Task updated.", data: {...}}`                                |
                           |

##### Example cURL

> ```javascript
> curl -L -X PATCH "localhost:3000/api/v1/tasks/1" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjE2MDgwNywiZXhwIjoxNzE2MTY4MDA3fQ.mGAF3Lo3Z48QCVvnHQ_4one1M5S6xBAqnA59yqteQYA" -H "Content-Type: application/json" -d {\"status\": \"IN_PROGRESS\" }"
>
> ```
</details>

------------------------------------------------------------------------------------------



#### Delete task by id 

<details>
 <summary><code>DELETE</code> <code><b>/api/v1/tasks/:taskId</b></code> <code>(delete task with id)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | taskId      |  required |  number | id of associated task |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "message": "Task deleted.", data: {...}}`                                |
                           

##### Example cURL

> ```javascript
> curl -L -X DELETE "localhost:3000/api/v1/tasks/6" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjE2MDgwNywiZXhwIjoxNzE2MTY4MDA3fQ.mGAF3Lo3Z48QCVvnHQ_4one1M5S6xBAqnA59yqteQYA" -H "Content-Type: application/json" -d ""
>
> ```
</details>

------------------------------------------------------------------------------------------