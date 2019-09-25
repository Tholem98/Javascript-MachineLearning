require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('../../KNN TensorFlow/load-csv')
const _ = require('lodash')


class LinearRegression{
    constructor(features,labels,options){
        this.features = this.processFeatures(features)
        this.labels = tf.tensor(labels)


        this.options=Object.assign({
            learningRate:0.1,
            iterations: 10000,
        },options)
        
        this.weights = tf.zeros([2,1])
    }
    
    train(){
        for(let i=0;i< this.options.iterations;i++){
            this.gradientDescent()
        }
    }
    
    gradientDescent(){
        const currentGuesses = this.features.matMul(this.weights)
        const differences = currentGuesses.sub(this.labels) 
        
        const slopes = this.features.transpose()
        .matMul(differences)
        .div(this.features.shape[0])

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

}

let {features, labels, testFeatures, testLabels} = 
loadCSV('./cars.csv',{
    shuffle:true,
    splitTest:50,
    dataColumns: ['horsepower'],
    labelColumns: ['mpg'],
})

const regression = new LinearRegression(features,labels,{
    learningRate:0.1,
    iterations:100,
})


regression.train()

console.log(regression.test(testFeatures,testLabels))

// console.log(
// `Updated M: ${regression.weights.arraySync()[1][0]}
// Updated B: ${regression.weights.arraySync()[0][0]}`
// )