const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const axios = require('axios');
const translate = require('translate-google');

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listen on port: ' + port);
});

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

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/film', (req, res) => {
    res.render('film.html');
});

app.post('/filmInfo', async(req, res) => {
    console.log("Backend node");

    console.log(req.body);
    let email = req.body.email;
    let sentiment = req.body.sentiment;
    let translatedText = '';

    async function translateText(text, fromLanguage, toLanguage) {
        const translatedText = await translate(text, { from: fromLanguage, to: toLanguage });
        return translatedText;
    }

    async function main() {
        const text = sentiment;
        translatedText = await translateText(text, 'pt', 'en');
        console.log(`Texto traduzido: ${translatedText}`);
        var a = await callPython()
    }

    main().catch((err) => {
        console.error('Ocorreu um erro:', err);
    });

    async function callPython() {
        console.log('chamou', translatedText);
        axios.post('http://localhost:5000/getSentiment', { data: translatedText }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data);
            // const obj = {
            //     "status": 200,
            //     "text": response.data
            // }
            // res.send(obj)
        })
        .catch((error) => {
            console.error(error);
    
            // const obj = {
            //     "status": 500,
            //     "error": error
            // }
    
            // res.send(obj)
        });
    }
    



});