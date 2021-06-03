# Notes

> A cool note app
	
## About the project
It is a simple app to take notes. It taught us to build server and client with the stack mentioned above and integrate them to work together.

#### Checkout the app client at https://ancora-imparo-notes-web.netlify.app/ 
![image](https://user-images.githubusercontent.com/36930635/120609104-85321d00-c46f-11eb-8808-b58f5de1b103.png)

#### Server: https://ancora-imparo-notes-api.herokuapp.com/
![image](https://user-images.githubusercontent.com/36930635/120609395-bf9bba00-c46f-11eb-9453-17dcdde2edd3.png)

## App Stack:
-  Client:
	- ReactJs
	- Typescript (tsx)
	- REST API
- Server: 
	- NodeJs & Typescript
	- Express 
	- PostgreSQL
	- Jest for testing

## Endpoints
####  GET
- `/`- health check
- `/notes`- all notes
- `/notes/{id}`- note with a specific id
####  POST
- `/notes`- create a new note or update an existing one
#### DELETE
- `/notes/{id}`- delete a note with specific id
