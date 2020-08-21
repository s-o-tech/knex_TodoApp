let express = require('express'),
    router = express.Router();
    knex = require('../dbConnect');

router.get('/',function(req,res,next){
    res.render('register',{title:"Registor",errorMessage:'',isAuth:req.isAuthenticated()});
});

router.post('/', function(req,res,next){
    let username = req.body.username,
        password = req.body.password;
    if(username == ''){
        res.render('register',{title:'Registor',errorMessage:'invalid username',isAuth:req.isAuthenticated()});
    }
    else if(password == ''){
        res.render('register',{title:'Registor',errorMessage:'invalid password',isAuth:req.isAuthenticated()});
    }
    else {
        knex('users').insert({id:0,username:username,password:password,isAdmin:false})
        .then(function(resp){
            res.redirect('login');
        })
        .catch(function(err){
            console.error(err);
            res.render('register',{title:'Registor',errorMessage:`This username(${username}) is already used`,isAuth:req.isAuthenticated()});
        }) 
    }
}
);
module.exports = router;
