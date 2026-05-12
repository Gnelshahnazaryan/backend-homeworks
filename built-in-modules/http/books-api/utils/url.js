function getIdFromUrl(url) {
    return parseInt(url.split("/")[2]);
}

module.exports = getIdFromUrl;
