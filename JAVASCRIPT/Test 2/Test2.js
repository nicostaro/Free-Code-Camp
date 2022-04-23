function convertToRoman(num) {
  if (num!==Math.floor(num)){
    return "ONLY ROUND NUMBERS ARE ACCEPTED";
    }
  if (num>=4000){
      return "ONLY NUMBERS LESS THAN 4000";  
    }
  let roman = {
    0:"", ///pongo el cero por la manera que tengo de calcular más abajo.
    1:"I",
    2:"II" ,
    3:"III" ,
    4:"IV" , 
    5:"V" ,
    6:"VI" ,
    7:"VII" ,
    8:"VIII" ,
    9:"IX" ,
    10:"X",
    20:"XX" ,
    30:"XXX" ,
    40:"XL" ,
    50:"L" ,
    60:"LX" ,
    70:"LXX" , 
    80:"LXXX" ,
    90:"XC" , 
    100:"C" , 
    200:"CC" , 
    300:"CCC" , 
    400:"CD" , 
    500:"D" , 
    600:"DC" , 
    700:"DCC" , 
    800:"DCCC" , 
    900:"CM" , 
    1000:"M" , 
    2000:"MM" , 
    3000:"MMM" 
  }
  if (num<10){
    return roman[num];
  }
  if (num<100){
    let num1 = Math.floor(num/10)*10;
    let num2 = num - num1;
    return roman[num1]+roman[num2];
  }
  if (num<1000){
    let num1 = Math.floor(num/100)*100;
    let num2 = Math.floor((num - num1)/10)*10 
    let num3 = num - num1 - num2;
    return roman[num1]+roman[num2]+roman[num3];
  }
  else{
    let num1 = Math.floor(num/1000)*1000;
    let num2 = Math.floor((num - num1)/100)*100;
    let num3 = Math.floor((num - num1 - num2)/10)*10; 
    let num4 = num - num1 - num2 - num3;
    return roman[num1]+roman[num2]+roman[num3]+roman[num4];
  }
  
 }
 
 
 console.log(convertToRoman(5))
 console.log(convertToRoman(29));
 console.log(convertToRoman(306));
 console.log(convertToRoman(3060));
/*Sólo convierte hasta el número 3999. Tampoco admite números decimales */