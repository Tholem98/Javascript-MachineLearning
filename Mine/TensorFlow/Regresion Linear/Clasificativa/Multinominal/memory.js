const _= require('lodash')

//First Step
const loadData = ()=>{
    const randoms = _.range(0,999999)
    return randoms
}

const data = loadData

debugger

//node --inspect-brk memory.js
//Ir al memory snapshot en el debugger de chrome

//Seconde Step
const loadData = ()=>{
    const randoms = _.range(0,999999)
    // return randoms
}

const data = loadData

debugger
