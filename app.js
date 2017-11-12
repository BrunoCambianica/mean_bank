var express =  require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');
const clients = require('./routes/clients');
const mouvements = require('./routes/mouvements');
const port = 3000;

app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);
app.use('/clients', clients);
app.use('/mouvements', mouvements);

app.get('/',(req, res)=>
{
    res.send('foo');
});

app.listen(port,()=>
{
    console.log('server running at port 3000');
});


