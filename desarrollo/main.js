import utils from "./utils";

let nivel       = 1,
    operacion   = "+",
    setActivado = false,
    operadores  = ["/", "*", "-", "+"];
    window.val = "";
    window.counter = 0;
    window.resultado = 0;

let presionaTecla = opc =>
{
    //Saber si se ha presionado la opción de SET...
    if(opc.toLowerCase() === "set" || setActivado)
    {
        //Saber si se ha presionado "go"...
        if(opc.toLowerCase() !== "go") 
        {
            //Imprimir las opciones...
            if(utils.isNumber(opc))
            {
                //Saber si el número está en un nivel de 1 a 5...
                if(Number(opc) >= 1 && Number(opc) <= 5)
                {
                    nivel = Number(opc);
                }
            }
            else
            {
                for(let i = 0; i < operadores.length; i++)
                {
                    if(opc === operadores[i])
                    {
                        operacion = operadores[i];
                        break;
                    }
                }
            }
            utils.accesoDOM("lcd").innerHTML = `L${nivel}&nbsp;&nbsp;OP&nbsp;${operacion}`;
            setActivado = true;
        }
        else //jmeter
        {
            setActivado = false;
            utils.accesoDOM("lcd").innerHTML = "";
            sendOptions(nivel,operacion);
        }
    }
    else
    {
        if(utils.isNumber(opc))
        {   
            val = val.concat(opc);
            utils.accesoDOM("lcd").innerHTML += opc;
            if(eval(val) === eval(resultado)){
               counter++;
                sendOptions(nivel,operacion);
                resultado = 0;
            } else {

            }
        }
            
    }
};

let crearBotones = () =>
{
    let posicion = {
                        left : 66,
                        bottom : 221
                   };

    let opciones     = ["set", "0", "go"],
        inciaNumero = 7;
    for(let i = 0; i < 4; i++)
    {
        for(let c = 0; c < 4; c++)
        {
            let data = c <= 2 ?
                       (inciaNumero > 0 ? (inciaNumero + c) : opciones[c])
                       : operadores[i];
            let style = `left: ${posicion.left + (c * 53)}px;
                         bottom: ${posicion.bottom - (i * 62)}px;`;
            let elementoDIV = `<div class = "tecla" style = "${style}" data = ${data} id = "${i}_${c}"></div>`;
            utils.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
            utils.accesoDOM(`${i}_${c}`).addEventListener('click', event =>
            {
                let valor = utils.accesoDOM(event.target.id).getAttribute("data");
                presionaTecla(valor)
            });
        }
        inciaNumero -= 3;
    }
};
crearBotones();

let sendOptions = (nivel,operacion) => {
  
    window.valorMaximo = 9;
    if(nivel === 1) {
      returnRandom(valorMaximo,operacion);
    } else if (nivel === 2) {
        returnRandom(20,operacion);
    } else if(nivel === 3) {
      returnRandom(30,operacion);
    } else if(nivel === 2) {
      returnRandom(40,operacion);
    } else {
        returnRandom(50,operacion);
    }    
}

let returnRandom = (value,operador) => {
        let random1 = Math.floor(Math.random() *(value-valorMaximo+1)+valorMaximo);
        let random2 = Math.floor(Math.random() *(value-valorMaximo+1)+valorMaximo);
        resultado = `${random1}${operador}${random2}`;
        console.log(resultado);
            utils.accesoDOM("lcd").innerHTML = "";
            utils.accesoDOM("lcd").innerHTML = `${random1}&nbsp;${operador}&nbsp;${random2} : `;
        return {random1: random1, random2: random2};
}
