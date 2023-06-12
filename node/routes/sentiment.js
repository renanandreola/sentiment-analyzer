const axios = require('axios');
const filmsRoute = require('./films')

async function sentiment(translatedText) {
    return new Promise(async (resolve, reject) => {
        try {
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
                
                // console.log('Maior valor:', maiorValor);
                // console.log('Maior label:', topLabel);

                let movies = await filmsRoute(topLabel);
                
                resolve({
                    "status": 200,
                    "movies": movies
                });
            })
            .catch((error) => {
                // console.error(error);
                reject({
                    "status": 500,
                    "error": "Error: " + error
                })
            });
        } catch (error) {
            console.error('error at sentiment route: ', error);
            reject(error);
        }
    })
}

module.exports = sentiment;