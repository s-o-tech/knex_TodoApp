let express = require('express'),
    router = express.Router(),
    knex = require('../dbConnect');

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    let target = req.user.id;
    knex.select('*').from('tasks').where({target:target})
    .then(function(rows){
        let tasks = Object.values(JSON.parse(JSON.stringify(rows))),
        username = req.user.username,
        isAdmin = req.user.isAdmin;
        res.render('mypage',{'title':'mypage','tasks':tasks,'username':username,isAuth:req.isAuthenticated(),isAdmin:isAdmin});
    })
    .catch(function(err){
        console.error(err);
        res.render('mypage',{title:'Error',isAuth:req.isAuthenticated()});
    })
  }
  else{
    res.redirect('login');
  }
});

router.post('/', function(req,res,next){
  if(req.isAuthenticated() && req.body.target == req.user.id){
    let per = req.body.newPercent,
        taskID = req.body.taskID;
    knex('tasks').where({id:taskID}).update({percent:per})
    .then(function(resp){
        res.redirect('mypage');
    })
    .catch(function(err){
        console.error(err);
        res.render('mypage',{title:'mypage',message:`Error`,isAuth:req.isAuthenticated()});

    })
  }
  else{
      res.status(404);
      res.end('not found')
  }
  
});


module.exports = router;
