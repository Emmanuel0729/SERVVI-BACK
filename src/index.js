const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require ( 'body-parser' )
const morgan = require('morgan');

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

//routes
app.get('/', (req, res)=>{
    res.send('HI');
});

app.use(require('./routes/login'));
app.use(require('./routes/user'));
app.use(require('./routes/services'));
app.use(require('./routes/order'));
app.use(require('./routes/message'));

app.listen(3000, ()=>{
    console.log(`Server on port ${app.get('port')}`);
});
