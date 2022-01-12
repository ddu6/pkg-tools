#!/usr/bin/env node
const {existsSync, readdirSync, writeFileSync} = require('fs')
if (existsSync('icons/')) {
    const array = []
    for (const file of readdirSync('icons')) {
        if (file === 'main.css') {
            continue
        }
        const [name] = file.split('.', 1)
        array.push(`@font-face {
    font-family: ${name};
    src: url(${file});
}

.show-icon.${name}::before {
    font-family: ${name};
    content: "A";
}`)
    }
    writeFileSync('icons/main.css', array.join('\n\n'))
}