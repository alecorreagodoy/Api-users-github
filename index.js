//function json

function httpGetAsync(theUrl, callback)
{
    let requester = new XMLHttpRequest();
    requester.onreadystatechange = function() { 
        if (requester.readyState == 4 && requester.status == 200)
            callback(requester.responseText);
            if(requester.readyState == 4 && requester.status == 404){
        document.querySelector(".container-card").innerHTML = `
        <div class="card-err contenedor " style="width: 32rem; background-color: rgb(238, 142, 161); color:red; text-align: center;">
                   
            
                <div class="row no-gutters no-user" >
                    <h4>Usuario no encontrado</h4>
                </div>
            
         </div>`
    }
    }
    requester.open("GET", theUrl, true); 
    requester.send(null);
}

function imprimirRepos(responseText) {
    
    let respuestaParseada = JSON.parse(responseText)
    document.querySelector(".list-group").innerHTML =  ""; 

   for (let i = 0; i < respuestaParseada.length; i++) {

        
    let newHtml =`
        <ul>
        
            <li class="list-group-item">${respuestaParseada[i]["name"]} 
            <span class="float-right tenedor"><i class="fas fa-code-branch"></i> ${respuestaParseada[i]['forks']}</span>
            <span class="float-right seguidor"><i class="far fa-star"></i>${respuestaParseada[i]['watchers_count']}</span>
            </li>
            <hr>
        </ul>
        `
        
        document.querySelector(".list-group").innerHTML +=  newHtml; 

   }
}

function imprimirUsuario(responseText) {
    
    let respuestaParseada = JSON.parse(responseText)

        document.querySelector(".container-card").innerHTML =`
              
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="img col-md-4">
                    <img  src="${respuestaParseada["avatar_url"]}" class="card-img" alt="avatar">
                    </div>
                    <div class=" col-md-8">
                    <div class="card-body">
                        <p class="card-text">@username</p>
                        <h3 class="card-title name">Card title</h3>
                        <p class="card-text"><small class="text-muted">${respuestaParseada["bio"]}</small></p>
                    </div>
                    </div>
                </div>
                <p class="repo">Repositorios</p>
                <hr/>
              
            </div>`

         document.querySelector(".name").innerHTML = `
        <h3>${respuestaParseada["login"]}</h3>
        
        `

    let usuario = document.querySelector(".input-serch").value;
    
    httpGetAsync("https://api.github.com/users/" + usuario+ "/repos", imprimirRepos)  
   
}


document.querySelector(".btn-serch").addEventListener('click',()=>{
 
    let usuario = document.querySelector(".input-serch").value;
    
    httpGetAsync("https://api.github.com/users/" + usuario, imprimirUsuario)  
})

/*var input = document.querySelector(".input-serch").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.querySelector(".btn-serch").click();
  }
});*/

