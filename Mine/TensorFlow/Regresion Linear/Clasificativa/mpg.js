// require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../KNN TensorFlow/load-csv')
const _ = require('lodash')
const MultonominalLogisticRegression = require('./multinominal')

let {features, labels, testFeatures, testLabels} = 
loadCSV('../cars.csv',{
    shuffle:true,
    splitTest:50,
    dataColumns: ['horsepower','weight','displacement'],
    labelColumns: ['mpg'],
    converters:{
        mpg: (value)=>{
            const mpg = parseFloat(value)
            if(mpg<15){
                return [1,0,0]
            }else if(mpg < 30){
                return [0,1,0]
            }else{
                return [0,0,1]
            }
        }
    }
})

const regression = new MultonominalLogisticRegression(features, _.flatMap(labels), {
    learningRate: 0.5,
    iterations: 100,
    batchSize: 10,
    // decisionBoundary:0.55
})

// regression.weights.print()

regression.train()
console.log(regression.test(testFeatures,_.flatMap(testLabels)))
// regression.predict([[52,1.065,97]]).print()
// regression.predict([[88,97,1.065]]).print()

// console.log(regression.test(testFeatures,testLabels))
