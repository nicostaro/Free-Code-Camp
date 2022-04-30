function checkCashRegister(price, cash, cid) {
  let diff=cash-price;
  let total=0;
  let change=[];
  let arr=[];
  const value = [
    ["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0.1], ["QUARTER", 0.25], ["ONE", 1], ["FIVE", 5], ["TEN", 10], ["TWENTY", 20], ["ONE HUNDRED", 100]
  ];
  for (let money of cid){ //Cada money va a ser cada arr dentro de Cid. money[1] es la plata
     total += money[1];
  }
  if (total<diff){
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  
  let quantity =[]
  for (let i=0;i<cid.length;i++){
    quantity[i]=[...cid[i]]
    
  }
  /*MUY IMPORTANTE!!! POR QUÉ PONGO ESE for Y NO PONGO DIRECTAMENTE let quantity=[...cid] CUANDO APARENTEMENTE DAN LO MISMO??? 
  CUANDO UNO HACE let quantity=[...cid] ESTÁ CLONANDO UN ARRAY PARA PODER MODIFICARLO Y QUE EL ORIGINAL NO SE MODIFIQUE.
  PEEEEEROOOOOOOOO EL ORIGINAL NO SE VA A MODIFICAR SI ES QUE MODIFICAS DEL CLONADO EL PRIMER ÍNDICE, O SEA EN ESTE CASO SI MODIFICO
  quantity[i], por ejemplo, si elimino el quantity[3].
  PERO SI QUIERO MODIFICAR ADENTRO (el segundo índice), EJEMPLO quantity[i][2] (porque este es un array de arrays), SI ME MODIFICA EL ORIGINAL.
  POR LO QUE TUVE QUE COPIAR CADA ARRAY DEL ARRAY, Y NO ÚNICAMENTE EL ARRAY*/

  for (let money of value){
    for (let bill of quantity){
      if (money[0]==bill[0]){ /*acá digo, que únicamente me haga lo siguiente cunado por ejemplo PENNY=PENNY*/
        bill.push(money[1]) /*pushea el valor de la moneda */
        bill.push(Math.round(bill[1]/money[1])) /*pushea la cantidad de billetes/monedas que tengo, y redondeo por si algo da ,9999999 */
      } 
    } 
  }
  
  let firstFilter = quantity.filter(x=> x[2]<diff && x[1]!=0) /*lo filtro, porque si el valor de la moneda es mayor al cambio, ya no es cambio exacto y de paso saco los que sean cero*/
                                    .reverse(); /*le cambio el orden al revés porque el cambio va a ir de mayor a menor */
  
  for (let i=0;i<firstFilter.length;i++){
    
    if(diff%firstFilter[i][2]==0 && diff/firstFilter[i][2]<firstFilter[i][3] && diff>0 )  {
      arr.push(firstFilter[i][0]);
      arr.push(Number(diff)); //puse number porque en alguna me salió como string
      diff = 0;
      console.log(diff)
      console.log(arr)
    }
    if(diff/firstFilter[i][2]>=firstFilter[i][3]  )  {
      arr.push(firstFilter[i][0]);
      arr.push(firstFilter[i][2]*firstFilter[i][3]);
      diff = (diff - firstFilter[i][2]*firstFilter[i][3]).toFixed(2);  
      console.log(diff) 
      console.log(arr)
       
    } 
    else if(diff/firstFilter[i][2]<firstFilter[i][3] && diff>firstFilter[i][2] )  {
      arr.push(firstFilter[i][0]);
      arr.push(Math.floor(diff/firstFilter[i][2])*firstFilter[i][2]);
      diff = (diff - Math.floor(diff/firstFilter[i][2])*firstFilter[i][2]).toFixed(2); 
      console.log(diff)
      console.log(arr)
      
      
    }  
    
  }
  for(let i=0; i<arr.length;i+=2){
    change.push(arr.slice(i,2+i));
  }
  
  if (diff!=0){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } 
  for (let i=0;i<firstFilter.length;i++){
    if(firstFilter.length==change.length && firstFilter[i][0]==change[i][0] && firstFilter[i][1]==change[i][1] ){
      return {status: "CLOSED", change: cid};
    
    }/*la consigna me pide que si el cambio es exactamente lo que está en la caja, la rta salga así*/

    else { return {status: "OPEN", change: change}}
  }
    
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))

