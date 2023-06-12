$(".films").css('display', 'none');

function sendInformations(event) {
    event.preventDefault()
    let email = $("#email").val();
    let sentiment = $("#sentiment").val();

    console.log(email);
    console.log(sentiment);

    if (!email) {
        $("#email").addClass('invaid-input');
    }

    if (!sentiment) {
        $("#sentiment").addClass('invaid-input');
    }

    if (!email || !sentiment) {
        toastr["error"]("Campos inválidos existentes");
        return;
    } else {
        clearForm();
        toastr["success"]("Informações enviadas com sucesso!");

        var data = {
            email: email,
            sentiment: sentiment
        }
      
        $.post('/filmInfo', data, function (res) {
            console.log(res);
            $('form').trigger('reset');
            if(res.status == 200) {

                var movies = res.movies;

                const imgBackground1 = document.getElementById('back-1');
                imgBackground1.src = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + movies[0].backdrop_path;
                const imgBanner1 = document.getElementById('banner1');
                imgBanner1.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movies[0].poster_path;
                $('.title-1').text(movies[0].original_title);
                $('.language-1').text('Linguagem original: ' + movies[0].original_language);
                $('.sinopse-1').text(movies[0].overview);
                
                
                fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=017f6ab88d805f57d808c62757270224&language=pt-BR')
                .then(response => response.json())
                .then(data => {
                    const genres = data.genres;
                    const genreNames = movies[0].genre_ids.map(genreId => {
                    const genre = genres.find(g => g.id === genreId);
                    return genre ? genre.name : '';
                    });

                    $('.gender-1').text('Gêneros: ' + genreNames.join(', '));
                })
                .catch(error => {
                    console.error('Erro ao obter detalhes do gênero:', error);
                });
                
                
                const imgBackground2 = document.getElementById('back-2');
                imgBackground2.src = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + movies[1].backdrop_path;
                const imgBanner2 = document.getElementById('banner2');
                imgBanner2.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movies[1].poster_path;
                $('.title-2').text(movies[1].original_title);
                $('.language-2').text('Linguagem original: ' + movies[1].original_language);
                $('.sinopse-2').text(movies[1].overview);

                fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=017f6ab88d805f57d808c62757270224&language=pt-BR')
                .then(response => response.json())
                .then(data => {
                    const genres = data.genres;
                    const genreNames = movies[1].genre_ids.map(genreId => {
                    const genre = genres.find(g => g.id === genreId);
                    return genre ? genre.name : '';
                    });

                    $('.gender-2').text('Gêneros: ' + genreNames.join(', '));
                })
                .catch(error => {
                    console.error('Erro ao obter detalhes do gênero:', error);
                });


                const imgBackground3 = document.getElementById('back-3');
                imgBackground3.src = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + movies[2].backdrop_path;
                const imgBanner3 = document.getElementById('banner3');
                imgBanner3.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movies[2].poster_path;
                $('.title-3').text(movies[2].original_title);
                $('.language-3').text('Linguagem original: ' + movies[2].original_language);
                $('.sinopse-3').text(movies[2].overview);

                fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=017f6ab88d805f57d808c62757270224&language=pt-BR')
                .then(response => response.json())
                .then(data => {
                    const genres = data.genres;
                    const genreNames = movies[2].genre_ids.map(genreId => {
                    const genre = genres.find(g => g.id === genreId);
                    return genre ? genre.name : '';
                    });

                    $('.gender-3').text('Gêneros: ' + genreNames.join(', '));
                })
                .catch(error => {
                    console.error('Erro ao obter detalhes do gênero:', error);
                });

                $(".infos-before").css('display', 'none');
                $(".films").css('display', 'flex');

            } else {
                toastr["error"]("Ocorreu um erro ao procurar filmes, tente novamente mais tarde");
            }
        })
    }

}

function clearForm() {
    $("#email").removeClass('invaid-input');
    $("#sentiment").removeClass('invaid-input');
    $("#email").val('');
    $("#sentiment").val('');
}