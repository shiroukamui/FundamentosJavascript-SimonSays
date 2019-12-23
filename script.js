
const btnEmpezar = document.getElementById('btnEmpezar')
const tituloNivel = document.getElementById('tituloNivel')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10

class Juego {

    constructor() {
        this.inicializar()
        this.siguienteNivel()
        this.generarSecuencia()
    }

    inicializar() {
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.elegirColor = this.elegirColor.bind(this)
        this.colores = [celeste, violeta, naranja, verde]
        tituloNivel.innerHTML = `Nivel ${this.nivel}`
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(() => Math.floor(Math.random() * 4))
    }

    agregarEventoClick() {
        this.colores.forEach(color => color.addEventListener('click', this.elegirColor))
    }

    removerEventoClick() {
        this.colores.forEach(color => color.removeEventListener('click', this.elegirColor))
    }

    obtenerColordeNumero(numero) {
        let arrayColors = [celeste, violeta, naranja, verde]
        return arrayColors[numero]
    }

    elegirColor(evento) {
        let colorSeleccionado = evento.target
        let colorSecuencia = this.obtenerColordeNumero(this.secuencia[this.subnivel])
        this.parpadearColor(colorSeleccionado)
        if (colorSeleccionado.id === colorSecuencia.id) {
            this.subnivel++
            this.subirNivel()
        } else {
            swal('Platzi', 'Lo siento, has perdido!!!', 'error')
            this.reiniciarJuego()
        }
    }

    playAudio(numeroAudio) {
        let audio = new Audio(`assets/${numeroAudio}.wav`)
        audio.play()
    }

    subirNivel() {
        if (this.subnivel === this.nivel) {
            this.nivel++
            tituloNivel.innerHTML = `Nivel ${this.nivel}`
            this.evaluarGanador()
        }
    }

    evaluarGanador() {
        if (ULTIMO_NIVEL < this.nivel) {
            swal('Platzi', 'Felicitaciones has ganado!!!', 'success')
            this.reiniciarJuego()
        } else {
            this.siguienteNivel()
        }
    }

    parpadearColor(color) {
        this.playAudio(color.id)
        color.classList.add('light')
        setTimeout(() => {
            color.classList.remove('light')
        }, 600)
    }

    iluminarSecuencia() {
        for (let index = 0; index < this.nivel; index++) {
            let color = this.obtenerColordeNumero(this.secuencia[index])
            setTimeout(() => this.parpadearColor(color), 800 * index)
        }
    }

    siguienteNivel() {
        this.subnivel = 0
        this.agregarEventoClick()
        setTimeout(() => this.iluminarSecuencia(), 1500)
    }

    reiniciarJuego() {
        this.removerEventoClick()
        btnEmpezar.classList.remove('hide')
        tituloNivel.innerHTML = ''
    }
}

// Ejecucion App
function empezarJuego() {
    let juego = new Juego()
}
