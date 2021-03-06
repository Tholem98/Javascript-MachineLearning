// require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../../KNN TensorFlow/load-csv')
const _ = require('lodash')
const LogisticRegression = require('./logisticRegression')

let {features, labels, testFeatures, testLabels} = 
loadCSV('../../cars.csv',{
    shuffle:true,
    splitTest:50,
    dataColumns: ['horsepower','weight','displacement'],
    labelColumns: ['passedemissions'],
    converters:{
        passedemissions: (value)=>{
            return value === 'TRUE' ? 1 : 0
        }
    }
})
const regression = new LogisticRegression(features, labels, {
    learningRate: 0.5,
    iterations: 100,
    batchSize: 10,
    decisionBoundary:0.55
})

regression.train()
regression.predict([[130,307,1.75]]).print()
regression.predict([[88,97,1.065]]).print()

console.log(regression.test(testFeatures,testLabels))