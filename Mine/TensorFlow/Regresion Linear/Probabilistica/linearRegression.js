require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../KNN TensorFlow/load-csv')
const _ = require('lodash')


class LinearRegression{
    constructor(features,labels,options){
        this.features = features
        this.labels=labels
        this.options=Object.assign({
            learningRate:0.1,
            iterations: 10000,
        },options)
        
        this.m=0
        this.b=0
    }
    
    train(){
        for(let i=0;i< this.options.iterations;i++){
            this.gradientDescent()
        }
    }
    
    gradientDescent(){
        const guessMPGs = this.features.map(row=>{
            return this.m * row[0] + this.b
        }) 
        
        const bSlope = (_.sum(guessMPGs.map((guess,i)=>{
            return guess - this.labels[i][0]
        })) * 2) / this.features.length
        
        
        const mSlope = (_.sum(guessMPGs.map((guess,i)=>{
            return -1 * this.features[i][0] * (this.labels[i][0] - guess)
        })) * 2) / this.features.length
        
        this.m = this.m - mSlope * this.options.learningRate
        this.b = this.b - bSlope * this.options.learningRate
        
    }
    
}

let {features, labels, testFeatures, testLabels} = 
loadCSV('./cars.csv',{
    shuffle:true,
    splitTest:50,
    dataColumns: ['horsepower'],
    labelColumns: ['mpg'],
})

const regression = new LinearRegression(features,labels,{
    learningRate:0.000001,
    iterations:100,
})

regression.train()


console.log(
`Updated M: ${regression.m}
Updated B: ${regression.b}`
)