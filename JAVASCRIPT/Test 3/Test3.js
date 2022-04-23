function rot13(str) {
  str=str.toUpperCase(); //Because the instruction was all in uppercases
  let arr=str.split(""); //Convert to an array
  let letra = /[A-Z]/;  // only letters from A to Z in uppercase
  for (let i=0;i<arr.length;i++){
    if (letra.test(arr[i])){  // if its true, arr[i] is a letter from A to Z, move 13 spaces in code
      if(arr[i].charCodeAt()<=77){
        arr[i]=String.fromCharCode(arr[i].charCodeAt()+13)  //fromCharCode is the reverse for charCodeAt
      }
      else {
        arr[i]=String.fromCharCode(arr[i].charCodeAt()-90+77)
      }
    }
  }
  return arr.join("");
}
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));
/*
Change ONLY the letter from A to Z.
A = 65, Z=90 . rot 13 moves 13 spaces so A=65+13=78 and Z=90+13+64-90 = 77 cause it starts over 
*/
