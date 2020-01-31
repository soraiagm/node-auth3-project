const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../authentication/restricted-middleware.js');

router.get('/', restricted, onlyDept('slytherin'), (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  
  function onlyDept(department) {
     return function(req, res, next) {
       console.log('user', req.user);
       if(req.user && req.user.department && req.user.department.toLowerCase() === department){
         next();
       } else {
         res.status(403).json({ message: 'no department' })
       }
     }
  }
  

module.exports = router;