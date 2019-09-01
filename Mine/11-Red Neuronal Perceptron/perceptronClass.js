module.exports = class Perceptron{
constructor(config={}){
    this.config = {},
    this.Weights = [],
    this.Inputs = [],
    this.Targets = [],
    this.add = [],
    this.Activation = 'relu',
    this.Epochs = 1,
    this.hiddenLayers = 2,
    this.hiddenNodes = 4,
    this.bias = 1;

    if(config.Activation) this.Activation = config.Activation
    if(config.Epochs) this.Epochs = config.Epochs
    if(config.hiddenLayers) this.hiddenLayers = config.hiddenLayers
    if(config.hiddenNodes) this.hiddenNodes = config.hiddenNodes
    if(config.bias) this.bias = config.bias

    this.config = config
}

funcSum(arr=[]){
    //console.log(arr)
    return arr.reduce((a,b)=> a+b)
}

gradientDescent(n=0){
    return n*(1-n)
}

train(fit=[]){
    for(let i=0;i<fit.length;i++){
        (fit[i].input) ? this.Inputs.push(fit[i].input) : this.Inputs.push([0]);
        (fit[i].output) ? this.Targets.push(fit[i].output) : this.Targets.push([0]);
    }
    for(let i=0;i<this.Inputs.length;i++){
        for(let j=0;j<this.Targets.length;j++){
            if((this.Inputs[i][j] != undefined)&&(this.Targets[i][j] != undefined)){
                // console.log(Inputs[i])
                this.feedForward(this.Inputs[i],
                                this.Targets[i][j],
                                this.Epochs,
                                this.Activation,
                                this.hiddenLayers,
                                this.hiddenNodes)
            }    
        }        
    }    
}

saveModel(path='./model.json'){
    const fs = require('fs')
    this.config.Weights = this.Weights
    this.config.Activation = this.Activation
    this.config.hiddenLayers = this.hiddenLayers
    this.config.hiddenNodes = this.hiddenNodes
    fs.writeFileSync(path,'utf8')
}

loadModel(path='./model.json'){
const fs = require('fs')
const data = fs.readFileSync(path,'utf8')
const json = JSON.parse(data)
this.Weights = json.Weights
this.Activation = json.Activation
this.hiddenLayers = json.hiddenLayers
this.hiddenNodes = json.hiddenNodes

}

predict(inputs=[]){
    let Outputs = []
    //encontrar la entrada del entrenamiento mas cercana a la entrada de aprendizaje
    for(let i=0;i<this.Weights.length;i++){
        let Input = this.Weights[i].input,
        diff = [];
        for(let j=0;j<inputs.length;j++){
            diff.push(Math.abs(inputs[j] - Input[j]))
        }
        // let reduce = diff.reduce((a,b)=> Number(a+''+b));
        let reduce = diff.reduce((a, b) => Number(a+''+b));
        this.add.push(reduce)
    }

    // let search = inputs.reduce((a,b)=>{Number(a+''+b)}),
    let search = inputs.reduce((a, b) => Number(a+''+b));
    let index = this.add.indexOf(search)

    let limit = 1;
	if(this.Targets[0]) limit = this.Targets[0].length;
    for(let i=0;i<limit;i++){
        // usar los pesos de la entrada del entrenamiento mas cercano
        let matrizHidden = this.Weights[index].weights
        // console.log(index)
        // console.log(Weights[index])
        //sinapsis de las entradas con las ocultas                    
        let multiply = []
        // console.log(matrizHidden.length)
        for(let j=0;j<inputs.length;j++){
            for(let k=0;k<matrizHidden.length;k++){
                for(let m=0;m<matrizHidden[k].length;m++){
                    multiply.push(inputs[j] * matrizHidden[k][m])
                    // console.log(matrizHidden[k][m])
                }
            }
        }
        let sum = this.funcSum(multiply)
        let output = 0
        //console.log(sum)
        //funcion de activacion
        switch(this.Activation){
            case 'tanh': output = parseFloat(this.tanh(sum)).toFixed(8) ; break;
            case 'sigmoid': output = parseFloat(this.sigmoid(sum)).toFixed(8);break;
            case 'relu': output = parseFloat(this.relu(sum)).toFixed(8) ; break;
            case 'leakyRelu': output = parseFloat(this.leakyRelu(sum)).toFixed(8) ; break;
            case 'binaryStep': output = parseFloat(this.binaryStep(sum)).toFixed(8) ; break;
            default: output = parseFloat(Math.tanh(sum)).toFixed(8) ; break;
        }
        //console.log(output)
        // control del array de salida
        Outputs.push(Number(output))
    }
    return Outputs
}

feedForward(inputs=[],target=0,epochs=1,activation='sigmoid',layer=1,nodes=2){
    //pesos de las capas ocultas
    // console.log(inputs)
    let matrizHidden = []
    for(let i=0;i<layer;i++){
        let arrHidden = []
        for(let j=0;j<nodes;j++){
            arrHidden.push(0)
        }
        matrizHidden.push(arrHidden)
        //  console.log(matrizHidden)
    }

    //backpropagation
    let stop = false,
    output = 0;
    if(target != 0){
        for(let i=1;i<=epochs;i++){
            //sinapsis de las entradas con las ocultas            
            let multiply = []
            for(let j=0;j<inputs.length;j++){
                // console.log({inputs:inputs})
                for(let k=0;k<matrizHidden.length;k++){
                    // console.log({matriz:matrizHidden.length})
                    for(let m=0;m<matrizHidden[k].length;m++){
                        multiply.push(inputs[j] * matrizHidden[k][m])
                        //   console.log(matrizHidden)
                    }
                }
            }
            let sum = this.funcSum(multiply)
            let output = 0
            //funcion de activacion
            switch(activation){
                case 'tanh': output = parseFloat(this.tanh(sum)).toFixed(8) ; break;
                case 'sigmoid': output = parseFloat(this.sigmoid(sum)).toFixed(8);break;
                case 'relu': output = parseFloat(this.relu(sum)).toFixed(8) ; break;
                case 'leakyRelu': output = parseFloat(this.leakyRelu(sum)).toFixed(8) ; break;
                case 'binaryStep': output = parseFloat(this.binaryStep(sum)).toFixed(8) ; break;
                default: output = parseFloat(Math.tanh(sum)).toFixed(8) ; break;
            }
            //tasa de error
            // console.log(inputs)

            let error = parseFloat(Math.abs(target - output)).toFixed(8)
            //cortar el procesamiento cuando encuentra un valor proximo al que busca

            if((parseFloat(output).toFixed(6)==parseFloat(target).toFixed(6))&&(stop==false)){
                console.log('stoped')
                this.Weights.push({input: inputs, weights: matrizHidden})
                
                i=epochs+1
                stop = true
            }
            //actualizar los pesos
            for(let j=0;j<inputs.length;j++){
                for(let k=0;k<matrizHidden.length;k++){
                    for(let m=0;m<matrizHidden[k].length;m++){
                        matrizHidden[k][m] += inputs[j] * this.gradientDescent(error)
                        //  console.log(matrizHidden)
                    }
                }
            }
            // let epoch = i.toString().padStart(7,'0')
            // console.log(`epoca: ${epoch} - taxa de erro: ${error} - saida: ${output}`)
        }
    }
    //usar el bias si no encuentra lo que busca
    // console.log(matrizHidden)
    if(!stop){
        if(output > target){
            for(let k=0;k<matrizHidden.length;k++){
                for(let m=0;m<matrizHidden[k].length;m++){
                    matrizHidden[k][m] -= this.bias
                }
            }
        }else if(output < target){
            for(let k=0;k<matrizHidden.length;k++){
                for(let m=0;m<matrizHidden[k].length;m++){
                    //console.log(matrizHidden)
                    matrizHidden[k][m] += this.bias
                }
            }
        }
        this.Weights.push({input: inputs, weights: matrizHidden})

    }
}

tanh(n=0){return Math.sinh(n)/Math.cosh(n)}
sigmoid(n=0){return 1/(1+Math.pow(Math.E,-n))}
relu(n=0){return Math.max(n,0)}
leakyRelu(n=0){return Math.max(n,0.01)}
binaryStep(n=0){return (n>=0)?1:0}

}