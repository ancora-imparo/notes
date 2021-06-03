# Notes

> A cool note app
	
## About the project
It is a simple app to take notes. It supports richtext using react-prosemirror. It taught us to build server and client with the stack mentioned above and integrate them to work together.

#### Checkout the app client at https://ancora-imparo-notes-web.netlify.app/ 
#### Server: https://ancora-imparo-notes-api.herokuapp.com/

![notes-client](https://user-images.githubusercontent.com/36930635/120660974-7ebe9800-c4a5-11eb-9fbf-265540e651d0.png)

## App Stack:
-  Client:
	- React.js
	- Typescript
	- REST API
	
- Server: 
	- Typescript
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
