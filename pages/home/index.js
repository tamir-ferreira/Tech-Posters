const buttonsControllersModal = document.querySelectorAll("[data-control-modal]");
const buttonsLike = document.querySelectorAll("[data-control-like]")
// console.log(buttonsControllersModal)
// console.log(buttonsLike)
let count = [0,0,0];



for(let i = 0; i < buttonsControllersModal.length; i++){
    buttonsControllersModal[i].addEventListener("click", ()=>{
        // console.log("Click", i)
        let modalId = buttonsControllersModal[i].getAttribute("data-control-modal")
        // console.log(modalId);
        document.getElementById(modalId).classList.toggle("show-modal");
        // console.log(element);
    })
}

for (let i = 0; i < buttonsLike.length; i++) {
    buttonsLike[i].onclick = (event) =>{
        count[i]++;
        event.target.parentElement.children[2].innerText = count[i]
        // console.dir(event.target);
        event.target.src = "../../assets/img/heart.svg"
    }
    
}