# CRUD API with Logging

- It is a CRUD API made with NodeJs and ExpressJs made on MVC architecture.
- It is an API of employee Database that can perform CRUD operations.
- We can pass query params in the API to find employees and perform actions.
- It also logs and stores various components of request recieved to the Server.

## Setting up of project
- rename .env.example to .env and fill in the required enviornment variables
- run `npm install` to install all the dependencies
- run `npm run dev` for devlopment enviornment
- run `npm run prod` for live deployment

## API Endpoints
###### GET /api/empoyees
- Get all employees
###### GET /api/employees/get
- Get Employees by query parms
- queries - name(string) or status(active, inactive, true, false) or role
###### GET /api/logs
- Get all API Request Logs
###### POST /api/empoyees
- Create New Employees
- headers - Content-Type: "application/json"
- body - firstName, lastName, role, age, phone
###### PUT /api/empoyees
- Update an existing Employee
- queries - name(string) or status(active, inactive, true, false) or role
- headers - Content-Type: "application/json"
- body - contents to be updated
###### DELETE /api/empoyees
- Delete employee by query Params
- queries - name(string) or status(active, inactive, true, false) or role