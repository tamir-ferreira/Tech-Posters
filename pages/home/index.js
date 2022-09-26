const buttonPost = document.getElementById("button-post");
const listPosts = document.querySelector(".list-posts");
const count = [15, 35, 20];

savedPosts();
// reloadButtons();

/* ---------- ACESSAR POSTS NO BANCO DE DADOS ----------- */
function savedPosts() {
    for (let i = 1; i < posts.length; i++) {
        includePost(
            posts[i].id_post,
            users[posts[i].user],
            posts[i].title,
            posts[i].text,
            posts[i].likes
        )
    }
}

/* --------- INSERIR NOVO POST ------------ */
buttonPost.onclick = () => {
    const titlePost = document.getElementById("title-post").value;
    const messagePost = document.getElementById("message-post").value;
    const newPost = {
        id_post: posts.length - 1,
        user: 1,
        title: titlePost,
        text: messagePost,
        likes: 0
    }

    // console.log(titlePost)
    // console.log(messagePost)
    posts.push(newPost);
    includePost(
        newPost.id_post,
        users[newPost.user],
        newPost.title,
        newPost.text,
        newPost.likes
    )
}


/* ----------- EXIBIR POSTS NA TELA ------------ */
function includePost(id, user, title, message, likes) {
    listPosts.innerHTML =
        `
    <li class="post">
    <article>
      <div class="user-info">
        <img src=${user.img} alt="foto de perfil">
        <div>
          <h3>${user.user}</h3>
          <span>${user.stack}</span>
        </div>
      </div>
      <h2>${title}</h2>
      <p>${message}</p>
      <div class="container-heart">
        <button data-control-modal="post-${id}">Abrir Post</button>
        <img data-control-like="like-${id}" src="../../assets/img/heart-pb.svg" alt="coração">
        <span>${likes}</span>
      </div>
    </article>
  </li>
  ${listPosts.innerHTML}`

    reloadButtons();
}

/* ------------- CRIAR MODAL DO POST ACESSADO PELO USUÁRIO ---------- */
function createModal(id) {
    for (let i = 1; i < posts.length; i++) {
        const userId = id.substring(5);

        if (posts[i].id_post == userId) {
            console.log(posts[i].id_post)
            console.log(i)
            const controlerModal = document.getElementById("modal-controler");
            controlerModal.innerHTML =
                `<div class="container-modal show-modal" id="modal-${i}">
                <div class="modal">
                    <div class="modal-header">
                        <div class="user-info">
                            <img src=${users[posts[i].user].img} alt="foto de perfil">
                            <div>
                            <h3>${users[posts[i].user].user}</h3>
                            <span>${users[posts[i].user].stack}</span>
                            </div>
                        </div>
                        <button data-close-modal="modal-${i}">x</button>
                        </div>
                        <div class="modal-description">
                        <h2>${posts[i].title}</h2>
                        <p>${posts[i].text}</p>
                    </div>
                </div>    
            </div>`

            const closeModal = document.querySelectorAll("[data-close-modal]");

            closeModal[0].onclick = () => {
                const modalId = closeModal[0].getAttribute("data-close-modal")
                document.getElementById(modalId).classList.toggle("show-modal");
            }
        }
    }
}


function reloadButtons() {
    const buttonsControllersModal = document.querySelectorAll("[data-control-modal]");
    const buttonsLike = document.querySelectorAll("[data-control-like]");
    const buttonsFollow = document.querySelectorAll("[data-control-follow]");
    const closeModal = document.querySelectorAll("[data-close-modal]");
    // console.log(buttonsControllersModal.length);


    /* ------------ ABRIR MODAL ------------- */
    for (let i = 0; i < buttonsControllersModal.length; i++) {
        buttonsControllersModal[i].getAttribute("data-control-modal")
        // console.log(closeModal[i].getAttribute("data-close-modal"))

        buttonsControllersModal[i].addEventListener("click", () => {
            let modalId = buttonsControllersModal[i].getAttribute("data-control-modal")
            // console.log(modalId);
            createModal(modalId);
            // document.getElementById(modalId).classList.toggle("show-modal");
        })

        /* closeModal[i].onclick = () => {
            let modalId = closeModal[i].getAttribute("data-close-modal")
            document.getElementById(modalId).classList.toggle("show-modal");
            // console.log('close modal')
        } */
    }


    /* -------------- FECHAR MODAL -------------- */
    /*  for (let i = 0; i < closeModal.length; i++) {
         closeModal[i].onclick = () => {
             let button = buttonsControllersModal[i].getAttribute("data-control-modal")
             let modalId = closeModal[i].getAttribute("data-close-modal")
             createModal();
             document.getElementById(modalId).classList.toggle("show-modal");
 
             console.log(i)
             console.log(button)
             console.log(modalId)
         }
 
     } */

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