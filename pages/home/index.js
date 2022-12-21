import { posts } from "../../script/database/posts.js";
import { users } from "../../script/database/users.js";

const buttonsControllersModal = document.querySelectorAll(
  "[data-control-modal]"
);

const listPosts = document.querySelector(".list-posts");
const count = [15, 35, 20];

const renderPosts = () => {
  listPosts.innerHTML = "";
  posts.map((post) => {
    const { id_post, title, text, likes } = post;
    const userFind = users.find((elem) => elem.id == post.user);
    const { user, stack, img } = userFind;

    listPosts.insertAdjacentHTML(
      "beforeend",
      `
        <li class="post">
              <article>
                <div class="user-info">
                  <img src="${img}" alt="foto de perfil" />
                  <div>
                    <h3>${user}</h3>
                    <span>${stack}</span>
                  </div>
                </div>
                <h2>${title}</h2>
                <p>${text}</p>
                <div class="container-heart">
                  <button data-control-modal="post-${id_post}">Abrir Post</button>
                  <img
                    data-control-like="like-${id_post}"
                    src="../../assets/img/heart-pb.svg"
                    alt="coração"
                  />
                  <span>${likes} </span>
                </div>
              </article>
            </li>
        `
    );
  });
};
renderPosts();
const buttonsLike = document.querySelectorAll("[data-control-like]");
const buttonsFollow = document.querySelectorAll("[data-control-follow]");

for (let i = 0; i < buttonsControllersModal.length; i++) {
  buttonsControllersModal[i].addEventListener("click", () => {
    let modalId = buttonsControllersModal[i].getAttribute("data-control-modal");
    document.getElementById(modalId).classList.toggle("show-modal");
  });
}

for (let i = 0; i < buttonsLike.length; i++) {
  buttonsLike[i].onclick = (event) => {
    const liked = buttonsLike[i].classList.toggle("like-pressed");
    if (liked) {
      count[i]++;
      event.target.parentElement.children[2].innerText = count[i];
      event.target.src = "../../assets/img/heart.svg";
    } else {
      count[i]--;
      event.target.parentElement.children[2].innerText = count[i];
      event.target.src = "../../assets/img/heart-pb.svg";
    }
  };
}

for (let i = 0; i < buttonsFollow.length; i++) {
  buttonsFollow[i].onclick = () => {
    const pressed = buttonsFollow[i].classList.toggle("btn-pressed");
    if (pressed) buttonsFollow[i].innerText = "Seguindo";
    else buttonsFollow[i].innerText = "Seguir";
  };
}
