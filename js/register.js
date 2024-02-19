const inputs = document.querySelectorAll("input")
const btnRegister = document.getElementById("btnRegister")
const dataForm = document.querySelector("form")
let valid = false
dataForm.addEventListener("submit",function(e){
   e.preventDefault()
   console.log("hello");
   if( valid){
      setData()
   }


   
  
})
dataForm.addEventListener("input",function(){
   if(validName(inputs[0]) && validName(inputs[1]) && validEmail() && validPassword() && validAge()){
   valid = true

   }
   else{
      valid = false
   }
})

function setData(){
   user = {
      first_name:inputs[0].value,
      last_name:inputs[1].value,
      email:inputs[2].value,
      password:inputs[3].value,
      age:inputs[4].value,
   }
   console.log(user);
   registerForm(user)
}

 async function registerForm(dataUser){
   const api = await fetch (`https://movies-api.routemisr.com/signup`,{
      method:"Post",
      body: JSON.stringify(dataUser),
      headers: {
         Accept: "application/json",
         'Content-Type': 'application/json' 
      }
      
   })
   const respon = await api.json()
   if(respon.message == 'success' ){
      location = 'index.html'
   }
   else{
      document.getElementById("msg").innerHTML = respon.errors?.email.message;
   }
  
   console.log( respon);
}





function validName(input){
   const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
   if(regexStyle.test(input.value)) {
      input.classList.add("is-valid")
      input.classList.remove("is-invalid")
      return true
   }
   else{
      input.classList.add("is-invalid")
      input.classList.remove("is-valid")
      return false
   }
}

function validEmail(){
   const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
   if(regexEmail.test(inputs[2].value)) {
        inputs[2].classList.add("is-valid")
      inputs[2].classList.remove("is-invalid")
      return true
   }
   else{
      inputs[2].classList.add("is-invalid")
      inputs[2].classList.remove("is-valid")
      return false
   }
}

function validPassword(){
   const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
   if (regexPassword.test(inputs[3].value)){
      inputs[3].classList.add("is-valid")
      inputs[3].classList.remove("is-invalid")
      return true
   }
   else{
      inputs[3].classList.add("is-invalid")
      inputs[3].classList.remove("is-valid")
      return false
   }
}
function validAge(){
   const regexAge = /^([1-7][0-9]|80)$/
   if(regexAge.test(inputs[4].value)){
      inputs[4].classList.add("is-valid")
      inputs[4].classList.remove("is-invalid")
      return true
   }
   else {
      inputs[4].classList.add("is-invalid")
      inputs[4].classList.remove("is-valid")
      return false
   }
}