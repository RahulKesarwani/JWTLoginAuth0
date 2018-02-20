var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var jwt1 = require('jsonwebtoken');
var Q = require('q');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.post('/user/authenticate',function(req, res){

   console.log(req.body);
    var obj = req.body;
    var user= obj.username;
    var pwd= obj.password;
    var deferred = Q.defer();
    
        if(user=='admin' && pwd== 'admin')
        {
            // authentication successful
            deferred.resolve({
                _id: 1001,
                username: 'admin',
                firstName: 'Admin',
                lastName: '----',
                password: 'admin',
                token: jwt1.sign({ sub: 1001 }, 'admin')})
        }else{
             // authentication failed
             deferred.resolve();
        }
    
        deferred.promise.then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }}) .catch(function (err) {
                    res.status(400).send(err);
                });

});

app.listen(3001);
console.log("Listening on http://localhost:3001");