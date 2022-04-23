function palindrome(str) {
    let str2= str.replace(/[^\w\s]/gi, "").replace(/[\_]/,"").replace(/ /g, "").toLowerCase(); /*el segundo replace es porque no le pude sacar el guión bajo en uno solo. Y el tercero es para sacar los espacios en blanco */
    let count=0;
    for (let i=0; i<str2.length;i++){
      if (str2[i]==str2[str2.length-1-i]){
        count +=1
      } 
      
    } 
    if (count==str2.length){
      return true;
    } else {return false};
  }
  
  console.log(palindrome("0_0 (: /-\ :) 0-0"));
  console.log(palindrome(" ey*e_"));
 
  /*La consugna es ver si es capicua sin contar diferencias entre mayusculas y minúsculas y sin tenér en cuenta símbolos. Unicamente
  letras y números */
