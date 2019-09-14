const predictionPoint = 300,
outputs = []

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel])
}

function runAnalysis() {
  const testSetSize = 100
  
  let numberCorrect = 0
const k = 3
//   for(let i=0;i<testSet.length;i++){
//     const bucket =  knn(trainingSet, testSet[i][0])
//     console.log(bucket,testSet[i][3])
//     if(bucket === testSet[i][3]) numberCorrect++
//   }
// console.log('Accuracy:',numberCorrect/testSetSize)
_.range(0,3).forEach(feature => {
  const data = _.map(outputs, row=> [row[feature], _.last(row)])
  const [testSet, trainingSet] = splitDataset(minMax(data,1), testSetSize)
  const accuracy = _.chain(testSet)
    .filter(testPoint => {
      return knn(trainingSet,_.initial(testPoint),k)===_.last(testPoint)
    })
    .size()
    .divide(testSetSize)
    .value()

  console.log(`for ${feature} the accuracy is: ${accuracy}`)
  });

}

function knn(data, point, k){
 return _.chain(data)
  .map(row => {
   return [
     distance(_.initial(row), point),
     _.last(row)
  ]
  })
  .sortBy(row => row[0])
  .slice(0,k)
  .countBy(row => row[1])
  .toPairs()
  .sortBy(row => row[1])
  .last()
  .first()
  .parseInt()
  .value()
}

function distance(pointA, pointB){
  return _.chain(pointA)
  .zip(pointB)
  .map(([a,b])=> (a-b)**2)
  .sum()
  .value() ** 0.5
}

function splitDataset(data, testCount){
  const suffled = _.shuffle(data)

  const testSet = _.slice(suffled, 0, testCount)
  const trainingSet = _.slice(suffled, testCount)

  return [testSet, trainingSet]
}

function minMax(data, featureCount){
 const cloneData = _.cloneDeep(data)

 for(let i=0;i< featureCount;i++){
    const colum = cloneData.map(row => row[i])

    const min = _.min(colum)
    const max = _.max(colum)
    for(let j=0;j<cloneData.length;j++){
      cloneData[j][i] = (cloneData[j][i]-min)/(max-min)
    }
  }

  return cloneData
}