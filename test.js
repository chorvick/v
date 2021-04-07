const albumArt = require("album-art")


const get_album = async (a) => {
    const album = await albumArt("Neil Young", { album: "Harvest" })
    console.log(album)

}

get_album("Janis")