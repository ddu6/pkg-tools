import {existsSync,readdirSync,writeFileSync} from 'fs'
if(existsSync('icons/')){
    let out=''
    for(const file of readdirSync('icons')){
        const [name]=file.split('.',1)
        out+=`@font-face{font-family:"${name}";src:url(${file})}.show-icon.${name}::before{font-family:"${name}";content:"A"}\n`
    }
    writeFileSync('icons/main.css',out)
}