const db = require("../../config/db");
const jwt = require('jsonwebtoken')
const ath = require("../auth/auth")
const token = require('../user/user')
const authenticateJWT = require('../../middleware/auth')
const jwt_decode = require('jwt-decode');

const listTodo = (req, res) => {
    db.query ('SELECT * FROM todo', (err, data) => {
      if (err) throw err;
      if (data.length == 0) {
        return res.status(404).json({msg: 'Not found'});
      }
      console.log (data);
      res.status(200).json(data);
      });
}

const listTodoUser = (req, res) => {
  db.query ('SELECT * FROM todo WHERE user_id=?', jwt_decode(req.header("Authorization")).id, (err, data) => {
    if (err) throw err;
    if (data.length == 0) {
      return res.status(404).json({msg: 'Not found'});
    }
    res.status(200).json(data);
    });
  }

const listSpecificTodo = (req, res) => {
      db.query ("SELECT * FROM todo WHERE id=?", req.params.id, (err, data) => {
        if (data.length == 0) {
          return res.status(404).json({msg: 'Not found'});
        }
        if (err) throw err;
        res.status(200).json(data);
    });
  }

const createTodo = (req, res) => {
    let token =  jwt.decode(req.header("ath"))
    let author = {
      title: req.body.title, 
      description: req.body.description,
      due_time: req.body.due_time,
      user_id:  jwt_decode(req.header("Authorization")).id
      };
    let sql = "INSERT INTO todo SET ?"
    db.query(sql, author, (err, data) => {
      if(err) throw err;
    });
    db.query ("SELECT * FROM todo WHERE title=?", author.title, (err, data) => {
      if(err) throw err;
      if (data.length == 0) {
        return res.status(404).json({msg: 'Not found'});
      }
      res.status(200).json(data)
    })
  }

const deleteTodo = (req, res) => {
    db.query ('DELETE FROM todo WHERE id=?', req.params.id, (err, data) => {
      if (err) throw err;
      if (data.affectedRows == 0) {
        return res.json({msg: 'Not found'})
      }
      else {
        res.status(200).json({msg: 'succesfully deleted record number: '+ req.params.id});
      }
      });
  }

const updateTodo = (req, res) => {
    let ID = req.params.id;
    let updateUser = { 
      title: req.body.title, 
      due_time: req.body.due_time, 
      description: req.body.description, 
      user_id: req.body.user_id,
      status: req.body.status
     };
    let sql = `UPDATE todo SET ?`;
    db.query(sql, updateUser, (error, row) => {
      if (error){
        return console.error(error.message);
      }
    });
    db.query ("SELECT * FROM todo WHERE title=?", updateUser.title, (err, data) => {
      if (err) throw err;
      if (data.length == 0) {
        return res.status(404).json({msg: 'Not found'});
      }
      res.status(200).json(data[0]);
      });
  }

module.exports = {
    listTodo,
    listSpecificTodo,
    createTodo,
    deleteTodo,
    updateTodo,
    listTodoUser,
 }