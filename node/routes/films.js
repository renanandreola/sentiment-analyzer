const axios = require('axios');
const appKeyTMDB = "017f6ab88d805f57d808c62757270224"

async function films(topLabel) {
    return new Promise(async (resolve, reject) => {
        try {

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
            .then((response) => {
                // console.log(response.data.results);
                if (response.data && response.data.results) {
                    let movies = response.data.results.slice(0, 3);
                    // console.log("movies: ", movies);
        
                    resolve(movies);
                }
            })
            .catch((error) => {
                // console.error("Error at get films: ", error);
                reject("Erro ao processar rota TMDB")
            });  
            
        } catch (error) {
            console.error('error at films route: ', error);
            reject(error);
        }
    })
}

module.exports = films;

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