const DesicionTree = require('node-decision-tree')

const train = [
    {pai:'castanhos',mae:'castanhos',filho:'castanhos'},
    {pai:'verdes',mae:'castanhos',filho:'castanhos'},
    {pai:'verdes',mae:'verdes',filho:'verdes'},
    {pai:'verdes',mae:'azuis',filho:'verdes'},
    {pai:'azuis',mae:'castanhos',filho:'azuis'},
    {pai:'azuis',mae:'azuis',filho:'azuis'},
]

const input = ['pai', 'mae']
const output = ['filho']

// const predict = [{pai:'castanhos',mae:'azuis'}]
const predict = [{pai:'azuis',mae:'castanhos'}]

const dt = new DesicionTree.Tree
dt.fit(train,input,output)

const result = dt.predict(predict)
console.log(result)