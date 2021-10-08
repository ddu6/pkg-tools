#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
if(!existsSync('src/')){
    throw new Error('Wrong dir')
}
if(!existsSync('src/lib/')){
    mkdirSync('src/lib/')
}else{
    for(const file of readdirSync('src/lib')){
        unlinkSync('src/lib/'+file)
    }
}
if(existsSync('imgs/')){
    let out=''
    for(const file of readdirSync('imgs')){
        let [name,format]=file.split('.')
        name=name.replace(/-/g,'_')+'_'+format
        if(format==='svg'){
            format='svg+xml'
        }
        out+=`export const ${name}="data:image/${format};base64,${
            readFileSync('imgs/'+file).toString('base64')
        }"\n`
    }
    writeFileSync('src/lib/imgs.ts',out)
}
if(existsSync('icons/')){
    const vnames:string[]=[]
    let out=''
    for(const file of readdirSync('icons')){
        const [name,format]=file.split('.')
        const vname=name.replace(/-/g,'_')
        vnames.push(vname)
        out+=`export const ${vname}='@font-face{font-family:"${name}";src:url("data:font/${format};base64,${
            readFileSync('icons/'+file).toString('base64')
        }")}.show-icon.${name}::before{font-family:"${name}";content:"A"}'\n`
    }
    if(vnames.length===0){
        throw new Error('Empty icons')
    }
    out+=`export const all=${vnames.join('+')}`
    writeFileSync('src/lib/icons.ts',out)
}
if(existsSync('css/')){
    const names:string[]=[]
    let out=''
    if(existsSync('icons/')){
        names.push('allIcons')
        out+='import {all as allIcons} from "./icons"\n'
    }
    for(const file of readdirSync('css')){
        const name=file.split('.')[1].replace(/-/g,'_')
        names.push(name)
        out+=`export const ${name}=${
            JSON.stringify(readFileSync('css/'+file,{encoding:'utf8'}))
        }\n`
    }
    if(names.length===0){
        throw new Error('Empty css')
    }
    out+=`export const all=${names.join('+')}`
    writeFileSync('src/lib/css.ts',out)
}