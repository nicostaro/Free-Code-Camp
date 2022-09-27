import React from "react";
import './App.css';
// falta resolver el tema de muchos signos negativos y el diseño
function App() {
  const [display, setDisplay] = React.useState(0)
  const [output, setOutput] = React.useState("")
  const clear = () =>{
    setDisplay (0)
    setOutput ("")
  };
  const showKey = (key) =>{
    if (output.includes("=")){ 
        setDisplay (key)
      if (key==="+"||key==="-"||key==="*"||key==="/"){
        setOutput (display + key)   //si se terminó la operación y pongo algún operador matemático, sigue
      }
      else {
        setOutput (key)   
       }        
    }
    
    else if (key==="."){
      let operadores =  /["+""*""/""="-]/
      let output2 = output.slice()
      let numbers = output2.split(operadores)
      
        if (numbers[numbers.length-1].includes(".")){
        }
        else if (output.includes("=")){ 
          setDisplay (key)
          setOutput (key)
        }
        else {
          setDisplay (prev=> prev+key)
          setOutput (prev=> prev+key) 
        }

    }

    else if  (output[output.length-1]==="+" && (key==="+"||key==="*"||key==="/")||
              output[output.length-1]==="*" && (key==="+"||key==="*"||key==="/")||
              output[output.length-1]==="/" && (key==="+"||key==="*"||key==="/")){
      setOutput (prev => prev.slice(0,-1)+key)
      setDisplay (key)
    }
    else if  (output[output.length-1]==="-" 
              && (output[output.length-2]==="+"||output[output.length-2]==="*"||output[output.length-2]==="/")
              && (key==="+"||key==="*"||key==="/")){
      setDisplay (key)
      setOutput (prev => prev.slice(0,-2)+key)
    }
    else if (/^0/.test(Number(display)) && key==0){ // o sea, no podés anotar "000000"      
    }
    else if (/^0/.test(Number(display)) && /[1-9]/.test(key)){  
      if (output.length !== 1){
        setDisplay (key)
        setOutput (prev => prev.slice(0,-1)+key)  // si dice 30+0 y toco 2, que diga 30+2 y no 30+02
      }
      else {
        setDisplay (key) //si dice 0 y toco 1, que diga 1  y no 01
        setOutput (key)   
      }    
    }
    else if ( /[0-9]/.test(Number(display)) && output!=="" && (key!="+"&&key!="*"&&key!="/"&&key!="-")){
      setDisplay (prev=> prev+key)
      setOutput (prev=> prev+key) 
    }

   
    else{
      switch (display) {
        case 0: 
          setDisplay (key)
          setOutput (key)        
          break;
        case NaN: 
          setDisplay (key)
          setOutput (key)        
          break;
        
        default: 
          setDisplay (key)
          setOutput (prev=> prev+key)      
          break;
      }
    }
  };
  
  const equals = () =>{
        
        if(output[output.length-1]==="+"||output[output.length-1]==="-"||output[output.length-1]==="*"||output[output.length-1]==="/"){
          setDisplay(NaN)
          setOutput ("")
          
        }
       
        else{           
          setOutput (prev => prev+"="+ eval(output))
          setDisplay (eval(output))
               
        }        
        
  };                 


  return (
    <div id="flex-container">
      <button id="equals" className="flex-item" onClick={equals}>=</button>
      <button id="zero" className="flex-item" onClick={()=> showKey("0")}>0</button>
      <button id="one" className="flex-item" onClick={()=> showKey("1")}>1</button>
      <button id="two" className="flex-item" onClick={()=> showKey("2")}>2</button>
      <button id="three" className="flex-item" onClick={()=> showKey("3")}>3</button>
      <button id="four" className="flex-item" onClick={()=> showKey("4")}>4</button>
      <button id="five" className="flex-item" onClick={()=> showKey("5")}>5</button>
      <button id="six" className="flex-item" onClick={()=> showKey("6")}>6</button>
      <button id="seven" className="flex-item" onClick={()=> showKey("7")}>7</button>
      <button id="eight" className="flex-item" onClick={()=> showKey("8")}>8</button>
      <button id="nine" className="flex-item" onClick={()=> showKey("9")}>9</button>
      <button id="add" className="flex-item" onClick={()=> showKey("+")}>+</button>
      <button id="subtract" className="flex-item" onClick={()=> showKey("-")}>-</button>
      <button id="multiply" className="flex-item" onClick={()=> showKey("*")}>*</button>
      <button id="divide" className="flex-item" onClick={()=> showKey("/")}>/</button>
      <button id="decimal" className="flex-item" onClick={()=> showKey(".")}>.</button>
      <button id="clear" className="flex-item" onClick={clear}>AC</button>
      <div id="display" className="flex-item">{display}</div>    
      <div id="output" className="flex-item">{output}</div>    
    
    
    </div>
  
  );
}




export default App;
