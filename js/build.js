(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nivel = 1,
    operacion = "+",
    setActivado = false,
    operadores = ["/", "*", "-", "+"];
window.val = "";
window.counter = 0;
window.resultado = 0;

var presionaTecla = function presionaTecla(opc) {
    //Saber si se ha presionado la opción de SET...
    if (opc.toLowerCase() === "set" || setActivado) {
        //Saber si se ha presionado "go"...
        if (opc.toLowerCase() !== "go") {
            //Imprimir las opciones...
            if (_utils2.default.isNumber(opc)) {
                //Saber si el número está en un nivel de 1 a 5...
                if (Number(opc) >= 1 && Number(opc) <= 5) {
                    nivel = Number(opc);
                }
            } else {
                for (var i = 0; i < operadores.length; i++) {
                    if (opc === operadores[i]) {
                        operacion = operadores[i];
                        break;
                    }
                }
            }
            _utils2.default.accesoDOM("lcd").innerHTML = "L" + nivel + "&nbsp;&nbsp;OP&nbsp;" + operacion;
            setActivado = true;
        } else //jmeter
            {
                setActivado = false;
                _utils2.default.accesoDOM("lcd").innerHTML = "";
                sendOptions(nivel, operacion);
            }
    } else {
        if (_utils2.default.isNumber(opc)) {
            val = val.concat(opc);
            _utils2.default.accesoDOM("lcd").innerHTML += opc;
            if (eval(val) === eval(resultado)) {
                counter++;
                sendOptions(nivel, operacion);
                resultado = 0;
            } else {}
        }
    }
};

var crearBotones = function crearBotones() {
    var posicion = {
        left: 66,
        bottom: 221
    };

    var opciones = ["set", "0", "go"],
        inciaNumero = 7;
    for (var i = 0; i < 4; i++) {
        for (var c = 0; c < 4; c++) {
            var data = c <= 2 ? inciaNumero > 0 ? inciaNumero + c : opciones[c] : operadores[i];
            var style = "left: " + (posicion.left + c * 53) + "px;\n                         bottom: " + (posicion.bottom - i * 62) + "px;";
            var elementoDIV = "<div class = \"tecla\" style = \"" + style + "\" data = " + data + " id = \"" + i + "_" + c + "\"></div>";
            _utils2.default.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
            _utils2.default.accesoDOM(i + "_" + c).addEventListener('click', function (event) {
                var valor = _utils2.default.accesoDOM(event.target.id).getAttribute("data");
                presionaTecla(valor);
            });
        }
        inciaNumero -= 3;
    }
};
crearBotones();

var sendOptions = function sendOptions(nivel, operacion) {

    window.valorMaximo = 9;
    if (nivel === 1) {
        returnRandom(valorMaximo, operacion);
    } else if (nivel === 2) {
        returnRandom(20, operacion);
    } else if (nivel === 3) {
        returnRandom(30, operacion);
    } else if (nivel === 2) {
        returnRandom(40, operacion);
    } else {
        returnRandom(50, operacion);
    }
};

var returnRandom = function returnRandom(value, operador) {
    var random1 = Math.floor(Math.random() * (value - valorMaximo + 1) + valorMaximo);
    var random2 = Math.floor(Math.random() * (value - valorMaximo + 1) + valorMaximo);
    resultado = "" + random1 + operador + random2;
    console.log(resultado);
    _utils2.default.accesoDOM("lcd").innerHTML = "";
    _utils2.default.accesoDOM("lcd").innerHTML = random1 + "&nbsp;" + operador + "&nbsp;" + random2 + " : ";
    return { random1: random1, random2: random2 };
};

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

var accesoDOM = function accesoDOM(param) {
  return document.getElementById(param);
};
var isNumber = function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
module.exports = { accesoDOM: accesoDOM, isNumber: isNumber };

},{}]},{},[1]);
