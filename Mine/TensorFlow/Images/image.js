require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const MultinominalLogisticRegression = require('../Regresion Linear/Clasificativa/Multinominal/multinominal')
const LogisticRegression = require('../Regresion Linear/Clasificativa/Logistic/logisticRegression')
const _ = require('lodash')
const mnist = require('mnist-data')

const mnistData = mnist.training(0,10)

const features = mnistData.images.values.map(image => _.flatMap(image))
const encodedLabels = mnistData.labels.values.map(label =>{
    const row = new Array(10).fill(0)
    row[label] = 1
    return row;
})

const regression = new MultinominalLogisticRegression(features, encodedLabels,{
    learningRate: 1,
    iterations:5,
    batchSize: 100
})

regression.train()