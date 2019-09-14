require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('./load-csv')

function knn(features,labels,predictionPoint,k){
    features
        .sub(predictionPoint)
        .pow(2)
        .sum(1)
        .pow(.5)
        .expandDims(1)
        .concat(labels,1)
        .unstack()
        .sort((a,b) => {console.log(a);return a.get(0)>b.get(0)?1:-1})
        .slice(0,k)
        .reduce((acc,pair)=> acc + pair[1],0) / k
}
    
let {features,labels,testFeatures,testLabels} = loadCSV('houseData.csv',{
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat','long'],
    labelColumns: ['price']
})

features = tf.tensor(features)
labels = tf.tensor(labels)
testFeatures.forEach((testPoint,i)=>{
const result = knn(features,labels,tf.tensor(testPoint),10)
const err = (testLabels[i][0] - result)/testLabels[i][0]
console.log(testLabels[i][0],result)

})