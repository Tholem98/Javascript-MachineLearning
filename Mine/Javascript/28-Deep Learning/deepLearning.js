const synaptic = require('synaptic')
/*
const inputLayer = new synaptic.Layer(1)
const outputLayer = new synaptic.Layer(1)


inputLayer.project(outputLayer)

const NeuralNetowrk = new synaptic.Network({
    input: inputLayer,
    output: outputLayer
})

function formatOutput(n=0){return n/100}
const learningRate = .5
for(let i=0;i<2000;i++){
    NeuralNetowrk.activate([1])
    NeuralNetowrk.propagate(learningRate,[formatOutput(9)])

    NeuralNetowrk.activate([2])
    NeuralNetowrk.propagate(learningRate,[formatOutput(18)])

    NeuralNetowrk.activate([3])
    NeuralNetowrk.propagate(learningRate,[formatOutput(27)])

    NeuralNetowrk.activate([4])
    NeuralNetowrk.propagate(learningRate,[formatOutput(36)])
}
const output = parseFloat(NeuralNetowrk.activate([5])*100).toFixed(6)
console.log(output)
*//*
const inputLayer = new synaptic.Layer(1)
const hiddenLayer = new synaptic.Layer(10)
const hiddenLayer2 = new synaptic.Layer(10)
const hiddenLayer3 = new synaptic.Layer(10)
const hiddenLayer4 = new synaptic.Layer(10)


const outputLayer = new synaptic.Layer(1)

inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)

const NeuralNetowrk = new synaptic.Network({
    input: inputLayer,
    hidden: [hiddenLayer,hiddenLayer2,hiddenLayer3,hiddenLayer4],
    output: outputLayer,
})

function formatOutput(n=0){return n/100}
const learningRate = .5
for(let i=0;i<10000000;i++){
    NeuralNetowrk.activate([1])
    NeuralNetowrk.propagate(learningRate,[formatOutput(10)])

    NeuralNetowrk.activate([2])
    NeuralNetowrk.propagate(learningRate,[formatOutput(19)])

    NeuralNetowrk.activate([3])
    NeuralNetowrk.propagate(learningRate,[formatOutput(28)])

    NeuralNetowrk.activate([4])
    NeuralNetowrk.propagate(learningRate,[formatOutput(37)])

    NeuralNetowrk.activate([5])
    NeuralNetowrk.propagate(learningRate,[formatOutput(46)])
}
const output = parseFloat(NeuralNetowrk.activate([8])*100).toFixed(6)
console.log(output)
*/
const inputLayer = new synaptic.Layer(3)
const hiddenLayer = new synaptic.Layer(10)
const hiddenLayer2 = new synaptic.Layer(10)
const outputLayer = new synaptic.Layer(1)


inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)

const NeuralNetowrk = new synaptic.Network({
    input: inputLayer,
    hidden: [hiddenLayer,hiddenLayer2],
    output: outputLayer
})

const learningRate = .5
for(let i=0;i<20000;i++){
    NeuralNetowrk.activate([1,2,3])
    NeuralNetowrk.propagate(learningRate,[0])

    NeuralNetowrk.activate([4,5,6])
    NeuralNetowrk.propagate(learningRate,[0])

    NeuralNetowrk.activate([10,20,30])
    NeuralNetowrk.propagate(learningRate,[1])

    NeuralNetowrk.activate([40,50,60])
    NeuralNetowrk.propagate(learningRate,[1])
}
const output = parseFloat(NeuralNetowrk.activate([10,20,3])).toFixed(6)
console.log(output)