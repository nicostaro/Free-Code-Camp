function telephoneCheck(str) {
  let arr= str.split("");
  let arrnum=[];
  let arrnum2=[];
  let arrnum3=[];
  let number = /[0-9]/; /* or this, that means the same  /\d/  */
  for (let i=0;i<arr.length;i++){
    if (number.test(arr[i])){
      arrnum.push(arr[i]);     
    }  
  }
  if ((arrnum.length==11 && arrnum[0]==1 && arrnum[0]==arr[0]) || arrnum.length==10){
    
  } else {return false};
  let number2=/[^0-9()-\s]/; /*only symbols that the str can have (\s its blank space), else its false*/
  for (let i=0;i<arr.length;i++){
    if (number2.test(arr[i])){
       arrnum2.push(arr[i]);     
    }
    else {arrnum3.push(arr[i]);}
  }
  
  let count=0
  for (let j=0;j<arrnum3.length;j++){
    if(arrnum3[j]=="-"){
      count++
    }
    
  }
   if (count>=3){return false;} //i put this because i guess they cant have more than 2 "-"
  if (arrnum2.length!==0){
      return false; // if its different to cero, it means it has other symbols, so it will be false
    }    
  let lastchance=arrnum3.join("").replace(/[-\s]/g,""); // only keep () and numbers to se if () are ok
  if ((arrnum.length==11 && lastchance.length==13 && lastchance[1]=="(" && lastchance[5]==")") ||(arrnum.length==10 && lastchance.length==12 && lastchance[0]=="(" && lastchance[4]==")")){
      return true;
    }
  else if (lastchance.length!=10&&lastchance.length!=11){
      return false;
    }
  else if(isNaN(lastchance)==true){ //if its not a number == true, it means its not a number. At this moment can be a number like 555555555 o number + "(" or number + ")"
      return false;

    }
  return true;
}
console.log(telephoneCheck("555-55 5-5555"))
console.log(telephoneCheck("1 555-555-5555"))
console.log(telephoneCheck("1 (555) 555-5555"))
console.log(telephoneCheck("(555)555?-5555"))
console.log(telephoneCheck("1 555)555-5555"))
console.log(telephoneCheck("-1 (757) 622-7382"))
console.log(telephoneCheck("55 55-55-555-5"));

///THE TEST IS COMPLETE AND I PASSED BUT ITS NOT GOOD. I ONLY DID IT THIS WAY BECAUSE I REALLY DONT UNDERSTAND WHAT IS A GOOD TELEPHONE NUMBER
/*
Posibles combinaciones
555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
1 (555) 555 5555
*/