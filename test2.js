const albumArt = require('album-art')

/* DEMO */
const artist = '311'
const options = {
    album: 'all mixed up'
}
albumArt(artist, options, function (err, res) {
  console.log('error: ', err)
  console.log('response: ', res)
})

/* END DEMO */

/* Endpoint for live testing */
exports.endpoint = async (request, response) => {
    // Read request
    const url = require('url')
    const req = url.parse(request.url, true)
    
    // Use GET parameters as search options ?album=...&size=...
    const {search} = req.query
    
    const  opts = req.query
    console.log(search);
    console.log(opts);
    // Search and respond with results (fallback to default if no search provided)
    response.end( JSON.stringify( await albumArt( search || artist, opts ) ) )
}
