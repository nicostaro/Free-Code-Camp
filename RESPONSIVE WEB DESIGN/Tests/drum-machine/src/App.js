import React from "react";
import "./App.css"

const buttons= [
  {
    letra: "Q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    codigo: 81,
    texto: "Sonido 1"
    
  },
  {
    letra: "W",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    codigo: 87,
    texto: "Sonido 2"
  },
  {
    letra: "E",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    codigo: 69,
    texto: "Sonido 3"
  },
  {
    letra: "A",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    codigo: 65,
    texto: "Sonido 4"
  },
  {
    letra: "S",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    codigo: 83,
    texto: "Sonido 5"
  },
  {
    letra: "D",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    codigo: 68,
    texto: "Sonido 6"
  },
  {
    letra: "Z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    codigo: 90,
    texto: "Sonido 7"
  },
  {
    letra: "X",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    codigo: 88,
    texto: "Sonido 8"
  },
  {
    letra: "C",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    codigo: 67,
    texto: "Sonido 9"
  }
];

function Maquina ({x, volumen, setGrabar}) {

  
  React.useEffect (()=>{
    document.addEventListener ("keydown",handleKeyPress)
    return()=>{ 
    document.removeEventListener ("keydown",handleKeyPress) // entiendo que hay que removerlo, pero funciona igual si no se hace
    }
  },[]);
  
  const handleKeyPress = (e) => {
    if (e.keyCode === x.codigo){  //el código de la letra en el teclado
      reproducirAudio();
     
    }
  };


  function reproducirAudio () {
    const tag = document.getElementById(x.letra); //x.letra es el Id que le puse a cada elemento <audio> de más abajo    
    tag.currentTime = 0; // con esto no hay espaciado entre sonidos si toco 2 veces, si no, tenía que esperar 1 segundo
    tag.volume = volumen;
    tag.play();
    setGrabar( prev => x.texto);  // hace que cada vez que toco una tecla la funcion "grabar" se convierta en x.texto, o sea, el texto
  }
  
  return (
    
      <button id={x.letra+"a"} className="drum-pad" onClick={reproducirAudio}>{x.letra}
        <audio id={x.letra} src={x.src} className="clip">                                  
        </audio> 
      </button>
    
  )
};


 

function App() {
  const [volumen, setVolumen] = React.useState(1); //esta es una función típica de React de state (volumen) y setState(setVolumen), lo puse el stado inicial "50"
  const [grabar, setGrabar] = React.useState ("");
  return (
    <div id="drum-machine">DRUM MACHINE<br/><br/>
      <div id="display">
      {buttons.map((x)=> (
        <Maquina x={x} volumen={volumen} setGrabar={setGrabar} /> //si no ponía el x={x}, volumen={volumen} no podía accederlo en las propiedades de "maquina" de arriba
      )) }

        <p>Volumen</p>
        <input 
          type="range" 
          step="0.01" 
          min="0" 
          max="1" 
          value={volumen} 
          onChange={(e) => setVolumen(e.target.value)} // para poder cambiar el volumen
        />
        <br/>
        <p>Sonido Reproducido : {grabar}</p>
      </div>
    </div>

    
  );
}

export default App;

