require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const MultinominalLogisticRegression = require('../Regresion Linear/Clasificativa/Multinominal/multinominal')
const LogisticRegression = require('../Regresion Linear/Clasificativa/Logistic/logisticRegression')
const MLROptimaze = require('../Regresion Linear/Clasificativa/Multinominal/multinominalOptimize')
const _ = require('lodash')
const mnist = require('mnist-data')

function loadData(){
    const mnistData = mnist.training(0,30000)
    const features = mnistData.images.values.map(image => _.flatMap(image))
    const encodedLabels = mnistData.labels.values.map(label =>{
        const row = new Array(10).fill(0)
        row[label] = 1
        return row;
    })

    return {features, encodedLabels}
}
const {features, encodedLabels} = loadData()

const regression = new MLROptimaze(features, encodedLabels,{
    learningRate: 1,
    iterations:50,
    batchSize: 500
})

regression.train()

const testMnistData = mnist.testing(0,1000);
const testFeatures = testMnistData.images.values.map(image => _.flatMap(image))
const testEncodedLabels = testMnistData.labels.values.map(label =>{
    const row = new Array(10).fill(0)
    row[label] = 1
    return row;
})

const accuracy = regression.test(testFeatures,testEncodedLabels)
console.log(accuracy)
// console.log(regression.crossEHistory)