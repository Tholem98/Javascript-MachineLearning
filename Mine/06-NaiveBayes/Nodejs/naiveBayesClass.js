module.exports = class NaiveBayes{

    eliminaDuplicados(arr=[]){
        arr = [...new Set(arr)]
        return arr
    }
    
    retornaClases(){
        let arr = this.clases
        arr = this.eliminaDuplicados(arr)
        return arr
    }
    
    contaTexto(text='',procura=''){
        return text.split(procura).length - 1
    }
    
    organizar(){
        let params = {}
    
        for(let i=0;i<this.entradas.length;i++){
            let carac = ''
            if(i<(this.entradas.length-1)) {
                carac = '-'
            }
            if(params[this.clases[i]]){
                params[this.clases[i]] += this.entradas[i] + carac
            }else{
                params[this.clases[i]] = this.entradas[i] + carac
            }
    
        }
    
        let str = JSON.stringify(params)
        str = str.replace(/-"/g,'"')
        str = str.replace(/-/g,',')
        params = JSON.parse(str)
    
        return params
    }
    
    frecuencia(){
        let categorias = []
        let params = {}
        const objeto = this.organizar()
        const labels = this.retornaClases()
    
        for(let i=0;i<this.entradas.length;i++){
            params['Entrada'] = this.entradas[i]
            
            for(let j=0;j<labels.length;j++){
                params[labels[j]] = this.contaTexto(objeto[labels[j]],this.entradas[i])
            }
            categorias[i] = JSON.stringify(params)
        }
    
        categorias = this.eliminaDuplicados(categorias)
    
        for(let i=0;i<categorias.length;i++){
            categorias[i] = JSON.parse(categorias[i])
        }
    
        return categorias
    }
    
    cantidadClases(){
        const categorias = this.frecuencia()
        return parseInt(Object.keys(categorias[0].length-1))
    }
    
    sumarClases(arr=[]){
        let suma = 0
        for(let i=0;i<arr.length;i++){
            suma += parseInt(arr[i])
        }
        return suma
    } 
    
    totalClases(){
        let total = []
        const nombreClases = this.retornaClases()
        const str_clases = JSON.stringify(this.clases)
    
        for(let i=0;i<nombreClases.length;i++){
            total[nombreClases[i]] = this.contaTexto(str_clases,nombreClases[i])
        }
        return total
    }
    
    sumaTotalClases(){
        const vetTemp = Object.values(this.totalClases())
        let suma = 0
        for(let i=0;i<vetTemp.length;i++){
            suma += parseFloat(vetTemp[i])
        }
        return suma
    }
    
    claseEntrada(_entrada='',_clase=''){
        const categorias = this.frecuencia()
        let retorno = 0
        categorias.forEach(item=>{
            if(item['Entrada'] == _entrada){
                retorno = parseFloat(item[_clase])
            }
        })
        return retorno
    }
    
    _naiveBayes(_entrada=''){
        const nombreClases = this.retornaClases()
        const total = this.totalClases()
    
        const categorias = this.frecuencia()
        let suma = 0
        categorias.forEach(item=>{
            if(item['Entrada'] == _entrada){
                for(let i=0;i<nombreClases.length;i++){
                    suma += parseFloat(item[nombreClases[i]])
                }
            }
        })
        let probabilidad =  []
        for(let i=0;i<nombreClases.length;i++){
            probabilidad[nombreClases[i]] = 
            (this.claseEntrada(_entrada,nombreClases[i])/total[nombreClases[i]])
            *
            (total[nombreClases[i]] / this.sumaTotalClases())
            /
            (suma / this.sumaTotalClases())
            // console.log({
            //     primero:claseEntrada(_entrada,nombreClases[i]),
            //     divido1:total[nombreClases[i]],
            //     multiplicado2:total[nombreClases[i]],
            //     dividido2:sumaTotalClases(),
            //     dividido3:suma,
            //     divididopor3:sumaTotalClases()
            // })
        }
        return probabilidad
    }
    
    train(config={}){
        this._config = {}
        if(config.input){this.entradas = config.input}else{this.entradas = ['']}
        if(config.output){this.clases = config.output}else{this.clases = ['']}
        this._config.input= this.entradas
        this._config.output= this.clases
    }
    
    saveModel(path='./model.json'){
        const fs = require('fs');
        fs.writeFileSync(path,JSON.stringify(this._config))
    }
    
    loadModel(path='./model.json'){
        const fs = require('fs');
        const data = fs.readFileSync(path,'utf8')
        const json = JSON.parse(data)
        this.entradas = json.input
        this.clases = json.output
    }

    predict(selecEntrada=''){
        const nombreClases = this.retornaClases()
        let probabilidades = []
        if(selecEntrada.toString().trim().length>0){
            const naive = this._naiveBayes(selecEntrada)
            
            for(let i=0;i<nombreClases.length;i++){
                const porcentual = Number(parseFloat(naive[nombreClases[i]] * 100).toFixed(4))
                probabilidades.push({class: nombreClases[i], probability:porcentual})
            }
        }else{
            probabilidades.push({class:'',probability:0})
        }
    
      return probabilidades  
            
    }
}