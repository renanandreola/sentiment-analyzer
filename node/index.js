const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const axios = require('axios');
const translate = require('translate-google');
const appKeyTMDB = "017f6ab88d805f57d808c62757270224"

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
    // console.log("Backend node");
    // console.log(req.body);

    let email = req.body.email;
    let sentiment = req.body.sentiment;
    let translatedText = '';

    const text = sentiment;

    translatedText = await translateText(text, 'pt', 'en');

    console.log(`Texto traduzido: ${translatedText}`);

    axios.post('http://localhost:5000/getSentiment', { data: translatedText }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async(response) => {
        // console.log(response.data);
        let values = response.data;
        let arrayStates = [];

        for (let index = 0; index < values.length; index++) {
            if (index == 0) {
                arrayStates.push({
                    "label": "Positivo",
                    "value": values[index]
                })
            }

            if (index == 1) {
                arrayStates.push({
                    "label": "Neutro",
                    "value": values[index]
                })
            }

            if (index == 2) {
                arrayStates.push({
                    "label": "Negativo",
                    "value": values[index]
                })
            }
        }
        // console.log("array states :: ", arrayStates);
          
        var topLabel = '';
        var maiorValor = Number.NEGATIVE_INFINITY;
        
        for (var i = 0; i < arrayStates.length; i++) {
            var objeto = arrayStates[i];

            if (parseFloat(objeto.value) > maiorValor) {
                maiorValor = parseFloat(objeto.value);
                topLabel = objeto.label;
            }
        }
        
        console.log('Maior valor:', maiorValor);
        console.log('Maior label:', topLabel);

        let request = await requestFilms(topLabel)
        console.log("request", request);

        res.send(arrayStates)
    })
    .catch((error) => {
        console.error(error);
        // const obj = {
        //     "status": 500,
        //     "error": error
        // }
        // res.send(obj)
    });
});

async function requestFilms(topLabel) {
    genreID = null;

    if (topLabel && topLabel == "Positivo") {
        let random = Math.floor(Math.random() * positiveGenre.length);
        console.log(positiveGenre[random]);
        genreID = positiveGenre[random].id;
    }

    if (topLabel && topLabel == "Neutro") {
        let random = Math.floor(Math.random() * neutralGenre.length);
        console.log(neutralGenre[random]);
        genreID = neutralGenre[random].id;
    }

    if (topLabel && topLabel == "Negativo") {
        let random = Math.floor(Math.random() * negativeGenre.length);
        console.log(negativeGenre[random]);
        genreID = negativeGenre[random].id;
    }

    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + appKeyTMDB + '&with_genres=' + genreID, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async(response) => {
        // console.log(response.data.results);
        if (response.data && response.data.results) {
            let movies = response.data.results.slice(0, 5);
            // console.log("movies: ", movies);

            res.send("ok")
        }
    })
    .catch((error) => {
        console.error("Error at get films: ", error);
    });  
}

async function translateText(text, fromLanguage, toLanguage) {
    const translatedText = await translate(text, { from: fromLanguage, to: toLanguage });
    return translatedText;
}

const positiveGenre = [
    {
        "genre": "Action",
        "id": 28
    },
    {
        "genre": "Animation",
        "id": 16
    },
    {
        "genre": "Comedy",
        "id": 35
    },
    {
        "genre": "Crime",
        "id": 80
    },
    {
        "genre": "Documentary",
        "id": 99
    },
    {
        "genre": "Drama",
        "id": 18
    },
    {
        "genre": "History",
        "id": 36
    },
    {
        "genre": "Horror",
        "id": 27
    },
    {
        "genre": "Mystery",
        "id": 9648
    },
    {
        "genre": "Science Fiction",
        "id": 878
    },
    {
        "genre": "War",
        "id": 10752
    }
]

const neutralGenre = [
    {
        "genre": "Action",
        "id": 28
    },
    {
        "genre": "Adventure",
        "id": 12
    },
    {
        "genre": "Crime",
        "id": 80
    },
    {
        "genre": "Documentary",
        "id": 99
    },
    {
        "genre": "Drama",
        "id": 18
    },
    {
        "genre": "Fantasy",
        "id": 14
    },
    {
        "genre": "History",
        "id": 36
    },
    {
        "genre": "Music",
        "id": 10402
    },
    {
        "genre": "Science Fiction",
        "id": 878
    },
    {
        "genre": "War",
        "id": 10752
    }
]

const negativeGenre = [
    {
        "genre": "Action",
        "id": 28
    },
    {
        "genre": "Adventure",
        "id": 12
    },
    {
        "genre": "Animation",
        "id": 16
    },
    {
        "genre": "Comedy",
        "id": 35
    },
    {
        "genre": "Family",
        "id": 10751
    },
    {
        "genre": "History",
        "id": 36
    },
    {
        "genre": "Music",
        "id": 10402
    },
    {
        "genre": "Romance",
        "id": 10749
    },
    {
        "genre": "Science Fiction",
        "id": 878
    },
    {
        "genre": "War",
        "id": 10752
    }
]

// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37