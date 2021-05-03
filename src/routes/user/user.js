const db = require('../../config/db');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const listSpecificUser = (req, res) => {
    if (!(req.params.id.includes("@", 0)) ) {
      db.query ("SELECT * FROM user WHERE id=?", req.params.id, (err, data) => {
        if (err) throw err;
    
        console.log (data);
        res.status(200).json(data);
        });
    } else {
      db.query ("SELECT * FROM user WHERE email=?", req.params.id, (err, data) => {
      if (err) throw err;
        
      console.log (data);
      res.status(200).json(data);
      });
    }
  }

  const allUser = (req, res) => {
        db.query ('SELECT * FROM user ', (err, data) => {
         if (err) throw err;
         if (data.length == 0) {
          return res.status(404).json({msg: 'Not found'});
        }
         console.log ('Données reçues de Db:');
         console.log (data);
         res.status(200).json(data);
        });
    }

const register = async (req, res) => {
    let author = { 
      name: req.body.name, 
      email: req.body.email, 
      password: await bcrypt.hash(req.body.password, 8), 
      firstname: req.body.firstname
     };
     db.query('SELECT email FROM user WHERE email=?', [author.email], async (err, result) => {
      if (err) {console.log(err);}

      if (result.length > 0) {
        return res.json({msg: 'account  already  exists'})
      }
    let sql = "INSERT INTO user SET ?"
    db.query(sql, author, (err, data) => {
      let token
      if(err) throw err;
    });
    db.query('SELECT * FROM user WHERE email=?', [author.email], async (err, results) => {
      const accessToken = jwt.sign({  id: results[0].id,  email: req.body.email }, process.env.JWT_SECRET);
      res.json({token: accessToken})
    });
  })
}

  const update = async (req,res) => {
    let updateUser = { 
      name: req.body.name, 
      email: req.body.email, 
      password: await bcrypt.hash(req.body.password, 8), 
      firstname: req.body.firstname
     };
    let sql = `UPDATE user SET ? WHERE id = ${req.params.id}`;
    db.query(sql, updateUser, (error, row) => {
      if (error){
        return console.error(error.message);
      }
    });
    db.query ("SELECT * FROM user WHERE email=?", updateUser.email, (err, data) => {
      if (err) throw err;
      if (data.length == 0) {
        return res.status(404).json({msg: 'Not found'});
      }
      res.status(200).json(data[0]);
      });
  }

  const Delete = (req,res) => {
    let sql = `DELETE FROM user WHERE id= ${req.params.id}`;
    db.query(sql, (error, row) => {
      if (error){
        return error
      }
      console.log('Rows affected:', row.affectedRows);
      res.json({msg: `succesfully  deleted  record  number: ${req.params.id}`})
    });
  }

  const login = (req, res) => {
    let updateUser = { 
      email: req.body.email, 
      password: req.body.password, 
     };
    if (!updateUser.email || !updateUser.password) {
      return res.json({ 
        message: 'provide email or password'
      })
    }
    db.query('SELECT * FROM user WHERE email = ?', [req.body.email], async (err, results) => {
      console.log(results)
      if (results.length == 0) {
        return res.status(404).json({msg: 'Not found'});
      }
      if (results.length === 0 || !(await bcrypt.compare(req.body.password, results[0].password))) {
        return res.json({ 
          message: 'Invalid  Credentials'
        })
      } else {
        const accessToken = jwt.sign({  id: results[0].id,  email: req.body.email }, process.env.JWT_SECRET);
        res.json({
          token: accessToken,
        });
      }
    })

  }

  module.exports = {
    listSpecificUser,
    allUser,
    register,
    update,
    Delete,
    login,
  }