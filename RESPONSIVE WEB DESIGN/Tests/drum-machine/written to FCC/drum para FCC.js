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

class Maquina extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        teclaPresionada: ""
       };
       this.handleKeyPress = this.handleKeyPress.bind(this);
       this.reproducirAudio = this.reproducirAudio.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
      }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
      }

    handleKeyPress = (e) => {
        if (e.keyCode === this.props.codigo){  //el código de la letra en el teclado
          this.reproducirAudio();         
        }
      };
    
    reproducirAudio () {
        const tag = document.getElementById(this.props.letra);     
        tag.currentTime = 0; // con esto no hay espaciado entre sonidos si toco 2 veces, si no, tenía que esperar 1 segundo        
        tag.play();
        tag.volume = this.props.volumen;
        this.props.teclaPresionada (this.props.letra)
         //teclaPresionada es una función "mostrarNombreLetra", definida abajo, que cambia el state de App "mostrarLetra" al valor que le pongan. En este caso se le pone "this.props.letra" que es el nombre de la letra deifinido abajo
      }
    render(){
      return (    
        <button 
          id={this.props.letra+"a"} 
          className="drum-pad" 
          onClick={this.reproducirAudio}> {this.props.letra}
            <audio 
              id={this.props.letra} 
              src={this.props.src} 
              className="clip">                                  
            </audio> 
        </button>
      )
    }
}

class App extends React.Component {
    constructor (props) {
     super (props);
     this.state = {  
        mostrarLetra: "",
        volumen: 1
     };
     
     this.mostrarNombreletra = this.mostrarNombreletra.bind (this);
     this.cambiarVolumen = this.cambiarVolumen.bind (this);

    }

    mostrarNombreletra (nombre) {
      this.setState ({
        mostrarLetra: nombre
      })
    };
    
    cambiarVolumen = (e) => {
      this.setState({
      volumen: e.target.value   //esto va al onChange del input de abajo. 
      })
    }

    
  render(){
        return (
            <div id="drum-machine">DRUM MACHINE<br/><br/>
              <div id="display">
                {buttons.map((x)=> (
                  <Maquina 
                    letra = {x.letra}  // acá creo un valor que se llama "letra", cuando lo uso arriba en "reproducirAudio", para llamarlo le tengo que poner "this.props.letra"
                    src = {x.src}
                    codigo = {x.codigo}   
                    teclaPresionada = {this.mostrarNombreletra} 
                    volumen = {this.state.volumen} //como quiero que el volumen de las teclas se cambie al reproducir el sonido, le doy un valor en "Maquina" y lo llevo arriba a "ReproducirSonido"                                   
                      /> 
                  )) 
                }

                <p>Volumen</p>
                <input 
                  type="range" 
                  step="0.01" 
                  min="0" 
                  max="1" 
                  value = {this.state.volumen} //empieza con valor 1, que se le dio arriba en el state
                  onChange = {this.cambiarVolumen} // cuando cambia, va a la función "cambiarVolumen" que cambia el state incial

                />
                <br/>
                <p>Sonido Reproducido:{this.state.mostrarLetra}</p>
              </div>
            </div>
        )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));