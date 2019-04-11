const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    //console.log('ok socket.io');
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-s6eie.mongodb.net/test?retryWrites=true',
{
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});


//-> Entende todas as requisições em JSON
//-> (Javascript object notation)
//-> API rest
app.use(express.json());

//-> Permite envio de arquivo nas requisições
app.use(express.urlencoded({ extended: true }));
app.use('/file', express.static(path.resolve(__dirname, '..', 'tmp')));

//-> Importa o arquivo routes
app.use(require('./routes'));
//app.use(require(routes));

//-> Midleware (interceptador da requisição)
app.get('/teste', (req, res) => {
    return res.send('Hello World');
});

//-> Porta para executar a aplicação
//app.listen(3333);
server.listen(3333);