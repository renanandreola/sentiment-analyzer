const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const axios = require('axios');
const translate = require('google-translate-api');

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

    const textTraduzido = await translateText(sentiment);
    console.log(textTraduzido)

    // await axios.get('http://localhost:5000/getSentiment')
    // .then((response) => {
    //     console.log(response.data);
    //     const obj = {
    //         "status": 200,
    //         "text": response.data
    //     }
    //     res.send(obj)
    // })
    // .catch((error) => {
    //     console.error(error);

    //     const obj = {
    //         "status": 500,
    //         "error": error
    //     }

    //     res.send(obj)
    // });


});

async function translateText(text) {
    try {
        const result = await translate(text, { from: 'pt', to: 'en' });
        return result.text;
    } catch (error) {
        return 'Ocorreu um erro na tradução:' + error;
    }
}