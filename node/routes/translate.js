const translate = require('translate-google');

async function translateText(text, fromLanguage, toLanguage) {
    return new Promise(async (resolve, reject) => {
        try {
            const translatedText = await translate(text, { from: fromLanguage, to: toLanguage });

            resolve(translatedText);
        } catch (error) {
            console.error('error at translate route: ', error);
            reject(error);
        }
    })
}

module.exports = translateText;