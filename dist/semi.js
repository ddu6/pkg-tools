"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
if ((0, fs_1.existsSync)('icons/')) {
    let out = '';
    for (const file of (0, fs_1.readdirSync)('icons')) {
        const [name] = file.split('.', 1);
        out += `@font-face{font-family:"${name}";src:url(${file})}.show-icon.${name}::before{font-family:"${name}";content:"A"}\n`;
    }
    (0, fs_1.writeFileSync)('icons/main.css', out);
}
