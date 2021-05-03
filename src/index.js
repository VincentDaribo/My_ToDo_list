
const express = require('express')
const path = require('path')
const app = express();
const router = express.Router()
const bodyParser = require('body-parser');
const usr = require('./routes/user/user')
const todo = require('./routes/todos/todos')
const authenticateJWT = require('./middleware/auth');
const jwt_decode = require('jwt-decode');


app.use(express.json());

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());

// todo gestion
app.get('/todo',authenticateJWT, todo.listTodo);
app.get('/todo/:id', authenticateJWT, todo.listSpecificTodo);
app.put('/todo/:id', authenticateJWT, todo.updateTodo);
app.post('/todo/', authenticateJWT, todo.createTodo);
app.delete('/todo/:id',authenticateJWT, todo.deleteTodo);
app.get('/user/todo',authenticateJWT, todo.listTodoUser);


// user gestion

app.post('/register', usr.register);
app.post('/login', usr.login);
app.get('/user',authenticateJWT, usr.allUser);
app.get('/user/:id',authenticateJWT , usr.listSpecificUser);
app.put('/user/:id',authenticateJWT , usr.update);
app.delete('/user/:id',authenticateJWT, usr.Delete);


app.listen(8080, () => {
    console.log('on port 8080')
})