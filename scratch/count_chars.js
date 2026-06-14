const fs = require('fs');
const yaml = require('js-yaml');
const file = fs.readFileSync('../config/tools.yaml', 'utf8');
const data = yaml.load(file);
const t = data.tools.find(x => x.slug === 'redirect-checker');

function printLengths(obj, path = "") {
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            obj.forEach((v, i) => printLengths(v, path + "[" + i + "]"));
        } else {
            for (const [k, v] of Object.entries(obj)) {
                printLengths(v, path + "." + k);
            }
        }
    } else if (typeof obj === 'string') {
        console.log(path + ": " + obj.length);
    }
}
printLengths(t);
