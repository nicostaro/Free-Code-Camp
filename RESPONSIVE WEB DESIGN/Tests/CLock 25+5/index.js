
function App() {
  //let fecha = new Date(); //Date es una API interna de JS, al hacer el new, le podés agregar cosas
  
  const [breakLength, setBreakLength] = React.useState(5*60) // lo hago así para hacer más fácil la resta de segundos
  const [sessionLength, setSessionLength] = React.useState(25*60)
  const [whichTimer, setWhichTimer] = React.useState (true) //si es "true" que sea sessión, si es "false", que sea Break 
  const [timerOn, setTimerOn] = React.useState (false) //mientras timerOn sea false, se pueden cambiar las propiedades
  const [time, setTime] = React.useState (sessionLength)
  const bell = document.getElementById("beep")
  React.useEffect(()=>{
    setTime (sessionLength)},[sessionLength])   

    const break_decrement = () =>{ 
       if (breakLength>1*60 && !timerOn){ 
         return setBreakLength(prev=> prev-60)
      }
  }
  const break_increment = () =>{ 
    if (breakLength<60*60  && !timerOn){ 
      return setBreakLength(prev=> prev+60)
   }
  }
  const session_decrement = () =>{ 
    if (sessionLength>1*60  && !timerOn){ 
      return setSessionLength(prev=> prev-60)
   }
  }
  const session_increment = () =>{ 
    if (sessionLength<60*60  && !timerOn){ 
      return setSessionLength(prev=> prev+60)
    }
  }
  const minuteFormat = (number) =>{
    return number/60
  }
  const timerFormat =(tempor)=>{ //al hacerlo así, el temporizador se va a poder usar para el session y para el break
    let minute = Math.floor(tempor/60);
    let second = tempor % 60; //de esta manera la cuenta regresiva se hace mucho más facil
    let temp = ""
    temp += ((minute < 10) ? '0' : '') + minute;
    temp += ((second < 10) ? ':0' : ':') + second;
    
    return temp;     
  };
  const reset = () =>{
    setTimerOn (false);
    setBreakLength(5*60);
    setTime(sessionLength);
    setSessionLength(25*60);    
    setWhichTimer (true)
    document.getElementById("beep").load() //no me tomaba bell, así que lo puse así, así se vuelve a cargar cuando tocas el botón
    
  };
 
  React.useEffect(() => {
    if(timerOn){      
      
      const timerId = setInterval(() => { //hasta que no termine, no me toma el cambio
        setTime((t)=>{
          if (t<=0 && document.getElementById("timer-label").innerHTML=="Session"){
            setWhichTimer (prev => !prev)
            bell.play(); 
            return breakLength  
            // esto lo pongo así por lo siguiente:
            //aunque me esté cambiando t (qué sería time) y whichTimer, hasta que no ponga pausa, no guarda el dato
            // o sea, en el else, puse console.log t y time. Mientras muestra que t baja, time se mantiene igual. CUando pongo pausa time se guarda con el último valor de t
            //me pasa lo mismo con whichTimer, hasta no poner pausa, no me cambia el valor, por eso si como condición del if, pusiera whichTimer==true y en el else if whichTimer==false
            //no me cambiaría nunca al else if porque whichTimer sigue valiendo lo mismo                            
            }          
          else if (t<=0 && document.getElementById("timer-label").innerHTML=="Break"){
            setWhichTimer (prev => !prev) //si acá pongo !whichTimer, no me lo cambia
            bell.play();
            return sessionLength                     
          }          
          else {
            console.log(whichTimer,t,time,sessionLength,breakLength)            
            return t-1

          
          }
        } )
             
      },1000)
     return () => clearInterval(timerId)
      
    }
  }, [timerOn])
  // esta función se aplica cuando cambia lo que está entre corchetes, o sea se aplica cuando cambia "timerOn"
  // en el boton de abajo de id ="start/stop" hice que cuando se clickee, cambie timerOn, o sea, arranque la función.
  // y la función sólo funciona si timerOn=true, entonces cuando vuelvo a clickear, cambia timerOn y la función se pausa
    
  

  return (
    <div id="container" className="center-align "> TEMPORIZADOR
      <div id="container-2">
        <div id="break-label">Break Length</div>
        <div id="session-label">Session Length</div>
        <div className="container-3"> 
          <button className="btn-small grey darken-1" id="break-increment"onClick={break_increment}>
            <i className="material-icons">arrow_upward</i>
          </button>
          <div id="break-length">{minuteFormat(breakLength)}</div>        
          <button className="btn-small grey darken-1" id="break-decrement" onClick={break_decrement}>
            <i className="material-icons">arrow_downward</i>
          </button>
        </div>  
        <div className="container-3">
          <button className="btn-small grey darken-1" id="session-decrement" onClick={session_decrement}>
            <i className="material-icons">arrow_downward</i>
          </button>
          <div id="session-length">{minuteFormat(sessionLength)}</div>
          <button className="btn-small grey darken-1" id="session-increment" onClick={session_increment}>
            <i className="material-icons">arrow_upward</i>
          </button>
      </div>  
        <br></br><br></br>
     </div> 
      <div id="timer-label">{whichTimer? "Session" : "Break"}</div>
      <div id="time-left">{timerFormat(time)}</div>  
      <button className="btn-small green accent-3" id="start_stop" onClick={()=>setTimerOn(!timerOn)} >
      {timerOn ?
        <i id="play-pause" className="material-icons">pause</i> : 
        <i id="play-pause" className="material-icons">play_arrow</i>  
      }
      </button>
      <button className="btn-small deep-orange" id="reset" onClick={reset}>
        <i id="play-pause" className="material-icons">cached</i>
      </button>
      <audio id="beep" src="https://cdn.freesound.org/previews/428/428620_907124-lq.mp3" type="audio/mp3"></audio>
               
    </div>
  
  );
}


ReactDOM.render (<App />, document.getElementById ("root"))
