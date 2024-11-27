# TODO App MERN

#### TODO App Workflow

This is a ToDo app/website. In this app/website, the user can create an account and add a ToDo, delete a ToDo, and mark a ToDo as completed/incompleted.

## 🔗 Visit ToDo APP

[🌐 **ToDo APP**](https://todo-app-mern-l8f8.onrender.com/)

#### Models-

- User Model => This Model Handels All Users and Their SignUp, Login, Logout functionalities.
- ToDo Model => This Model Handel All ToDos and Their Creation, Updation, Deletion, etc.

#### Routes-

**User Routes**-

- **SignUp** (POST) => **url**- "/user/signup", Create a New Account. It returns JWT Token and save the token into cookie for Other work.
- **Login** (POST) => **url**- "/user/login", Log in to an Existing Account. It also returns JWT Token and stores into Localstorage for Other work like User authentication.
- **Logout** (GET) => **url**- "/user/logout", Logout the user. After that it clear the jwt from localstorage.

**ToDo Routes**-

- **Create ToDo** (POST) => **url**- "/todo/create", Only Login user can **Create** their ToDo.
- **Get/See all ToDos** (GET) => **url**- "/todo/fetch", Only Login user can **See** their all ToDos.
- **Update ToDo** (PUT) => **url**- "/todo/update/:id", Only Login user can **Update** their ToDo.
- **Delete ToDo** (DELETE) => **url**- "/todo/delete/:id", Only Login user can **Delete** their ToDo.

#### Middlewires-

We are using a middleware named "**authMiddleware**". With the help of this middleware, first check whether the user's cookie has jwt token or not. If jwt token is not present in the user cookie then we block the request. And if jwt token is present in the user cookie then we forward that request to its specific route.

## Code Guide / Installation-

- Clone files from Git repository. 
```bash
  git clone https://github.com/nilaybasak111/ToDo-App-MERN.git
```
- Then Install all node modules
```bash
  npm install
```
- Rename the .env.example file to .env. And add MongoDB url and Jwt Secret Key in .env file.
- Then run this command to create a dist folder
```bash
  npm run build
``` 
- Then start the project using this command
```bash
  npm run dev
```
Or
```bash
  npm run start
```

#### For More Information Please Visit the Code and The Image of the ToDo App MERN Workflow.png

# Improvement Scopes -

- Change the design a little bit. Add dark mode.