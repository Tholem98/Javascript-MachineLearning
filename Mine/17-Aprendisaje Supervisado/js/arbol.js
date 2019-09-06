document.getElementById('si').checked = true
let lluvia = 'si'

function setLluvia(value=''){
    lluvia = value.toString().toLowerCase().trim()
}

function cadastrar(){
    eixoX.push((document.getElementById('tiempo').value.toString().trim()))
    eixoY.push((document.getElementById('unidad').value.toString().trim()))
    clase.push(lluvia.toUpperCase())

    let linhas = ''
    for(let i=0;i<eixoX.length;i++){
        linhas += 
        `<tr>
            <td>${eixoX[i]}</td>
            <td>${eixoY[i]}</td>
            <td>${clase[i]}</td>
        </tr>
        `
    }

    document.getElementById('linhas').innerHTML = linhas
    opcoesSelect()
}

function opcoesSelect(){
    const arrayOpcoesX = eliminaDuplicados(eixoX)
    const arrayOpcoesY = eliminaDuplicados(eixoY)

    let opcoesX = `<option value=""></option>`
    let opcoesY = `<option value=""></option>`
    
    let laco = []
    if(arrayOpcoesX.length > arrayOpcoesY.length) laco = arrayOpcoesX
    else laco = arrayOpcoesY

    for(let i=0;i<laco.length;i++){
        if(arrayOpcoesX[i] != undefined){
            opcoesX += `<option value="${arrayOpcoesX[i]}">${arrayOpcoesX[i]}</option>`
        }
        if(arrayOpcoesY[i] != undefined){
            opcoesY += `<option value="${arrayOpcoesY[i]}">${arrayOpcoesY[i]}</option>`
        }
    }

    document.getElementById('selTiempo').innerHTML = opcoesX
    document.getElementById('selUnidad').innerHTML = opcoesY

}

function retornaClasse(){
    train({x:eixoX, y:eixoY, clase: clase})
    const entradaX = (document.getElementById('selTiempo').value.toString().trim())
    const entradaY = (document.getElementById('selUnidad').value.toString().trim())
    const result = predict(entradaX,entradaY)
    document.getElementById('selLluvia').value = result
}