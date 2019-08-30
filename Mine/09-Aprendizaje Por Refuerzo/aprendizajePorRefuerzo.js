module.exports = class KMeans {
   constructor(){
       this.eixoX =[]
       this.eixoY = []
       this.grupos = 2
       this.centroideX = []
       this.centroideY = []
       this.grupoID_Anterior = []

       this.indice1 = Math.floor(Math.random() * this.eixoX.length)
       this.indice2 = Math.floor(Math.random() * this.eixoY.length)
       this.llamadas = 0
   }

    indiceCentroide(){
        const fs = require('fs')

        let positivo = fs.readFileSync('positivo.txt','utf8')
        positivo = positivo.toString().trim()

        if(positivo.length > 0){
            const linhas = positivo.split('\n')
            for(let i=0;i<linhas.length;i++){
                const indices = linhas[i].split(',')
                const index1 = indices[0]
                const index2 = indices[1]

                this.indice1 = index1
                this.indice2 = index2
            }
        }else{
            let negativo = fs.readFileSync('negativo.txt','utf8')
            negativo = negativo.toString().trim()

            if(negativo.length > 0){
                const linhas = negativo.split('\n')
                let duplasIndices = []
                for(let i=0;i<linhas.length;i++){
                    const indices = linhas[i].split(',')
                    const index1 = indices[0]
                    const index2 = indices[1]

                    duplasIndices.push([index1,index2])
                }
                this.inicializaIndices(duplasIndices)
            }else{
                this.indice1 = Math.floor(Math.random() * this.eixoX.length)
                this.indice2 = Math.floor(Math.random() * this.eixoY.length)
            }
        }
    }

    inicializaIndices(matriz=[]){
        const i1 = Math.floor(Math.random() * this.eixoX.length)
        const i2 = Math.floor(Math.random() * this.eixoY.length)
        const sorteo = [i1,i2]
        let igual = 0
        for(let i=0;i<matriz.length;i++){
            const temp = matriz[i]
            if((temp[0]==sorteo[0])&&(temp[1]==sorteo[1])){
                igual++
            }
        }
        if(igual > 0){
            if(this.llamadas < 10){
                this.inicializaIndices(matriz)
                this.llamadas++
            }else{
                this.llamadas = 0
            }
        }else{
            this.indice1 = i1
            this.indice2 = i2
        }
    }

    feedback(){
        const fs = require('fs')

        let positivo = fs.readFileSync('positivo.txt','utf8')
        positivo = positivo.toString().trim()

        if(positivo.length <=0){
            const readLine = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            })
            readLine.question('Feedback positivo o negativo? ',(feed)=>{
                let nombreArchivo = 'negativo.txt'
                if(feed.toString().toLowerCase().trim() == 'positivo'){
                    nombreArchivo = 'positivo.txt'
                }
                let antigo = fs.readFileSync(nombreArchivo,'utf8')
                if(antigo == undefined){
                    antigo = ''
                }
                const nuevo = antigo + '\n' + this.indice1 + ',' + this.indice2
                fs.writeFileSync(nombreArchivo,nuevo.toString().trim())
                if(feed.toString().trim().length <= 0){
                    feed = 'negativo'
                }
                console.log(`Su feedback fue ${feed}`)
                readLine.close()
            })

        }
    }

    mediaGrupoX(IDs=[],grupoIDs=0){
        let suma = 0
        let qtdGrupo = 0
        for(let i=0;i<IDs.length;i++){
            if(IDs[i] == grupoIDs){
                suma += this.eixoX[i]
                qtdGrupo++
            }
        }
        return suma / qtdGrupo
    }
    
    mediaGrupoY(IDs=[],grupoIDs=0){
        let suma = 0
        let qtdGrupo = 0
        for(let i=0;i<IDs.length;i++){
            if(IDs[i] == grupoIDs){
                suma += this.eixoY[i]
                qtdGrupo++
            }
        }
        return suma / qtdGrupo
    }
    
    actualizaCentX(){
        if(this.centroideX.length <= 0){
            this.centroideX[0] = this.eixoX[this.indice1]
            for(let i=1;i<this.grupos;i++){
                this.centroideX[i] = this.eixoX[this.indice2]
            }
        }else{
            for(let i=0;i<this.grupos;i++){
                this.centroideX[i] = this.mediaGrupoX(this.grupoID_Anterior,i)
            }
        }
    }
    
    actualizaCentY(){
        if(this.centroideY.length <= 0){
            this.centroideY[0] = this.eixoY[this.indice1]
            for(let i=1;i<this.grupos;i++){
                this.centroideY[i] = this.eixoY[this.indice2]
            }
        }else{
            for(let i=0;i<this.grupos;i++){
                this.centroideY[i] = this.mediaGrupoY(this.grupoID_Anterior,i)
            }
        }
    }
    
    minimo(arr=[]){
        Array.prototype.min = function(){
            return Math.min.apply(null,this)
        }
        return arr.min()
    }
    
    grupo(distancias=[],menorDistancia=0){
        return distancias.indexOf(menorDistancia)
    }
    
    comparaGrupos(arr1=[],arr2=[]){
        let retorno = true
        for(let i=0;i<arr1.length;i++){
            if(arr1[i] != arr2[i]){
                retorno = false
            }
        }
        return retorno
    }
    
    actualizaGrupo(){
        this.actualizaCentX()
        this.actualizaCentY()
    
        let retorno = true,
        grupoID = [],
        distancias = [],
        distanciasMenores = []
    
        for(let i=0;i<this.eixoX.length;i++){
            for(let j=0;j<this.grupos;j++){
                distancias[j] = Math.sqrt(Math.pow(this.eixoX[i]-this.centroideX[j],2)
                +Math.pow(this.eixoY[i]-this.centroideY[j],2))
            }
            distanciasMenores[i] = this.minimo(distancias)
            grupoID[i] = this.grupo(distancias,distanciasMenores[i])
        }
    
        if(this.grupoID_Anterior.length <= 0){
            this.grupoID_Anterior = grupoID
        }else{
            if(this.comparaGrupos(this.grupoID_Anterior,grupoID)){
                retorno = false
            }else{
                this.grupoID_Anterior = grupoID
                retorno = true
            }
        }
        return retorno
    }
    
    retornaElGrupo(arrGrupos=[]){
        let matrizGrupos = []
        for(let i=0;i<this.grupos;i++){
            let divisionGrupos = []
            for(let j=0;j<arrGrupos.length;j++){
                if(arrGrupos[j] == i){
                    divisionGrupos.push([this.eixoX[j],this.eixoY[j]])
                }
            }
    
            matrizGrupos.push(divisionGrupos)
        }
        return matrizGrupos
    }
    
    train(config={}){
        this._config = {}
        if(config.x) this.eixoX = config.x; else this.eixoX = []
        if(config.y) this.eixoY = config.y; else this.eixoY = []
        if(config.groups) this.grupos = config.groups; else this.grupos = 2
        this._config.x = this.eixoX
        this._config.y = this.eixoY
        this._config.groups = this.groups
        this.indiceCentroide()
        
    }
    
    predict(){
        this.centroideX = []
        this.centroideY = []
        this.grupoID_Anterior = []
    
        if((this.grupos > 1)&&(this.grupos < this.eixoX.length)){
            if(this.eixoX.length > 2){
                while(this.actualizaGrupo()){}
                const matriz = this.retornaElGrupo(this.grupoID_Anterior)
                console.log(matriz)
                this.feedback()
            }else { 
                console.log([])
            }
        }else{
            console.log([])
        }
    }
}