require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../KNN TensorFlow/load-csv')
const _ = require('lodash')


class LogisticRegression{
    constructor(features,labels,options){
        this.features = this.processFeatures(features)
        this.labels = tf.tensor(labels)
        this.mseHistory = []

        this.options=Object.assign({
            learningRate:0.1,
            iterations: 10000,
        },options)
        
        this.weights = tf.zeros([this.features.shape[1],1])
    }
    
    train(features, labels, batch){
        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize)
        
        for(let i=0;i< this.options.iterations;i++){
            for(let j=0;j<batchQuantity;j++){
                const {batchSize} = this.options
                const startIndext = j*batchSize

                const featureSlice = this.features.slice([startIndext,0],[batchSize, -1])
                const labelSlice = this.labels.slice([startIndext,0],[batchSize, -1])

                this.gradientDescent(featureSlice, labelSlice)
            }

            this.recordMSE()
            this.updateLearningRate()
        }
    }
    
    gradientDescent(features, labels){
        const currentGuesses = features.matMul(this.weights)
        const differences = currentGuesses.sub(labels)
        
        const slopes = features
        .transpose()
        .matMul(differences)
        .div(features.shape[0])

        this.weights = this.weights.sub(slopes.mul(this.options.learningRate))
    }
 
    test(testFeatures, testLabels){
        testFeatures = this.processFeatures(testFeatures)
        testLabels = tf.tensor(testLabels)

        const predictions = testFeatures.matMul(this.weights)

        const res = testLabels.sub(predictions)
        .pow(2)
        .sum()
        .arraySync()

        const tot = testLabels.sub(testLabels.mean())
        .pow(2)
        .sum()
        .arraySync()

        return 1 - (res/tot)
    }
    
    processFeatures(features){
        features = tf.tensor(features)
        features = tf.ones([features.shape[0],1]).concat(features,1)
        
        if(this.mean && this.variance){
            features = features.sub(this.mean).div(this.variance.pow(0.5))
        }else{
            features = this.standarize(features)
        }
        
        return features    
    }
    
    standarize(features){
        const {mean, variance} = tf.moments(features,0)

        this.mean = mean
        this.variance = variance

        return features.sub(mean).div(variance.pow(0.5))

    }

    recordMSE(){
        const mse = this.features.matMul(this.weights)
        .sub(this.labels)
        .pow(2)
        .sum()
        .div(this.features.shape[0])
        .arraySync()

        this.mseHistory.unshift(mse)
    }

    updateLearningRate(){
        if(this.mseHistory.length<2){
            return
        }

        if(this.mseHistory[0]>this.mseHistory[1]){
            this.options.learningRate /= 2
        }else{
            this.options.learningRate *= 1.5
        }

    }

    predict(observations){
        return this.processFeatures(observations)
        .matMul(this.weights)
    }

}
/*
let {features, labels, testFeatures, testLabels} = 
loadCSV('../cars.csv',{
    shuffle:true,
    splitTest:50,
    dataColumns: ['horsepower'],
    labelColumns: ['mpg'],
})

const regression = new LinearRegression(features,labels,{
    learningRate:0.1,
    iterations:100,
    batchSize: 10,
})


regression.train()

// console.log("mse:",regression.mseHistory)
// console.log(regression.test(testFeatures,testLabels))
const result = regression.predict([
    [120,2,380],
    // [135,2.1,420],

]).arraySync()
console.log(result)
// console.log(
// `Updated M: ${regression.weights.arraySync()[1][0]}
// Updated B: ${regression.weights.arraySync()[0][0]}`
// )
*/