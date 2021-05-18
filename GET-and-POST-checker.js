let express = require('express');

let app = express();
let handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8294);

app.get('/',function(req,res){
    let query = [];
    for (let param in req.query){
        query.push({'name':param,'value':req.query[param]})
    }
    let context = {};
    context.infoList = query;
    res.render('get-checker', context);
});

app.post('/', function(req,res){
    let query = [];
    for (let param in req.body){
        query.push({'name':param,'value':req.body[param]})
    }
    let context = {};
    context.infoList = query;
    res.render('post-check', context);
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.use(function(err, req, res, next){
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});