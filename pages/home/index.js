const buttonsControllersModal = document.querySelectorAll("[data-control-modal]");
const buttonsLike = document.querySelectorAll("[data-control-like]")
const buttonsFollow = document.querySelectorAll("[data-control-follow]")
const count = [15,35,20];

for(let i = 0; i < buttonsControllersModal.length; i++){
    buttonsControllersModal[i].addEventListener("click", ()=>{
        let modalId = buttonsControllersModal[i].getAttribute("data-control-modal")
        document.getElementById(modalId).classList.toggle("show-modal");
    })
}

for (let i = 0; i < buttonsLike.length; i++) {
    buttonsLike[i].onclick = (event) =>{
        const liked = buttonsLike[i].classList.toggle('like-pressed')
        if (liked){
            count[i]++;
            event.target.parentElement.children[2].innerText = count[i];
            event.target.src = "../../assets/img/heart.svg";
        } 
        else{
            count[i]--;
            event.target.parentElement.children[2].innerText = count[i];
            event.target.src = "../../assets/img/heart-pb.svg";
        } 
    }
}

for (let i = 0; i < buttonsFollow.length; i++) {
    buttonsFollow[i].onclick = () =>{
        const pressed = buttonsFollow[i].classList.toggle('btn-pressed')
        if (pressed) buttonsFollow[i].innerText = 'Seguindo';
        else buttonsFollow[i].innerText = 'Seguir';
    }
}