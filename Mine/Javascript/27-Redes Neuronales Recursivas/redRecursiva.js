const brain = require('brain.js')
//const net = new brain.recurrent.RNN()
/*
net.train([
    {input:[0,0],output:[1]},
    {input:[1,0],output:[0]},
    {input:[0,1],output:[0]},
    {input:[1,1],output:[1]},
], {iterations:1000})

const output1 = parseFloat(net.run([0,0]))
const output2 = parseFloat(net.run([1,0]))
const output3 = parseFloat(net.run([0,1]))
const output4 = parseFloat(net.run([1,1]))

console.log({output1,output2,output3,output4})
*/
/*
net.train([
    [10,20,30]
])

const output = net.run([10,20])
console.log(`el dato posterior a 10 y 20 es ${output}`)
*/
/*
const net = new brain.recurrent.RNNTimeStep()

net.train([
    [10,20,30]
])

const output = net.run([10,20])
console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.LSTM()

net.train([
    [10,20,30]
])

const output = net.run([10,20])
console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.LSTMTimeStep()

net.train([
    [10,20,30]
])

const output = net.run([10,20])
console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.GRU()

net.train([
    [10,20,30]
])

const output = net.run([10,20])
console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.GRUTimeStep()

net.train([
    [10,20,30,40,50,60,70]
])

const output = net.run([10,20,30,40,50])//Devuelve datos insatifactorios
console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.GRUTimeStep()

net.train([
    [1,2,3,4,5,6,7]
])

const output = net.run([1,2,3,4,5])//Devuelve datos satifactorios
console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.RNNTimeStep({
    inputSize:2,
    outputSize:2,
})

net.train([
    [0,1],
    [1,2],
    [2,3]
])

const output = net.run([[0,1],[1,2]])
console.log(output)

console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.GRUTimeStep({
    inputSize:2,
    outputSize:2,
})

net.train([
    [0,1],
    [1,2],
    [2,3]
])

const output = net.run([[0,1],[1,2]])
console.log(output)

console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.LSTMTimeStep({
    inputSize:2,
    outputSize:2,
})

net.train([
    [0,1],
    [1,2],
    [2,3]
])

const output = net.run([[0,1],[1,2]])
console.log(output)

console.log(`el dato posterior a 10 y 20 es ${output}`)
*//*
const net = new brain.recurrent.LSTM({
    inputSize:2,
    outputSize:2,
})

net.train([
    'Olá! Tudo bem?',
    'Boa tarde! Agradeco a sua presenca',
])

const input = 'Ola!'
const output = net.run(input)
console.log(output)
*/
const net = new brain.recurrent.LSTM({
    inputSize:2,
    outputSize:2,
})

net.train([
    {input:'Olá! O dia esta otimo hoje!',output:'feliz'},
    {input:'Oi. Hoje nao tive um dia muito bom', output:'triste'},
])

const input = 'Ola! eu estou muito feliz!'
const output = net.run(input)
console.log(output)
/*
const net = new brain.recurrent.GRU({
    inputSize:2,
    outputSize:2,
})

net.train([
    {input:'Olá! O dia esta otimo hoje!',output:'feliz'},
    {input:'Oi. Hoje nao tive um dia muito bom', output:'triste'},
])

const input = 'Ola!'
const output = net.run(input)
console.log(output)
*/