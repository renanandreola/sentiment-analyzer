const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const translateRoute = require('./routes/translate');
const sentimentRoute = require('./routes/sentiment');
const emailRoute = require('./routes/email');

var port = process.env.PORT || 3000;

let env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('engine', env);
require('useful-nunjucks-filters')(env);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'));

app.listen(port, () => {
    console.log('info', 'LISTEN ON PORT ' + port);
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/film', (req, res) => {
    res.render('film.html');
});

app.get('/results', (req, res) => {
    res.render('results.html');
});

app.post('/filmInfo', async(req, res) => {
    // console.log("Backend node");
    // console.log(req.body);

    let email = req.body.email;
    let sentiment = req.body.sentiment;
    let translatedText = '';

    async function sendEmail(result) {
        try {
            let resultEmail = await emailRoute(email, result);

        } catch (error) {
          console.error('Error sendEmail at server: ', error);
        }
    }

    async function getTranslate() {
        try {
            translatedText = await translateRoute(sentiment, 'pt', 'en');

            let result = await sentimentRoute(translatedText);

            res.send(result);

            sendEmail(result);

        } catch (error) {
          console.error('Error getTranslate at server: ', error);
        }
    }
    
    getTranslate();
});