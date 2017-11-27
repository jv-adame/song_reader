In order to use this app, you will need to create a config.js file in the src folder with the following api keys:

module.exports = {
    //Watson IBM Tone Analyzer API Key
    watson_api_key: {
        user: "<client_id>",
        pass: "<client_secret>"
    },
    genius_api_key: {
        user: "<client_id>",
        pass: "<client_secret>",
        token: "<client_access_token>"
    },
    spotify_api_key: {
        user: "<client_id>",
        pass: "<client_secret>"
    }
}