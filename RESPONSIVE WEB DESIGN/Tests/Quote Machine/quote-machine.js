"use strict";
//JQUERY
   
let linkJason = "https:gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
let getJason = function (data){
   let cualquiera = Math.floor(Math.random() * 100);
   let frase = `${data["quotes"][cualquiera].quote}`;
   let autor =  "Author: "+`${data["quotes"][cualquiera].author}`;
   $("#text").html(frase)
   $("#author").html(autor)
   $("#tweet-quote").attr("href","https://twitter.com/intent/tweet?hashtags=quotes&text="+ encodeURIComponent(frase)); //acá le estoy cambiando el href al tweet para que se le agregue como texto la frase al twitearla
};

$(document).ready(function(){

   $.getJSON(linkJason, getJason)   // Con esto me aparece una frase random del .josn ni bien carga la pag

   $("#new-quote").click(function(){
                                            $.getJSON(linkJason, getJason)
                                    // Con esto me aparece una frase random del .josn cuando hago click
   })
    

   

 });

 


