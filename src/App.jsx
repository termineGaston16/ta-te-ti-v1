import { useState } from 'react'
import './App.css'
import Casillero from './componentes/Casillero'
import { turno } from './js/constans.js'
import { verificarGanador } from "./js/logica.js"
import { verificarEmpate } from "./js/logica.js"
import Botones from './elementos/Botones.jsx'
import PlantillaGanador from './componentes/PlantillaGanador.jsx'


function App() {

  /* ------------------------------------ */
  /* determinar el turno */
  const [turnoActual, setTurno] = useState(() => {

    /* que lo traiga del local y si no lo encuentra que se coloque por defecto */
    const turnoDelLocal = window.localStorage.getItem("turno")
    if (turnoDelLocal) return window.localStorage.getItem("turno");
    return turno.x;
  });

  /* ------------------------------------ */
  /* determinar el casillero */
  const [tableroActual, setTableroActual] = useState(() => {

    /* que lo traiga del local y si no lo encuentra que se coloque por defecto */
    const tableroDelLocal = window.localStorage.getItem("tablero");
    if (tableroDelLocal) return JSON.parse(tableroDelLocal);
    return Array(9).fill(null);
  });

  const [finalizarPartida, setFinalizarPartida] = useState(null) // null es sin terminar, false es empate.

  /* ------------------------------------ */
  /* actualizar casillero */
  const actualizarCasillero = (index) => {

    /* marcar casillero y actualizar el tablero */
    /*verificamos si ese casillero ya está marcado */
    if (tableroActual[index]) return;

    const nuevoTablero = [...tableroActual]
    nuevoTablero[index] = turnoActual;
    setTableroActual(nuevoTablero)

    /* verificamos si hay ganador o hay empate */
    const hayGanador = verificarGanador(nuevoTablero)
    if (hayGanador) {
      setFinalizarPartida(hayGanador)
    } else if (verificarEmpate(nuevoTablero)) {
      setFinalizarPartida(false)
    }

    /* cambiar turno */
    const nuevoTurno = turnoActual === turno.x ? turno.o : turno.x;
    setTurno(nuevoTurno)
  }

  /* ------------------------------------ */
  /* Reset Game */
  const resetGame = () => {
    setTurno(turno.x)
    setTableroActual(Array(9).fill(null))
    setFinalizarPartida(null)

    window.localStorage.removeItem('tablero')
    window.localStorage.removeItem('turno')
  }

  /* ------------------------------------ */
  /* Save Game */
  const saveGame = () => {
    window.localStorage.setItem('tablero', JSON.stringify(tableroActual))
    window.localStorage.setItem('turno', turnoActual)
  }


  return (
    <>
      <main className='board'>
        <h1>TA — TE — TI</h1>

        <header>
          <p>Turno de : {turnoActual}.</p>
          <Botones textBtn={"Save Game"} funcionClick={saveGame} />
          <Botones textBtn={"Reset Game"} funcionClick={resetGame} />
        </header>

        <section className='game'>
          {
            tableroActual.map((_, index) => {
              return (
                <Casillero index={index}
                  key={index}
                  finalizarPartida={finalizarPartida}
                  actualizarCasillero={actualizarCasillero}>
                  {tableroActual[index]}
                </Casillero>
              )
            })
          }
        </section>

        <PlantillaGanador ganador={finalizarPartida}>
          <Botones textBtn={"Reset Game"} funcionClick={resetGame} />
        </PlantillaGanador>

      </main>
    </>
  )
}

export default App
