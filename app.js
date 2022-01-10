const mostrar = () => {
    var startSensor = performance.now()
    var sensor = document.getElementById('sensor').value
    console.log(sensor);
    var endSensor = performance.now()
    console.log('Sensor: ' + myRound(endSensor - startSensor, 3) + ' ms')
    const time = parseInt(document.getElementById('timeResp').value)
    const max = parseFloat(document.getElementById('max').value)
    const min = parseFloat(document.getElementById('min').value)
    document.getElementById('temperatura').innerText = sensor + 'º'
    sensor = parseFloat(sensor)
    if (sensor >= max) {
        foco('foco3')
        var start = performance.now();
        ventilador('imgr1')
        var end = performance.now();
        calentador('calentador2')

    } else if (sensor <= min) {
        foco('foco1')
        ventilador('')
        calentador('calentador1')

    } else {
        foco('foco2')
        ventilador('imgr')
        calentador('calentador2')
    }

    var timeVentilador = end - start;
    console.log('Ventilador: ' + (myRound(timeVentilador, 3)) + ' ms');
    console.log('Execution time: ' + (0.100 - myRound(timeVentilador, 3)) + ' ms');

}

const ventilador = (estado) => {
    document.getElementById('ventilador').className = 'figure-img img-fluid rounded ' + estado
}

const foco = (estado) => {
    document.getElementById('foco').src = './img/' + estado + '.png'
}

const calentador = (estado) => {
    if (estado === 'calentador1')
        document.getElementById('calentador').className = 'figure-img img-fluid rounded calentador'
    else
        document.getElementById('calentador').className = 'figure-img img-fluid rounded'

    document.getElementById('calentador').src = './img/' + estado + '.png'
}

const myRound = (num, dec) => {
    var exp = Math.pow(10, dec || 2); // 2 decimales por defecto
    return parseInt(num * exp, 10) / exp;
}