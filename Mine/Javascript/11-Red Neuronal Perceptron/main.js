const Perceptron = require('./perceptronClass')
const config ={
    Epochs:10,
    Activation:'tanh',
    hiddenLayers: 2,
    hiddenNodes: 4,
    bias: 1
}
const perceptron = new Perceptron(config)
/*
perceptron.train([
    {input: [0,0],output: [0]},
    {input: [0,1],output: [1]},
    {input: [1,0],output: [1]},
    {input: [1,1],output: [0]}
])

console.log(`0 o exclusivo 0: ${perceptron.predict([0,0])}`)
console.log(`0 o exclusivo 1: ${perceptron.predict([0,1])}`)
console.log(`1 o exclusivo 0: ${perceptron.predict([1,0])}`)
console.log(`1 o exclusivo 1: ${perceptron.predict([1,1])}`)
*/
/*
perceptron.train([
    {input: [0,0],output: [0]},
    {input: [0,1],output: [1]},
    {input: [1,0],output: [1]},
    {input: [1,1],output: [1]}
])

console.log(`0 o 0: ${perceptron.predict([0,0])}`)
console.log(`0 o 1: ${perceptron.predict([0,1])}`)
console.log(`1 o 0: ${perceptron.predict([1,0])}`)
console.log(`1 o 1: ${perceptron.predict([1,1])}`)
*/
perceptron.train([
    {input: [0,0],output: [0]},
    {input: [0,1],output: [1]},
    {input: [1,0],output: [1]},
    {input: [1,1],output: [1]}
])

console.log(`0 y 0: ${perceptron.predict([0,0])}`)
console.log(`0 y 1: ${perceptron.predict([0,1])}`)
console.log(`1 y 0: ${perceptron.predict([1,0])}`)
console.log(`1 y 1: ${perceptron.predict([1,1])}`)