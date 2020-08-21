let config = {
        client:'mysql',
        connection:{
            host:'localhost',
            user:'root',
            password:'roottoor',
            database:'TODOAPP',
        },
    },
    knex = require('knex')(config);


module.exports = knex;



