let clase1 = '',
clase2 = '',
texto1 = '',
texto2 = ''

function exibeCadastro(){
   document.getElementById('classe1').value = clase1.toString().trim() 
   document.getElementById('classe2').value = clase2.toString().trim() 
   
   document.getElementById('texto1').value = texto1.toString().trim() 
   document.getElementById('texto2').value = texto2.toString().trim() 
}

function cadastrar(){
    clase1 = document.getElementById('classe1').value.toString().trim()
    clase2 = document.getElementById('classe2').value.toString().trim()

    texto1 = document.getElementById('texto1').value.toString().trim()
    texto2 = document.getElementById('texto2').value.toString().trim()

    //tokenizacion
    const arr1 = texto1.split(' ')
    const arr2 = texto2.split(' ')

    for(let i=0;i<arr1.length;i++){
        entradas.push(arr1[i].toString().trim())
        clases.push(clase1)
    }
    for(let i=0;i<arr2.length;i++){
        entradas.push(arr2[i].toString().trim())
        clases.push(clase2)
    }

    let linhas = `
    <tr>
        <td>${clase1}</td>
        <td>${texto1}</td>
    </tr>
    <tr>
        <td>${clase2}</td>
        <td>${texto2}</td>
    </tr>
    `

    document.getElementById('linhas').innerHTML = linhas
}

function executar(){
    train({input: entradas, output:clases})

    const entrada = document.getElementById('entrada').value.toString().trim()
    // tokenizacion
    const arrEntrada = entrada.split(' ')
    let txtClases = ''
    for(let i=0;i<arrEntrada.length;i++){
        txtClases += predict(arrEntrada[i]).toString().trim()
    }

    const qtdNone1 = txtClases.split(clase1).length-1
    const qtdNone2 = txtClases.split(clase2).length-1
    console.log({txtClases})
    console.log({clase1,clase2 })
console.log({qtdNone1,qtdNone2 })

let resultado = clase1
    if(qtdNone2 > qtdNone1) resultado = clase2

    document.getElementById('resultado').innerHTML = ` - Clasificacion: ${resultado}`
}