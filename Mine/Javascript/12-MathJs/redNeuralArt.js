/*module.exports = */class NeuralNetwork{
        constructor(params={}){
            this.mathjs = require('mathjs')
            this.inputNodes = 2
            this.outputNodes = 1
            this.hiddenNodes = 4
            this.epochs = 50
            this.learningRate = 0.5
            this.activation = this.sigmoid

            if(params.inputNodes) this.inputNodes = params.inputNodes
            if(params.outputNodes) this.outputNodes = params.outputNodes
            if(params.hiddenNodes) this.hiddenNodes = params.hiddenNodes
            if(params.epochs) this.epochs = params.epochs
            if(params.learningRate) this.learningRate = params.learningRate

            this.synapse0 = this.mathjs.random([this.inputNodes, this.hiddenNodes],-1,1)
            this.synapse1 = this.mathjs.random([this.hiddenNodes, this.outputNodes],-1,1) 

        }

        gradientDescent(n=0){return n*(1-n)}

        sigmoid(x=0,derivada=false){
            const fx = 1 / (1 + this.mathjs.exp(-x))
            if(derivada) {return this.gradientDescent(fx)}
            return fx
        }

        train(input=[],target=[]){
            for(let i=0;i<this.epochs;i++){
                const inputLayer = input
                const hiddenLayer = 
                this.mathjs.multiply(inputLayer,this.synapse0)
                .map(v => this.activation(v,false))
                const outputLayer = 
                this.mathjs.multiply(hiddenLayer,this.synapse1)
                .map(v => this.activation(v,false))

                const outputError =
                this.mathjs.subtract(target,outputLayer)
                const outputDelta =
                this.mathjs.dotMultiply(outputError,outputLayer
                    .map(v=>this.activation(v,true)))
                const hiddenError =
                this.mathjs.multiply(outputDelta,this.mathjs
                    .transpose(this.synapse1))
                const hiddenDelta = 
                this.mathjs.dotMultiply(hiddenError,hiddenLayer
                    .map(v=>this.activation(v,true)))
                
                this.synapse0 =
                this.mathjs.add(this.synapse0,
                    this.mathjs.multiply(this.mathjs.transpose(inputLayer),
                        this.mathjs.multiply(hiddenDelta, this.learningRate)))
                this.synapse1 =
                this.mathjs.add(this.synapse1,
                    this.mathjs.multiply(this.mathjs.transpose(hiddenLayer),
                        this.mathjs.multiply(outputDelta, this.learningRate)))
                
                if(i % 250000 == 0){
                    console.log(`taxa de erro: ${this.mathjs.mean(
                        this.mathjs.abs(outputError)
                    ).toFixed(8)}`)
                }
            }
        }

        predict(input=[]){
            const inputLayer = input
            const hiddenLayer = 
            this.mathjs.multiply(inputLayer,this.synapse0)
            .map(v=> this.activation(v,false))
            const outputLayer = 
            this.mathjs.multiply(hiddenLayer,this.synapse1)
            .map(v=> this.activation(v,false))

            return outputLayer;
        }
    }

const config = {
    inputNodes:2,
    hiddenNodes:4,
    outputNodes: 1,
    epochs: 50000000,
    learningRate: 0.5 
}

const mathjs = require('mathjs')
const net = new NeuralNetwork(config)
const input= mathjs.matrix([[0,0],[0,1],[1,0],[1,1]])
const target = mathjs.matrix([[0],[0],[0],[1]])
net.train(input,target)

console.log()
console.log(`0 xor 0: ${parseFloat(net.predict([0,0])._data).toFixed(6)}`)
console.log(`0 xor 1: ${parseFloat(net.predict([0,1])._data).toFixed(6)}`)
console.log(`1 xor 0: ${parseFloat(net.predict([1,0])._data).toFixed(6)}`)
console.log(`1 xor 1: ${parseFloat(net.predict([1,1])._data).toFixed(6)}`)

