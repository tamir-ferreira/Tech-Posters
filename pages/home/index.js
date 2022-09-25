const buttonPost = document.getElementById("button-post");
const listPosts = document.querySelector(".list-posts");
const count = [15, 35, 20];


reloadButtons();

buttonPost.onclick = () => {
    const titlePost = document.getElementById("title-post").value;
    const messagePost = document.getElementById("message-post").value;
    // console.log(titlePost)
    // console.log(messagePost)
    includePost(titlePost, messagePost)
}

function includePost(title, message) {
    listPosts.innerHTML =
        `
    <li class="post">
    <article>
      <div class="user-info">
        <img src="../../assets/img/user1.svg" alt="foto de perfil">
        <div>
          <h3>Samuel Leão</h3>
          <span>Front end Engineer</span>
        </div>
      </div>
      <h2>${title}</h2>
      <p>${message}</p>
      <div class="container-heart">
        <button data-control-modal="post-4">Abrir Post</button>
        <img data-control-like="like-4" src="../../assets/img/heart-pb.svg" alt="coração">
        <span>0</span>
      </div>
    </article>
  </li>
  ${listPosts.innerHTML}`

    reloadButtons();
}


function reloadButtons() {
    const buttonsControllersModal = document.querySelectorAll("[data-control-modal]");
    const buttonsLike = document.querySelectorAll("[data-control-like]");
    const buttonsFollow = document.querySelectorAll("[data-control-follow]");
    const closeModal = document.querySelectorAll("[data-close-modal]");
    // console.log(buttonsControllersModal.length);

    for (let i = 0; i < buttonsControllersModal.length; i++) {
        console.log(buttonsControllersModal[i].getAttribute("data-control-modal"))
        console.log(closeModal[i].getAttribute("data-close-modal"))

        buttonsControllersModal[i].addEventListener("click", () => {
            let modalId = closeModal[i].getAttribute("data-close-modal")
            // console.log(modalId);
            document.getElementById(modalId).classList.toggle("show-modal");
        })

        closeModal[i].onclick = () =>{
            let modalId = closeModal[i].getAttribute("data-close-modal")
            document.getElementById(modalId).classList.toggle("show-modal");
            // console.log('close modal')
        }
    }

    for (let i = 0; i < buttonsLike.length; i++) {
        buttonsLike[i].onclick = (event) => {
            const liked = buttonsLike[i].classList.toggle('like-pressed')
            if (liked) {
                count[i]++;
                event.target.parentElement.children[2].innerText = count[i];
                event.target.src = "../../assets/img/heart.svg";
            }
            else {
                count[i]--;
                event.target.parentElement.children[2].innerText = count[i];
                event.target.src = "../../assets/img/heart-pb.svg";
            }
        }
    }

    for (let i = 0; i < buttonsFollow.length; i++) {
        buttonsFollow[i].onclick = () => {
            const pressed = buttonsFollow[i].classList.toggle('btn-pressed')
            if (pressed) buttonsFollow[i].innerText = 'Seguindo';
            else buttonsFollow[i].innerText = 'Seguir';
        }
    }
}