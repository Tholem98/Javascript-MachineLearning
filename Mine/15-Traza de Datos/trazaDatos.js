function plot(type='scatter'){
    type = type.toString().toLowerCase().trim()

    let trace={}
    if(type=='pie'){
        trace={
            values:[100,200,300,400],
            labels:['titulo1','titulo2','titulo3','titulo4'],
            type,
        }
    }else if(type == 'bubble'){
        trace={
            x=[1,2,3,4],
            y=[1,2,3,4],
            marker:{
                size:[10,20,30,40],
            }
        }
    }else{
        trace={
            x:[1,2,3,4],
            y:[1,2,3,4],
            type,
        }
    }

    if((type=='scatter')||(type=='bubble')) trace.mode = 'markers'
    if(type=='lines') trace.type = 'scatter'

    const data = [trace]
}