const link = document.querySelectorAll(".menu a")
const loading = document.querySelector(".loading");
getGames("mmorpg")
for(let i = 0 ; i < link.length ; i++){
    link[i].addEventListener("click",function(){
        document.querySelector(".menu .active").classList.remove("active")
        link[i].classList.add("active")
        const category = link[i].getAttribute("data-category")
        console.log(category);
        getGames(category)
    })
}
document.querySelector(".logout-btn").addEventListener("click", function () {
   localStorage.removeItem("uToken");
   location.href = "index.html";
});
 async function getGames(gameCategory){
    loading.classList.remove("d-none")
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bdc5a240abmsh7f399b77f8b4e80p17e822jsnf93c49bde5c3',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${gameCategory}`,options)
    const response = await api.json();
    console.log(response);
    displayGame(response)
    loading.classList.add("d-none")
}
function displayGame(data){
 
    let gameBox = ``
    for( let i = 0 ; i < data.length ; i++ ){
        let videoPath = data[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm")
        gameBox += `
        <div class="col">
        <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${data[i].id})" class="card h-100 bg-transparent" role="button" >
           <div class="card-body">
  
              <figure class="position-relative">
                 <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
  
               <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                <source src="${videoPath}">
                </video>
  
              </figure>
  
              <figcaption>
  
                 <div class="hstack justify-content-between">
                    <h3 class="h6 small"> ${data[i].title} </h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                 </div>
  
                 <p class="card-text small text-center opacity-50">
                    ${data[i].short_description}
                 </p>
  
              </figcaption>
           </div>
  
           <footer class="card-footer small hstack justify-content-between">
  
              <span class="badge badge-color">${data[i].genre}</span>
              <span class="badge badge-color">${data[i].platform}</span>
  
           </footer>
        </div>
     </div>`
     document.getElementById("gameData").innerHTML = gameBox
    }

}
function startVideo(event) {
    const videoEl = event.target.querySelector("video"); 
    videoEl.classList.remove("d-none");
    videoEl.muted = true;
    videoEl.play();
 }
 function stopVideo(event) {
    const videoEl = event.target.querySelector("video"); 
    videoEl.classList.add("d-none");
    videoEl.muted = true;
    videoEl.pause();
 }

function showDetails(id){
    location =`details.html?id=${id}`
}
