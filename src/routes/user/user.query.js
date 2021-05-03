const con = require("../../config/db");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.JWT_SECRET

const add_User = async (req, res) => {
  let author = { 
    name: req.body.name, 
    email: req.body.email, 
    password: await bcrypt.hash(req.body.password, 8), 
    firstname: req.body.firstname
   };
   con.query('SELECT email FROM user WHERE email=?', [author.email], async (err, result) => {
    if (err) {console.log(err);}

    if (result.length > 0) {
      return res.json({msg: 'account  already  exists'})
    }
  let sql = "INSERT INTO user SET ?"
  con.query(sql, author, (err, data) => {
    if(err) throw err;
  
    res.json({token: 'Token  of the  newly  registered  user'})
  });
})
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

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
  con.query('SELECT * FROM user WHERE email = ?', [req.body.email], async (err, results) => {
    console.log(results)
    if (results.length === 0 || !(await bcrypt.compare(req.body.password, results[0].password))) {
      return res.json({ 
        message: 'Invalid  Credentials'
      })
    } else {
      const accessToken = jwt.sign({ id : req.body.id}, process.env.JWT_SECRET,
        { expiresIn: '20m' });
        const accessToken = jwt.sign({ id : req.body.id}, process.env.JWT_SECRET,
          { expiresIn: '20m' });
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_REFLESH_SECRET);

      res.json({
        token: "Token  of the  newly  logged  in user",
        accessToken
      });
    }
  })

}

module.exports = {
    add_User,
    login,
    authenticateJWT,
 }