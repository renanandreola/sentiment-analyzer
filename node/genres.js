const genresConn = async () => {
    try {
        let allGenres = [];

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

        allGenres.push(positiveGenre)
        allGenres.push(neutralGenre)
        allGenres.push(negativeGenre)

        return allGenres;
    } catch (err) {
        console.log("Error at genres file");
    }
}

module.exports = genresConn;

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