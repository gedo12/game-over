const inputs = document.querySelectorAll("input")
const btnLogin = document.getElementById("btnLogin")
const dataForm = document.querySelector("form")
let valid = false
dataForm.addEventListener("submit",function(e){
   e.preventDefault()
   if( valid){
      setData()
   }


   
  
})
dataForm.addEventListener("input",function(){
   if( validEmail() && validPassword() ){
   valid = true

   }
   else{
      valid = false
   }
})

function setData(){
   user = {
      
      email:inputs[0].value,
      password:inputs[1].value,
     
   }
   console.log(user);
   loginForm(user)
}

 async function loginForm(dataUser){
   const api = await fetch (`https://movies-api.routemisr.com/signin`,{
      method:"Post",
      body: JSON.stringify(dataUser),
      headers: {
         Accept: "application/json",
         'Content-Type': 'application/json' 
      }
      
   })
   const respon = await api.json()
   if(respon.message == 'success' ){
    localStorage.setItem("uToken",respon.token)
      location = 'home.html'
   }
   else{
      document.getElementById("msg").innerHTML = respon.message;
   }
  
   console.log( respon);
}

function validEmail(){
   const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
   if(regexEmail.test(inputs[0].value)) {
        inputs[0].classList.add("is-valid")
      inputs[0].classList.remove("is-invalid")
      return true
   }
   else{
      inputs[0].classList.add("is-invalid")
      inputs[0].classList.remove("is-valid")
      return false
   }
}

function validPassword(){
   const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
   if (regexPassword.test(inputs[1].value)){
      inputs[1].classList.add("is-valid")
      inputs[1].classList.remove("is-invalid")
      return true
   }
   else{
      inputs[1].classList.add("is-invalid")
      inputs[1].classList.remove("is-valid")
      return false
   }
}
