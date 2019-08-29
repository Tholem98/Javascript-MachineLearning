module.exports = class RegresionLinearMult{
    train(config={}){

        if(config.input) {
            const tempX = config.input
            let concatX = []
            for(let i=0;i<tempX.length;i++){
                const temp = tempX[i].reduce((a,b)=> a+''+b)
                //console.log(temp)
                concatX.push(Number(temp))
            }
            this.X = concatX
        }else {
            this.X = [[0,0]]
        }

        if(config.output) this.Y = config.output; else this.Y = [0]
        this._config = {}
        this._config.input = this.X
        this._config.output = this.Y
    }
    
    saveModel(path='./model.json'){
        const fs = require('fs');
        fs.writeFileSync(path,JSON.stringify(this._config))
    }
    
    loadModel(path='./model.json'){
        const fs = require('fs');
        const data = fs.readFileSync(path,'utf8')
        const json = JSON.parse(data)
        this.X = json.input
        this.Y = json.output
    }
    
    producto(x=[],y=[]){
        let temp = []
        for(let i=0;i<x.length;i++){
            temp.push(parseFloat(x[i])*parseFloat(y[i]))
        }
        return temp
    }
    
    cuadrados(x=[]){
        let temp = []
        for(let i = 0;i<x.length;i++){
            temp.push(parseFloat(x[i])*parseFloat(x[i]))
        }
        return temp
    }
    
    sumatoria(x=[]){
        let temp = 0
        for(let i = 0;i<x.length;i++){
            temp += parseFloat(x[i])
        }
        return temp
    }
    
    media(x=[]){
        return this.sumatoria(x) / x.length
    }
    
    resultados(x=[],y=[],p=0){
        const resultado1 = (this.sumatoria(x) * this.sumatoria(y)) / x.length
        const resultado2 = (this.sumatoria(x) * this.sumatoria(x)) / x.length 
        const resultado3 = this.sumatoria(this.producto(x,y)) - resultado1
        const resultado4 = resultado3 / (this.sumatoria(this.cuadrados(x)) - resultado2)
        const resultado5 = this.media(y) - (resultado4 * this.media(x))
    
        return ((resultado4 * p) + resultado5).toFixed(8)
    } 
    
    predecir(p=[]){
        
        const tempX = p
        let concatX = []
        for(let i=0;i<tempX.length;i++){
            const temp = tempX[i].reduce((a,b)=> a+''+b)
            console.log(temp)
            concatX.push(Number(temp))
        }
        p = concatX

        let regresiones = []
        for(let i=0;i<p.length;i++){
            let temp= this.resultados(this.X,this.Y,p[i])
            regresiones.push(temp)
        }
        
        return regresiones
    }
    
    }