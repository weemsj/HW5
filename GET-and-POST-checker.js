const express = require('express');

const app = express();
const handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8294);

app.get('/',function(req,res){
    let queryP = [];
    for (let param in req.query){
        queryP.push({'name':param,'value':req.query[param]})
    }
    let context = {};
    context.infoList = queryP;
    res.render('get-checker', context);
});

/*app.post('/',function(req,res){
    let queryP = [];
    for (let param in req.query){
        queryP.push({'name':param,'value':req.query[param]})
    }
    console.log(queryP);
    console.log(req.query);
    let context = {};
    context.infoList = queryP;
    res.render('post-check', context);
});*/

app.post('/', function(req,res){
    let queryP = [];
    for (let param in req.body){
        queryP.push({'name':param,'value':req.body[param]})
    }
    console.log(queryP);
    console.log(req.body);
    let context = {};
    context.dataList = queryP;
    res.render('post-check', context);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});