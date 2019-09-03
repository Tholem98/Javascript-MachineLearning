function prepararCadastro(){
    document.getElementById('eixoX').value = ''
    document.getElementById('eixoY').value = ''
    document.getElementById('classe').value = ''
}

function cadastrar(){
    eixoX.push(Number(document.getElementById('eixoX').value))
    eixoY.push(Number(document.getElementById('eixoY').value))
    clase.push((document.getElementById('classe').value))

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
}

function retornaClasse(){
    train({x:eixoX, y:eixoY, clase: clase})
    const entradaX = Number(document.getElementById('entradaX').value)
    const entradaY = Number(document.getElementById('entradaY').value)
    const result = predict(entradaX,entradaY)
    document.getElementById('entradaC').value = result
}