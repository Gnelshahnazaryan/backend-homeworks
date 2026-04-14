function filterByExtension(files, extension) {
    let result = [];
    for (let i = 0; i < files.length; ++i) {
        let parts = files[i].split(".");

        if (parts[1] === extension) {
            result.push(files[i]);
        }
    }
    return result;
}

module.exports = filterByExtension;