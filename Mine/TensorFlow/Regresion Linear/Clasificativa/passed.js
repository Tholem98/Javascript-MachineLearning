require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../KNN TensorFlow/load-csv')
const _ = require('lodash')


let {features, labels, testFeatures, testLabels} = 
loadCSV('../cars.csv',{
    shuffle:true,
    splitTest:50,
    dataColumns: ['horsepower','weight','displacement'],
    labelColumns: ['passedemissions'],
})