function parseTemplate(template, variables) {
    let result = "";
    let key = "";
    let inside = false;

    for (let i = 0; i < template.length; i++) {
        const char = template[i];

        if (char === "{" && template[i + 1] === "{") {
            inside = true;
            i++;
            continue;
        }

        if (char === "}" && template[i + 1] === "}") {
            inside = false;
            result += variables[key]
            key = "";
            i++;
            continue;
        }

        if (inside) {
            key += char;
        } else {
            result += char;
        }
    }

    return result;
}

module.exports = parseTemplate;