const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const id = params.get("id"); 
let cont = {};
(async function(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bdc5a240abmsh7f399b77f8b4e80p17e822jsnf93c49bde5c3',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch (`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}` ,options )
    const response = await api.json()
    cont = response;
    displayData()
    console.log(response);
})()

function displayData() {
    const detailsBox = `
    
    <div class="col-md-4">
    <figure>
       <img src="${cont.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb" class="text-light">
             <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
             <li class="breadcrumb-item text-info" aria-current="page">${cont.title}</li>
          </ol>
       </nav>
 
       <h1>${cont.title}</h1>
 
       <h3>About ${cont.title}</h3>
       <p>${cont.description}</p>
 
       
    </div>
 </div>
 
    `;
    document.getElementById("detailsData").innerHTML = detailsBox;
    const backgroundImage = cont.thumbnail.replace("thumbnail", "background");

   document.body.style.cssText = `
   background-image:url('${backgroundImage}') ;
   background-size:cover;
   background-position:center; 
   `;
} 


