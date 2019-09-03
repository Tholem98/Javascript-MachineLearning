let config = {},
Weights = [],
Inputs = [],
Targets = [],
add = [],
Activation = 'tanh',
Epochs = 1,
hiddenLayers = 2,
hiddenNodes = 4,
bias = 1;


function funcSum(arr=[]){
    //console.log(arr)
    return arr.reduce((a,b)=> a+b)
}

function gradientDescent(n=0){
    return n*(1-n)
}

function train(fit=[]){
    for(let i=0;i<fit.length;i++){
        (fit[i].input) ? Inputs.push(fit[i].input) : Inputs.push([0]);
        (fit[i].output) ? Targets.push(fit[i].output) : Targets.push([0]);
    }
    for(let i=0;i<Inputs.length;i++){
        for(let j=0;j<Targets.length;j++){
            if((Inputs[i][j] != undefined)&&(Targets[i][j] != undefined)){
                // console.log(Inputs[i])
                feedForward(Inputs[i],Targets[i][j],Epochs,Activation,hiddenLayers,hiddenNodes)
            }    
        }        
    }    
}

function saveModel(path='./model.json'){
    const fs = require('fs')
    config.Weights = Weights
    config.Activation = Activation
    config.hiddenLayers = hiddenLayers
    config.hiddenNodes = hiddenNodes
    fs.writeFileSync(path,'utf8')
}

function loadModel(path='./model.json'){
const fs = require('fs')
const data = fs.readFileSync(path,'utf8')
const json = JSON.parse(data)
Weights = json.Weights
Activation = json.Activation
hiddenLayers = json.hiddenLayers
hiddenNodes = json.hiddenNodes

}

function predict(inputs=[]){
    let Outputs = []
    //encontrar la entrada del entrenamiento mas cercana a la entrada de aprendizaje
    for(let i=0;i<Weights.length;i++){
        let Input = Weights[i].input,
        diff = [];
        for(let j=0;j<inputs.length;j++){
            diff.push(Math.abs(inputs[j] - Input[j]))
        }
        // let reduce = diff.reduce((a,b)=> Number(a+''+b));
        let reduce = diff.reduce((a, b) => Number(a+''+b));
        add.push(reduce)
    }

    // let search = inputs.reduce((a,b)=>{Number(a+''+b)}),
    let search = inputs.reduce((a, b) => Number(a+''+b));
    let index = add.indexOf(search)

    let limit = 1;
	if(Targets[0]) limit = Targets[0].length;
    for(let i=0;i<limit;i++){
        // usar los pesos de la entrada del entrenamiento mas cercano
        let matrizHidden = Weights[index].weights
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
        let sum = funcSum(multiply)
        //console.log(sum)
        //funcion de activacion
        switch(Activation){
            case 'tanh': output = parseFloat(tanh(sum)).toFixed(8) ; break;
            case 'sigmoid': output = parseFloat(sigmoid(sum)).toFixed(8);break;
            case 'relu': output = parseFloat(relu(sum)).toFixed(8) ; break;
            case 'leakyRelu': output = parseFloat(leakyRelu(sum)).toFixed(8) ; break;
            case 'binaryStep': output = parseFloat(binaryStep(sum)).toFixed(8) ; break;
            default: output = parseFloat(Math.tanh(sum)).toFixed(8) ; break;
        }
        //console.log(output)
        // control del array de salida
        Outputs.push(Number(output))
    }
    return Outputs
}

function feedForward(inputs=[],target=0,epochs=1,activation='sigmoid',layer=1,nodes=2){
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
            let sum = funcSum(multiply)
            //funcion de activacion
            switch(activation){
                case 'tanh': output = parseFloat(tanh(sum)).toFixed(8) ; break;
                case 'sigmoid': output = parseFloat(sigmoid(sum)).toFixed(8);break;
                case 'relu': output = parseFloat(relu(sum)).toFixed(8) ; break;
                case 'leakyRelu': output = parseFloat(leakyRelu(sum)).toFixed(8) ; break;
                case 'binaryStep': output = parseFloat(binaryStep(sum)).toFixed(8) ; break;
                default: output = parseFloat(Math.tanh(sum)).toFixed(8) ; break;
            }
            //tasa de error
            // console.log(inputs)

            let error = parseFloat(Math.abs(target - output)).toFixed(8)
            //cortar el procesamiento cuando encuentra un valor proximo al que busca

            if((parseFloat(output).toFixed(6)==parseFloat(target).toFixed(6))&&(stop==false)){
                console.log('stoped')
                Weights.push({input: inputs, weights: matrizHidden})
                
                i=epochs+1
                stop = true
            }
            //actualizar los pesos
            for(let j=0;j<inputs.length;j++){
                for(let k=0;k<matrizHidden.length;k++){
                    for(let m=0;m<matrizHidden[k].length;m++){
                        matrizHidden[k][m] += inputs[j] * gradientDescent(error)
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
                    matrizHidden[k][m] -= bias
                }
            }
        }else if(output < target){
            for(let k=0;k<matrizHidden.length;k++){
                for(let m=0;m<matrizHidden[k].length;m++){
                    //console.log(matrizHidden)
                    matrizHidden[k][m] += bias
                }
            }
        }
        Weights.push({input: inputs, weights: matrizHidden})

    }
}

function tanh(n=0){return Math.sinh(n)/Math.cosh(n)}
function sigmoid(n=0){return 1/(1+Math.pow(Math.E,-n))}
function relu(n=0){return Math.max(n,0)}
function leakyRelu(n=0){return Math.max(n,0.01)}
function binaryStep(n=0){return (n>=0)?1:0}

//feedForward([0.25],0.85,1000,'relu')

// train([
//     {input: [0,0],output: [0]},
//     {input: [0,1],output: [1]},
//     {input: [1,0],output: [1]},
//     {input: [1,1],output: [0]}
// ])

// console.log(`0 por 0: ${predict([0,0])}`)
// console.log(`0 por 1: ${predict([0,1])}`)
// console.log(`1 por 0: ${predict([1,0])}`)
// console.log(`1 por 1: ${predict([1,1])}`)