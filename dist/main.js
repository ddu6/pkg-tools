#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
if (!(0, fs_1.existsSync)('src/')) {
    throw new Error('wrong dir');
}
if (!(0, fs_1.existsSync)('src/lib/')) {
    (0, fs_1.mkdirSync)('src/lib/');
}
else {
    for (const file of (0, fs_1.readdirSync)('src/lib')) {
        (0, fs_1.unlinkSync)('src/lib/' + file);
    }
}
if ((0, fs_1.existsSync)('imgs/')) {
    let out = '';
    for (const file of (0, fs_1.readdirSync)('imgs')) {
        let [name, format] = file.split('.');
        name = name.replace(/-/g, '_') + '_' + format;
        if (format === 'svg') {
            format = 'svg+xml';
        }
        out += `export const ${name}="data:image/${format};base64,${(0, fs_1.readFileSync)('imgs/' + file).toString('base64')}"\n`;
    }
    (0, fs_1.writeFileSync)('src/lib/imgs.ts', out);
}
if ((0, fs_1.existsSync)('icons/')) {
    const vnames = [];
    let out = '';
    for (const file of (0, fs_1.readdirSync)('icons')) {
        const [name, format] = file.split('.');
        const vname = name.replace(/-/g, '_');
        vnames.push(vname);
        out += `export const ${vname}='@font-face{font-family:"${name}";src:url("data:font/${format};base64,${(0, fs_1.readFileSync)('icons/' + file).toString('base64')}")}.show-icon.${name}::before{font-family:"${name}";content:"A"}'\n`;
    }
    out += `export const all=${vnames.join('+')}`;
    (0, fs_1.writeFileSync)('src/lib/icons.ts', out);
}
if ((0, fs_1.existsSync)('css/')) {
    const names = [];
    let out = '';
    if ((0, fs_1.existsSync)('icons/')) {
        names.push('allIcons');
        out += 'import {all as allIcons} from "./icons"';
    }
    for (const file of (0, fs_1.readdirSync)('css')) {
        const name = file.split('.')[1].replace(/-/g, '_');
        names.push(name);
        out += `export const ${name}=${JSON.stringify((0, fs_1.readFileSync)('css/' + file, { encoding: 'utf8' }))}\n`;
    }
    out += `export const all=${names.join('+')}`;
    (0, fs_1.writeFileSync)('src/lib/css.ts', out);
}
