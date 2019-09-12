module.exports = class CSV{
    constructor(config={}){
        this.input=['input']
        this.output=['output']
        this.separador=','
        this.title=true

        if(config.input) this.input=config.input
        if(config.output) this.output=config.output
        if(config.separador) this.separador=config.separador
        if(config.title) this.title=config.title
    
        this.fs = require('fs')
    }

    csvToJsonIO(path='./data.csv'){
        let params = {}
        path = path.toString().trim()
        let data = this.fs.readFileSync(path,'utf8')
        data = data.toString().trim()
        const lines = data.split('\r\n')

        if(this.title) {
            let qtdInputs = 1
            let qtdOutputs = 1

            if(this.input.length > 1){
                qtdInputs=0
                for(let i=0;i<this.input.length;i++){
                    qtdInputs += lines[0].split(this.input[i].length-1)

                }
            }else{
                qtdInputs = lines[0].split(this.input[0]).length-1
            }

            if(this.output.length > 1){
                qtdOutputs = 0
                for(let i=0;i<this.output.length;i++){
                    qtdOutputs += lines[0].split(this.output[i].length-1)
                }
            }else{
                qtdOutputs = lines[0].split(this.output[0]).length-1
            }

            let input = []
            let output = []
            for(let line=1;line<lines.length;line++){
                const cells = lines[line].split(this.separador)
                if(qtdInputs>1){
                    let arrInput = []
                    for(let i=0;i<qtdInputs;i++){
                        let value = Number(cells[i])
                        if(isNaN(value)) value = cells[i]+''.trim()
                        if(value!='undefined') arrInput.push(value)
                    }
                    input.push(arrInput)
                }else{
                    let value = 0
                    if(cells[0]) value = Number(cells[0])
                    if(isNaN(value)) value = cells[0]
                    if(value!='undefined') input.push(value)
                }

                if(qtdOutputs>1){
                    let arrOutputs = []
                    for(let i=qtdInputs;i<qtdInputs+qtdOutputs;i++){
                        let value = Number(cells[i])
                        if(isNaN(value)) value = cells[i]+''.trim()
                        if(value!='undefined') arrOutputs.push(value)
                    }
                    output.push(arrOutputs)
                }else{
                    let value = 0
                    if(cells[qtdInputs]) value = Number(cells[qtdInputs])
                    if(isNaN(value)) value = cells[qtdInputs]+''.trim()
                    if(value!='undefined') output.push(value)
                }
            }

            params.input = input
            params.output = output
        }else{
            let input = []
            let output = []
            for(let line=0;line<lines.length;line++){
                const cells = lines[line].split(this.separador)
                let value = 0
                if(cells[0]) value = Number(cells[0])
                if(isNaN(value)) value = cells[0]+''.trim()
                if(value!='undefined') input.push(value)

                value = 0
                if(cells[1]) value = Number(cells[1])
                if(isNaN(value)) value = cells[1]+''.trim()
                if(value!='undefined') output.push(value)
            }
            params.input = input
            params.output = output
        }
        return params
    }

    csvToJsonXY(path='./data.csv'){
        let params = {}
        path = path.toString().trim()
        let data = this.fs.readFileSync(path,'utf8')
        data = data.toString().trim()
        const lines = data.split('\r\n')


        let start = 0
        if(this.title) start = 1
        
        let x =[]
        let y = []
        let c = []
        for(let line=start;line<lines.length;line++){
            const cells = lines[line].split(this.separador)

            let value = 0
            if(cells[0]) value = Number(cells[0])
            if(isNaN(value)) value = cells[0]+''.trim()
            if(value!='undefined') x.push(value)

            value = 0
            if(cells[1]) value = Number(cells[1])
            if(isNaN(value)) value = cells[1]+''.trim()
            if(value!='undefined') y.push(value)


            value = Number(cells[2])
            if(isNaN(value)) value = cells[2]+''.trim()
            if(value!='undefined') c.push(value)
        }

        params.x = x
        params.y = y
        if(c.length > 0) params.class = c

        return params
    }

    csvToArray(path='./data.csv'){
        path = path.toString().trim()
        let data = this.fs.readFileSync(path,'utf8')
        data = data.toString().trim()
        const lines = data.split('\r\n')

        let start = 0
        if(this.title) start = 1

        let qtdInputs = 1
        let qtdOutputs = 1

        if(this.input.length > 1){
            qtdInputs=0
            for(let i=0;i<this.input.length;i++){
                qtdInputs += lines[0].split(this.input[i].length-1)

            }
        }else{
            qtdInputs = lines[0].split(this.input[0]).length-1
        }

        if(this.output.length > 1){
            qtdOutputs = 0
            for(let i=0;i<this.output.length;i++){
                qtdOutputs += lines[0].split(this.output[i].length-1)
            }
        }else{
            qtdOutputs = lines[0].split(this.output[0]).length-1
        }

        let arrResult = []
        for(let line=start;line<lines.length;line++){
            let input = []
            let output = []
            const cells = lines[line].split(this.separador)

            for(let i=0;i<qtdInputs;i++){
                let value = Number(cells[i])
                if(isNaN(value)) value = cells[i]+''.trim()
                if(value!='undefined') input.push(value)
            }
            
            for(let i=qtdInputs;i<qtdInputs+qtdOutputs;i++){
                let value = Number(cells[i])
                if(isNaN(value)) value = cells[i]+''.trim()
                if(value!='undefined') output.push(value)
            }

            let params = {}
            params.input = input
            params.output = output
            arrResult.push(params)
        }

        return arrResult
    }
    
    insertOutput(path='./data.csv',outputs=[]){
        path = path.toString().trim()
        let data = this.fs.readFileSync(path,'utf8')
        data = data.toString().trim()
        const lines = data.split('\r\n')

        const strTitles = lines[0]+''.trim()
        const titles = strTitles.split(this.separador)
        let arrIndex = []
        const arrOutputs = this.output
        for(let i=0;i<titles.length;i++){
            let columnName = titles[i]+''.trim()
            if(columnName!='undefined'){
                for(let j=0;j<arrOutputs;j++){
                    const outputName = arrOutputs[j]+''.trim()
                    if(columnName==outputName) arrIndex.push(i)
                }
            }
        }

        let outputLine = 0
        let strCSV = strTitles+'\r\n'
        for(let line=1;line<lines.length;line++){
            let outputCell = 0
            let cells = lines[line].split(this.separador)
            for(let c=0;c<cells.length;c++){
                if(arrIndex.indexOf(c)>-1){
                    const cell = cells[c]+''.trim()
                    if(cell.length<=0){
                        if(outputs[outputLine][outputCell]!=undefined){
                            cells[c] = outputs[outputLine][outputCell]
                            outputCell++
                        }else{
                            cells[c]=outputs[outputLine][outputCell-1]
                            if(cells[c]==undefined)
                                cells[c]=outputs[outputLine-1][outputCell]
                            if(cells[c]==undefined)
                            cells[c]=outputs[outputLine-1][outputCell-1]
                        }
                    }
                }
            }
            if(outputCell>0) outputLine++
            strCSV += cells.toString().trim().replace(/,/g, this.separador)+'\r\n'
        }
        this.fs.writeFileSync(path,strCSV.trim())
    }
}


/*
const csv = new CSV()
// let result = csv.csvToJsonXY('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/decision-tree.csv')
// let result = csv.csvToJsonXY('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/k-means.csv')
// let result = csv.csvToJsonXY('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/k-nearest-neighbors.csv')
// let result = csv.csvToJsonIO('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/naive-bayes.csv')
let result = csv.csvToArray('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/perceptron.csv')
// let result = csv.csvToJsonIO('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/regressao-multivariada.csv')
// let result = csv.csvToJsonIO('../../Portugues/Recursos/13-Manipulacao-de-arquivos-csv/regressao-simples.csv')


console.log(result)*/