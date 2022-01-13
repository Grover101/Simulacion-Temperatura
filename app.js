const sensor = () => {
    var startSensor = performance.now()
    var sensor = document.getElementById('sensor').value
    console.log(sensor)
    var endSensor = performance.now()
    const max = parseFloat(document.getElementById('max').value)
    const min = parseFloat(document.getElementById('min').value)
    document.getElementById('temperatura').innerText = sensor + 'º'
    let notificacion = 'Temp normal'
    let estadoVenti = 'Apagado'
    let velocidadVenti = 'Normal'
    let estadoCale = 'Apagado'
    let intensidadCale = 'Sin intensidad'
    let focus = 'Amarillo'
    sensor = parseFloat(sensor)
    if (sensor >= max) {
        foco('foco3')
        var startVentilador = performance.now()
        ventilador('imgr1')
        console.log(sensor)
        var endVentilador = performance.now()

        notificacion = 'Hace calor'
        estadoVenti = 'Encendido'
        calentador('calentador2')
        velocidadVenti = 'Maxima'
        focus = 'Rojo'


    } else if (sensor <= min) {
        foco('foco1')
        ventilador('')
        var startCalentador = performance.now()
        if (sensor <= 5) {
            calentador('calentador1', '1')
            intensidadCale = 'Alta'
        } else {
            calentador('calentador1')
        }
        var endCalentador = performance.now()

        notificacion = 'Hace frio'
        estadoCale = 'Encendido'
        velocidadVenti = 'Sin Velocidad'
        intensidadCale = 'Normal'
        focus = 'Naranja'
    } else {
        foco('foco2')
        var startVentilador = performance.now()
        ventilador('imgr')
        console.log(sensor)
        var endVentilador = performance.now()
        calentador('calentador2')
        estadoVenti = 'Encendido'
    }

    console.log('Sensor: ' + myRound(endSensor - startSensor, 3) + ' ms')
    console.log('Ventilador: ' + myRound(endVentilador - startVentilador, 3) + ' ms')
    console.log('Calentador: ' + myRound(endCalentador - startCalentador, 3) + ' ms')
    // console.log('Execution time: ' + (0.100 - myRound(endVentilador - startVentilador, 3)) + ' ms')
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear()
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
    const content = `<li class="list-group-item">
              <div class="row">
                <div class="col-6">
                  <span>Fecha: ${fecha}</span>
                </div>
                <div class="col-6">
                  <span>Hora: ${hora}</span>
                </div>
              </div>
              <hr />
              <p><b>Foco: </b>${focus}</p>
              <p><b>Sensor</b></p>
              <div class="row">
                <p>Grados: ${sensor}º</p>
                <p>Notificacion: ${notificacion}</p>
                <p>Tiemp. ejecucion: ${myRound(endSensor - startSensor, 3)}ms</p>
              </div>
              <p><b>Ventilador</b></p>
              <div class="row">
                <p>Velocidad: ${velocidadVenti}</p>
                <p>Estado: ${estadoVenti}</p>
                <p>Tiemp. ejecucion: ${endVentilador ? myRound(endVentilador - startVentilador, 3) + 'ms' : 'No hay datos'}</p>
              </div >
              <p><b>Calentador</b></p>
              <div class="row">
                <p>Intensidad: ${intensidadCale}</p>
                <p>Estado: ${estadoCale}</p>
                <p>Tiemp. ejecucion: ${endCalentador ? myRound(endCalentador - startCalentador, 3) + 'ms' : 'No hay datos'}</p>
              </div>
            </li > `
    resultados(content)

}

const ventilador = (estado) => {
    document.getElementById('ventilador').className = 'figure-img img-fluid rounded ' + estado
}

const foco = (estado) => {
    document.getElementById('foco').src = './img/' + estado + '.png'
}

const calentador = (estado, cal = '') => {
    if (estado === 'calentador1')
        document.getElementById('calentador').className = 'figure-img img-fluid rounded calentador' + cal
    else
        document.getElementById('calentador').className = 'figure-img img-fluid rounded'

    document.getElementById('calentador').src = './img/' + estado + '.png'
}

const myRound = (num, dec) => {
    var exp = Math.pow(10, dec || 2)
    return parseInt(num * exp, 10) / exp
}

const resultados = (content) => {
    document.getElementById('resultados').innerHTML += `${content} `
    var element = document.getElementById('resultados');
    element.scrollTop = element.scrollHeight - element.clientHeight
}

const simulacion = (tempo) => {
    console.log('tiempo: ', tempo)
    var contador = document.getElementById("sensor");
    contador.value = (Math.floor(Math.random() * (50 * Math.pow(10, 1))) + 0) / Math.pow(10, 1)
    contador.addEventListener('change', sensor())
    cont += 1;
}

clear = null
var time = parseInt(document.getElementById('timeResp').value)
document.getElementById('timeResp').addEventListener('change', () => {
    clearInterval(clear)
    clear = null
    const time = parseInt(document.getElementById('timeResp').value)
    clear = setInterval(`simulacion(${time * 1000})`, time * 1000)
    console.log('set: ', clear);
})

document.getElementById('sensor').addEventListener('change', () => {
    sensor()
})


