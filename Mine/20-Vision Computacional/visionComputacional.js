function abrir(){
    let preview = document.getElementById('imagen')
    // console.log(preview)
    // console.log(document.querySelector('input[type=file]'))
    const file = document.querySelector('input[type=file]').files[0]
    const reader = new FileReader()

    if(file) reader.readAsDataURL(file); else preview.src = ''

    reader.onloadend = ()=>{
        // console.log(reader)
        preview.src = reader.result
    }

    document.getElementById('resultado').innerText = '...' 
}

function prever(){
    const imagen = document.getElementById('imagen')
    const resultado = document.getElementById('resultado')
    const probabilidad = document.getElementById('probabilidades')

    const classifier = ml5.imageClassifier('MobileNet',()=>{
        resultado.innerText = 'procesando...'
    })

    classifier.predict(imagen,(err,results)=>{
        if(err) console.log(err)
        console.log({results})
        const clase1 = results[0].className
        const clase2 = results[1].className
        const clase3 = results[2].className

        resultado.innerText = `Clasificacion: ${clase1.toUpperCase()} `
    
        const probabilidad1 = parseFloat(results[0].probability*100).toFixed(6)
        const probabilidad2 = parseFloat(results[1].probability*100).toFixed(6)
        const probabilidad3 = parseFloat(results[2].probability*100).toFixed(6)
    
        const r1 = `${clase1}\r\nprobabilidad: ${probabilidad1}%`
        const r2 = `${clase2}\r\nprobabilidad: ${probabilidad2}%`
        const r3 = `${clase3}\r\nprobabilidad: ${probabilidad3}%`
    
        probabilidad.innerHTML = `${r1}\r\n ${r2}\r\n ${r3}\r\n`
    })
}