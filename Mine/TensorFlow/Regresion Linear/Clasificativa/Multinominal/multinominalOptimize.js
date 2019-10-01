require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../../KNN TensorFlow/load-csv')
const _ = require('lodash')


class MultinominalLogisticRegression{
    constructor(features,labels,options){
        this.features = this.processFeatures(features)
        this.labels = tf.tensor(labels)
        this.crossEHistory = []

        this.options=Object.assign({
            learningRate:0.1,
            iterations: 10000,
            decisionBoundary:0.5,
        },options)
        
        this.weights = tf.zeros([this.features.shape[1],this.labels.shape[1]])
    }
    
    train(features, labels, batch){
        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize)
        
        for(let i=0;i< this.options.iterations;i++){
            for(let j=0;j<batchQuantity;j++){
                const {batchSize} = this.options
                const startIndext = j*batchSize
                this.weights = tf.tidy(()=>{
                    
                    const featureSlice = this.features.slice([startIndext,0],[batchSize, -1])
                    const labelSlice = this.labels.slice([startIndext,0],[batchSize, -1])
                    
                    return this.gradientDescent(featureSlice, labelSlice)
                })
            }

            this.recordCrossEntropy()
            this.updateLearningRate()
        }
    }
    
    gradientDescent(features, labels){
        const currentGuesses = features.matMul(this.weights).softmax()
        const differences = currentGuesses.sub(labels)
        
        const slopes = features
        .transpose()
        .matMul(differences)
        .div(features.shape[0])

        return this.weights.sub(slopes.mul(this.options.learningRate))
    }
 
    test(testFeatures, testLabels){
        const predictions = this.predict(testFeatures).round()
       testLabels = tf.tensor(testLabels).argMax(1)

       const incorrect = predictions
       .notEqual(testLabels)
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
        const finalTerm = tf.tidy(()=>{
            
            const guesses = this.features
            .matMul(this.weights)
            .softmax()
            
            const termOne = this.labels
            .transpose()
            .matMul(guesses.add(1e-7).log())
            
            const termTwo = this.labels
            .mul(-1)
            .add(1)
            .transpose()
            .matMul(
                guesses
                .mul(-1)
                .add(1)
                .add(1e-7)
                .log()
                )
                
                return termOne.add(termTwo)
                .div(this.features.shape[0])
                .mul(-1)
                .arraySync(0,0)
            })
                // console.log(finalTerm)
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
        .softmax()
        .argMax(1)
    }

}
/*
let {features, labels, testFeatures, testLabels} = 
loadCSV('../../cars.csv',{
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

module.exports = MultinominalLogisticRegression