let express = require('express'),
    router = express.Router(),
    knex = require('../dbConnect');

router.get('/',function(req,res,next){
    if(req.isAuthenticated() && req.user.isAdmin){

        knex('users').select('id','username')
        .then(function(rows){
            let users = Object.values(JSON.parse(JSON.stringify(rows)));
            res.render('createTask',{title:"Create Task",users:users,isAuth:req.isAuthenticated()});
        })
        .catch(function(err){
            console.error(err);
            res.render('createTask',{title:'Error',users:[],isAuth:req.isAuthenticated()});
        });
    }
    else{
        res.status(404);
        res.end('not found');
    }
});

router.post('/', function(req,res,next){
    if(req.isAuthenticated() && req.user.isAdmin){
        let title = req.body.title,
            message = req.body.message,
            targetID = req.body.target;
        knex('tasks').insert({
            id:0,
            title:title,
            message:message,
            target:targetID
        }).then(function(results){
            res.redirect('ok');
        }).catch(function(err){
            console.error(err);
            res.render('createTask',{title:`Error`,isAuth:req.isAuthenticated()});
        });
    }
    else{
        res.status(404);
        res.end('not found')
    }
    
}
);
module.exports = router;
