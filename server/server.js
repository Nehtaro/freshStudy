require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const databaseController = require('./controllers/databaseController');

const messageTypes = { };

messageTypes.ANSWER = 'answer-question';
messageTypes.START = 'start-game';
messageTypes.END = 'end-game';

io.on('connection', socket => {
  socket.on(messageTypes.ANSWER, data => {
    console.log('Message', messageTypes.ANSWER);
    console.log('Data', data);
    socket.broadcast.emit(messageTypes.ANSWER, data);
  });
  socket.on(messageTypes.START, data => {
    console.log('Message', messageTypes.START);
    console.log('Data', data);
    socket.broadcast.emit(messageTypes.START, data);
  });
  socket.on(messageTypes.END, data => {
    console.log('Message', messageTypes.END);
    console.log('Data', data);
    socket.broadcast.emit(messageTypes.END, data);
  });
});

app.use(bodyParser.json());
app.use(cookieParser());
// get questions request 
app.get('/questions', databaseController.getQuestions, (req, res) => {
    res.json(res.locals.qsAndAs);
});

// post answers request
app.post('/results', databaseController.insertResults, databaseController.getResults, (req, res) => {
    res.json(res.locals.history);
});

app.get('/results', databaseController.getResults, (req, res) => {
    res.json(res.locals.history);
});

app.use('/assets/images', express.static(path.resolve(__dirname, '../client/assets/images')));

app.post('/register', authController.createUser, authController.setCookie, authController.setSession, (req, res) => {
    // sending back username, email
    res.json(res.locals.userData);
    // maybe res.redirect('/mainpage');
});

app.use('/build', express.static(path.resolve(__dirname, '../build')));

// send back game history
app.post('/login', authController.verifyUser, authController.setCookie, authController.setSession, (req, res) => {
    if (res.locals.isValidUser) {
        res.status(200).json(res.locals.userData)
    } else {
        res.status(201).json(res.locals.userData);
    }
});

app.get('/verify', authController.verifySession, (req, res) => {
    res.json(res.locals.verifyUser);
});

app.get('/oauthcallback', authController.handleOAuth2, authController.setCookie, authController.setSession, (req, res) => {
    res.redirect('http://localhost:3000').json(res.locals.userData);
});

app.delete('/logout', authController.deleteSession, (req, res) => {
    res.json('Delete successful')
});

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
    return (process.env.NODE_ENV === 'production')
      ? res.sendFile(path.resolve(__dirname, '../dist/index.html'))
      : res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('*', (req, res, next) => {
    res.status(404).send('File is not found, Route is wrong')
});

app.use((error, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        message: 'Error in server occurred'
    }
    const errorObj = Object.assign(defaultErr, error);
    console.error(defaultErr.log);
    res.status(500).send(errorObj.message)
});

http.listen(PORT, () => {
    console.log(`Listening port ${PORT} ^0^`);
});
