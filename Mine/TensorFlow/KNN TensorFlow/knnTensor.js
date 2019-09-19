require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('./load-csv')

function knn(features,labels,predictionPoint,k){
    const {mean,variance} = tf.moments(features,0)
    const scalePrediction = predictionPoint.sub(mean).div(variance.pow(0.5))

    let arrayTensor = features
        .sub(mean)
        .div(variance.pow(.5))
        .sub(scalePrediction)
        .pow(2)
        .sum(1)
        .pow(.5)
        .expandDims(1)
        .concat(labels,1)
        .unstack()

        return arrayTensor
        .sort((a,b) => a.arraySync(0)>b.arraySync(0)?1:-1)
        .slice(0,k)
        .reduce((acc,pair)=> acc + pair[1],0) / k
}
    
let {features,labels,testFeatures,testLabels} = loadCSV('houseData.csv',{
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat','long','sqft_lot','sqft_living'],
    labelColumns: ['price']
})

features = tf.tensor(features)
labels = tf.tensor(labels)
testFeatures.forEach((testPoint,i)=>{
    console.log(testPoint)
const result = knn(features,labels,tf.tensor(testPoint),10)
const err = (testLabels[i][0] - result)/testLabels[i][0]
console.log(testLabels[i][0],result)

})