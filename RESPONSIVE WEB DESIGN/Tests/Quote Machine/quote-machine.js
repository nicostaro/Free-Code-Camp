"use strict";
//JQUERY

   $(document).ready(function(){

     $("#new-quote").click(function(){
     
        $.getJSON("https:gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        function (data){
           let cualquiera = Math.floor(Math.random() * 100);
           let frase = `${data["quotes"][cualquiera].quote}`;
           let autor =  "Autor:"+`${data["quotes"][cualquiera].author}`;
           $("#text").html(frase)
           $("#author").html(autor)
        })
        
     })
    
   });






   

