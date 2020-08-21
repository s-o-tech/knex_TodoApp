let express = require('express'),
    router = express.Router(),
    knex = require('../dbConnect');

router.get('/',function(req,res,next){
    knex.select('users.username','tasks.message','tasks.percent').from('tasks').join('users',{'users.id':'tasks.target'})
    .then(function(rows){
        if(!rows[0]){
            res.render('viewTask',{'title':"Create Task",'tasks':{username:'',message:'No Tasks',percent:0},isAuth:req.isAuthenticated()});
        }   
        else{
            let tasks = Object.values(JSON.parse(JSON.stringify(rows)));
            res.render('viewTask',{'title':"Create Task",'tasks':tasks,isAuth:req.isAuthenticated()});
        }
    })
    .catch(function(err){
        console.error(err);
        res.render('viewTask',{'title':"Error",isAuth:req.isAuthenticated()});
    })
});

module.exports = router;
