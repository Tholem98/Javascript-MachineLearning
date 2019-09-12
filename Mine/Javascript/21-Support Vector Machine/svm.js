const SVM = require('inferrer')
const svm = new SVM(/*{kernel:'gaussian',gamma:0.6}*/)

/*
svm.train([
    {input: [1,2],classification: -1},
    {input: [5,6],classification: -1},
    {input: [10,20],classification: 1},
    {input: [30,40],classification: 1},
])

const input1 = [3,4]
const input2 = [15,25]

const output1 = svm.classify(input1) == -1 ? 'menor' : 'mayor'
const output2 = svm.classify(input2) == -1 ? 'menor' : 'mayor'

console.log({output1,output2})
*/
/*
svm.train([
    {input: [0,0],classification: -1},
    {input: [0,1],classification: -1},
    {input: [1,0],classification: -1},
    {input: [1,1],classification: 1},
])

const output1 = svm.classify([0,0]) == -1 ? 0 : 1
const output2 = svm.classify([0,1]) == -1 ? 0 : 1
const output3 = svm.classify([1,0]) == -1 ? 0 : 1
const output4 = svm.classify([1,1]) == -1 ? 0 : 1

console.log({output1,output2,output3,output4})
*/
/*
svm.train([
    {input: [0,0],classification: -1},
    {input: [0,1],classification: 1},
    {input: [1,0],classification: 1},
    {input: [1,1],classification: -1},
])

const output1 = svm.classify([0,0]) == -1 ? 0 : 1
const output2 = svm.classify([0,1]) == -1 ? 0 : 1
const output3 = svm.classify([1,0]) == -1 ? 0 : 1
const output4 = svm.classify([1,1]) == -1 ? 0 : 1

console.log({output1,output2,output3,output4})
*/
/*
svm.train([
    {input: [0,0],classification: 1},
    {input: [0,1],classification: -1},
    {input: [1,0],classification: -1},
    {input: [1,1],classification: 1},
])

const output1 = svm.classify([0,0]) == -1 ? 0 : 1
const output2 = svm.classify([0,1]) == -1 ? 0 : 1
const output3 = svm.classify([1,0]) == -1 ? 0 : 1
const output4 = svm.classify([1,1]) == -1 ? 0 : 1

console.log({output1,output2,output3,output4})
*/
/*
svm.train([
    {input: [10,11],classification: -1},
    {input: [12,13],classification: -1},
    {input: [50,70],classification: 1},
    {input: [80,90],classification: 1},
])

const list = [[12,12],[13,14],[55,70],[67,88]]

const output1 = svm.classifyList(list) 
console.log({output1})
*/
svm.train([
    {input: [10,11,12],classification: -1},
    {input: [12,13,14],classification: -1},
    {input: [50,70,80],classification: 1},
    {input: [80,90,99],classification: 1},
])

const list = [[12,12,12],[13,14,15],[55,70,95],[67,88,77]]

const output1 = svm.classifyList(list) 
console.log({output1})