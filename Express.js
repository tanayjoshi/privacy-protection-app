var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

mongoose.connect('mongodb://<username>:<password>@ds249839.mlab.com:49839/appsecurity');

var db = mongoose.connection;
mongoose.Promise = global.Promise;  

var app = express();

var col = db.collection('newcollection')

//create the Posts Schema or import it.

app.get("/getdata", function(req, res){
    col.find({}, function(e,doc){
        if(doc==null){
            res.send("NO POSTS");
        }
        else{
            res.json(doc);
        }
    });
});

app.set('port', (process.env.PORT || 1337));

app.listen(app.get('port'), function(){
console.log("Server started on port: " + app.get('port'));
});