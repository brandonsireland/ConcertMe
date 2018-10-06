// Routes

module.exports =  function(app){

    //Home page
    app.get('/', function(req, res){
        res.send('hello world');
    });

    app.get('/api/user/artists', function(req, res){
        res.send('I got token ' + req.query.token);
    });
};