const Mind = require('node-mind')

const config={
    iterations: 5000,
    learningRate:0.7,
    activator: 'sigmoid',
    hiddenLayers: 1,
    hiddenUnits: 2,
}

const mind = new Mind()
/*
mind.learn([
    {input: [0,0],output:[0]},
    {input: [0,1],output:[1]},
    {input: [1,0],output:[1]},
    {input: [1,1],output:[1]},
])

const output1 = parseFloat(net.predict([0,0])).toFixed(6)
const output2 = parseFloat(net.predict([0,1])).toFixed(6)
const output3 = parseFloat(net.predict([1,0])).toFixed(6)
const output4 = parseFloat(net.predict([1,1])).toFixed(6)

*/
/*
mind.learn([
    {input: [1],output:[0]},
    {input: [2],output:[0]},
    {input: [3],output:[0]},
    {input: [4],output:[1]},
])

const output1 = parseFloat(net.predict([0,0])).toFixed(6)
const output2 = parseFloat(net.predict([0,1])).toFixed(6)
const output3 = parseFloat(net.predict([1,0])).toFixed(6)
const output4 = parseFloat(net.predict([1,1])).toFixed(6)
*/ 
/*mind.learn([
    {input: [1],output:[1]},
    {input: [2],output:[0]},
    {input: [3],output:[0]},
    {input: [4],output:[1]},
])

const output1 = parseFloat(net.predict([0,0])).toFixed(6)
const output2 = parseFloat(net.predict([0,1])).toFixed(6)
const output3 = parseFloat(net.predict([1,0])).toFixed(6)
const output4 = parseFloat(net.predict([1,1])).toFixed(6)
 */
mind.learn([
    {input: [1],output:[0]},
    {input: [2],output:[1]},
    {input: [3],output:[1]},
    {input: [4],output:[0]},
])

const output1 = parseFloat(net.predict([0,0])).toFixed(6)
const output2 = parseFloat(net.predict([0,1])).toFixed(6)
const output3 = parseFloat(net.predict([1,0])).toFixed(6)
const output4 = parseFloat(net.predict([1,1])).toFixed(6)

console.log({output1,output2,output3,output4})