function renamer(files) {
    let res = [];

    for (let i = 0; i < files.length; ++i) {
        res[i] = "new_" + files[i];
    }

    return res;
}

module.exports = renamer;