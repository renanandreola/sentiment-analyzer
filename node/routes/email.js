const nodeoutlook = require('nodejs-nodemailer-outlook');

async function sendEmail(email, result) {
    return new Promise(async (resolve, reject) => {
        try {

            nodeoutlook.sendEmail({
                auth: {
                    user: "rerfilmes@outlook.com",
                    pass: "pass2023"
                },
                from: 'rerfilmes@outlook.com',
                to: email,
                subject: 'R&R Filmes',
                html:   '<div style="justify-content-center; text-align: center;">'+
                            '<div><h2>R&R Filmes</h2></div>'+
                            '<div style="margin-bottom: 10px;"><h4>Olá, visualizamos sua busca de filmes em nosso site!</h4></div>'+
                            '<div style="margin-bottom: 10px;"><h4>Os filmes indicados são: </h4></div>'+
                            '<div style="margin-bottom: 10px;"><span>' + result.movies[0].title + '</span></div>'+
                            '<div style="margin-bottom: 10px;"><span>' + result.movies[1].title + '</span></div>'+
                            '<div style="margin-bottom: 10px;"><span>' + result.movies[2].title + '</span></div>'+
                        '</div>',
                // text: answer,
                replyTo: 'rerfilmes@outlook.com',
                onError: (e) => {
                    console.log('Error', 'Send e-mail to client error: ' + e);
                },
                onSuccess: (i) => {
                    console.log('info', 'Send e-mail to client: ' + i);
                }
            });
            
        } catch (error) {
            console.error('error at email route: ', error);
            reject(error);
        }
    })
}

module.exports = sendEmail;