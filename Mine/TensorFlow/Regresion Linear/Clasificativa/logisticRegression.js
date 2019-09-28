require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../KNN TensorFlow/load-csv')
const _ = require('lodash')


class LogisticRegression{
    constructor(features,labels,options){
        this.features = this.processFeatures(features)
        this.labels = tf.tensor(labels)
        this.crossEHistory = []

        this.options=Object.assign({
            learningRate:0.1,
            iterations: 10000,
            decisionBoundary:0.5,
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

            this.recordCrossEntropy()
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
        const predictions = this.predict(testFeatures).round()
       testLabels = tf.tensor(testLabels)

       const incorrect = predictions
       .sub(testLabels)
       .abs()
       .sum()
       .arraySync()

       return (predictions.shape[0] - incorrect) / predictions.shape[0]
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

        const filler = variance.cast('bool').logicalNot().cast('float32')

        this.mean = mean
        this.variance = variance.add(filler)

        return features.sub(mean).div(this.variance.pow(0.5))

    }

    recordCrossEntropy(){
        const guesses = this.features
        .matMul(this.weights)
        .sigmoid()

        const termOne = this.labels
        .transpose()
        .matMul(guesses.log())

        const termTwo = this.labels
        .mul(-1)
        .add(1)
        .transpose()
        .matMul(
            guesses
            .mul(-1)
            .add(1)
            .log()
        )

            const finalTerm = termOne.add(termTwo)
            .div(this.features.shape[0])
            .mul(-1)
            .arraySync(0,0)

        this.crossEHistory.unshift(finalTerm)
    }

    updateLearningRate(){
        if(this.crossEHistory.length<2){
            return
        }

        if(this.crossEHistory[0]>this.crossEHistory[1]){
            this.options.learningRate /= 2
        }else{
            this.options.learningRate *= 1.5
        }

    }

    predict(observations){
        return this.processFeatures(observations)
        .matMul(this.weights)
        .sigmoid()
        .greater(this.options.decisionBoundary)
        .cast('float32')
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

// console.log("mse:",regression.crossEHistory)
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

module.exports = LogisticRegression