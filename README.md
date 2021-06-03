# Notes

> A cool note app
	
## About the project
It is a simple app to take notes. It supports richtext using react-prosemirror. It taught us to build server and client with the stack mentioned above and integrate them to work together.

#### Checkout the app client at https://ancora-imparo-notes-web.netlify.app/ 
![notes-client](https://user-images.githubusercontent.com/36930635/120647639-7449d180-c498-11eb-9d1b-00786bf8a5b7.png)


#### Server: https://ancora-imparo-notes-api.herokuapp.com/

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
