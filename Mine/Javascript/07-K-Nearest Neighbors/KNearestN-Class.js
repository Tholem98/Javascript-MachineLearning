module.exports = class KNearestN{
    constructor(){
        this.eixoX = []
        this.eixoY = []
        this.clase = []
        this.entradaX = 0
        this.entradaY = 0


    }
    subtraerX(){
        let subt=[]
        
        for(let i=0;i<this.eixoX.length;i++){
            subt[i] = this.eixoX[i] - this.entradaX
        }
        return subt
    }

    subtraerY(){
        let subt=[]
        
        for(let i=0;i<this.eixoY.length;i++){
            subt[i] = this.eixoY[i] - this.entradaY
        }
        return subt
    }

    cuadradosX(){
        const subt = this.subtraerX()
        let cuadrados = []
        for(let i=0;i<subt.length;i++){
            cuadrados[i] = subt[i] * subt[i]
        }
        return cuadrados
    }

    cuadradosY(){
        const subt = this.subtraerY()
        let cuadrados = []
        for(let i=0;i<subt.length;i++){
            cuadrados[i] = subt[i] * subt[i]
    }
    return cuadrados
    }

    sumaCuadrados(){
        const cuadradoX = this.cuadradosX()
        const cuadradoY = this.cuadradosY()
        let suma = []
        for(let i=0;i<cuadradoX.length;i++){
            suma[i]=cuadradoX[i] + cuadradoY[i]
        }
        return suma
    }

    raices(){
        const suma = this.sumaCuadrados()
        let raices = []
        for(let i=0;i<suma.length;i++){
            raices[i] = Math.sqrt(suma[i])
        }
        return raices
    }

    train(config={}){
        if(config.x) this.eixoX = config.x;else this.eixoX = [0]
        if(config.y) this.eixoY = config.y;else this.eixoY = [0]
        if(config.class) this.clase = config.class;else this.clase = ['']
    }

    predict(_entradaX=0,_entradaY=0){
        this.entradaX = _entradaX
        this.entradaY = _entradaY
        let entradaClase = 0;
        const raiz = this.raices()
        let indiceMenor = -1
        let menor = Infinity

        for(let i=0;i<raiz.length;i++){
            if(raiz[i] <= menor){
                menor = raiz[i]
                indiceMenor = i    
            }
        }
        entradaClase = this.clase[indiceMenor]
        return entradaClase
    }
}