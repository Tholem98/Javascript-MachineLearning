const synaptic = require('synaptic')
/*
const inputLayer = new synaptic.Layer(2)
const outputLayer = new synaptic.Layer(1)

inputLayer.project(outputLayer)

const neuralNetwork = new synaptic.Network({
    input: inputLayer,
    output: outputLayer,
})

const learningRate = .5

for(let i=0;i<2000;i++){
    neuralNetwork.activate([0,0])
    neuralNetwork.propagate(learningRate,[0])

    neuralNetwork.activate([0,1])
    neuralNetwork.propagate(learningRate,[0])

    neuralNetwork.activate([1,0])
    neuralNetwork.propagate(learningRate,[0])
    
    neuralNetwork.activate([1,1])
    neuralNetwork.propagate(learningRate,[1])
}
*//*
const inputLayer = new synaptic.Layer(2)
const outputLayer = new synaptic.Layer(1)

inputLayer.project(outputLayer)

const neuralNetwork = new synaptic.Network({
    input: inputLayer,
    output: outputLayer,
})

const learningRate = .5

for(let i=0;i<2000;i++){
    neuralNetwork.activate([0,0])
    neuralNetwork.propagate(learningRate,[0])

    neuralNetwork.activate([0,1])
    neuralNetwork.propagate(learningRate,[1])

    neuralNetwork.activate([1,0])
    neuralNetwork.propagate(learningRate,[1])
    
    neuralNetwork.activate([1,1])
    neuralNetwork.propagate(learningRate,[1])
}
*//*
const inputLayer = new synaptic.Layer(2)
const hiddenLayer = new synaptic.Layer(4) 
const outputLayer = new synaptic.Layer(1)

inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)


const neuralNetwork = new synaptic.Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer,
})

const learningRate = .5
for(let i=0;i<2000;i++){
    neuralNetwork.activate([0,0])
    neuralNetwork.propagate(learningRate,[0])

    neuralNetwork.activate([0,1])
    neuralNetwork.propagate(learningRate,[1])

    neuralNetwork.activate([1,0])
    neuralNetwork.propagate(learningRate,[1])
    
    neuralNetwork.activate([1,1])
    neuralNetwork.propagate(learningRate,[0])
}
*/

const inputLayer = new synaptic.Layer(1)
const hiddenLayer = new synaptic.Layer(8) 
const outputLayer = new synaptic.Layer(1)

inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)


const neuralNetwork = new synaptic.Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer,
})

const learningRate = 1.3
for(let i=0;i<1000000;i++){
    neuralNetwork.activate([1])
    neuralNetwork.propagate(learningRate,[0.1])

    neuralNetwork.activate([2])
    neuralNetwork.propagate(learningRate,[0.2])

    neuralNetwork.activate([3])
    neuralNetwork.propagate(learningRate,[0.3])
    
    neuralNetwork.activate([4])
    neuralNetwork.propagate(learningRate,[0.4])
}


const output = parseFloat(neuralNetwork.activate([5])).toFixed(6)
console.log(output)


