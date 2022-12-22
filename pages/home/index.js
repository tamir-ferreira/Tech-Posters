import { posts } from "../../script/database/posts.js";
import { suggestUsers } from "../../script/database/sugestUsers.js";
import { users } from "../../script/database/users.js";

const body = document.querySelector("body");
const listPosts = document.querySelector(".list-posts");
const userInfo = document.querySelector(".user-info");
const listSuggestions = document.querySelector(".list-suggestions");

const renderSuggestions = () => {
  suggestUsers.map((elem) => {
    const findUser = users.find((user) => user.id == elem);
    const { user, stack, img } = findUser;
    listSuggestions.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <div class="user-info">
          <img src="${img}" alt="foto de perfil" />
          <div>
            <h3>${user}</h3>
            <span>${stack}</span>
          </div>
          <button data-control-follow="follow-1">Seguir</button>
        </div>
      </li>
    `
    );
  });

  const buttonsFollow = document.querySelectorAll("[data-control-follow]");
  buttonsFollow.forEach((button) => {
    button.onclick = () => {
      const pressed = button.classList.toggle("btn-pressed");
      if (pressed) button.innerText = "Seguindo";
      else button.innerText = "Seguir";
    };
  });
};
renderSuggestions();

const handleLike = () => {
  const buttonsLike = document.querySelectorAll("[data-control-like]");

  buttonsLike.forEach((button) => {
    button.onclick = (event) => {
      const id = button.getAttribute("data-control-like");
      const findPost = posts.find((post) => post.id_post == id);

      if (!findPost.liked) {
        findPost.likes += 1;
        event.target.parentElement.children[2].innerText = findPost.likes;
        event.target.src = "../../assets/img/heart.svg";
        findPost.liked = true;
      } else {
        findPost.likes -= 1;
        event.target.parentElement.children[2].innerText = findPost.likes;
        event.target.src = "../../assets/img/heart-pb.svg";
        findPost.liked = false;
      }
      event.target.classList.toggle("like-pressed");
    };
  });
};

const openModal = () => {
  const buttonsControllersModal = document.querySelectorAll(
    "[data-control-modal]"
  );
  buttonsControllersModal.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-control-modal");
      const findPost = posts.find((post) => post.id_post == id);
      createModal(findPost);
    });
  });
  handleLike();
};

const postSubmit = () => {
  const form = document.querySelector("form");
  const formData = [...form];

  form.onsubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id_post: posts.length + 1,
      user: 1,
      title: "",
      text: "",
      likes: 0,
      liked: false,
    };

    formData.forEach((elem) => {
      if (elem.nodeName == "INPUT" || elem.nodeName == "TEXTAREA") {
        newPost[elem.name] = elem.value;
      }
    });

    posts.push(newPost);

    form.reset();
    renderPosts();
    handleLike();
  };
};
postSubmit();

const renderPosts = () => {
  listPosts.innerHTML = "";
  console.log(posts, posts.length);
  posts.map((post) => {
    const { id_post, title, text, likes, liked } = post;
    const userFind = users.find((elem) => elem.id == post.user);
    const { user, stack, img } = userFind;

    listPosts.insertAdjacentHTML(
      "afterbegin",
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
              <button data-control-modal="${id_post}">Abrir Post</button>
              <img
                data-control-like="${id_post}"
                src="${
                  liked
                    ? "../../assets/img/heart.svg"
                    : "../../assets/img/heart-pb.svg"
                }"
                alt="coração"
              />
              <span>${likes} </span>
            </div>
          </article>
        </li>
        `
    );
  });
  openModal();
};

const renderOwnerCard = () => {
  userInfo.insertAdjacentHTML(
    "afterbegin",
    `
    <img src="${users[0].img}" alt="foto de perfil" />
    <div>
      <h3>${users[0].user}</h3>
      <span>${users[0].stack}</span>
    </div>
  `
  );
  renderPosts();
};
renderOwnerCard();

const createModal = (post) => {
  const { title, text } = post;
  const findUser = users.find((elem) => elem.id == post.user);
  const { user, stack, img } = findUser;

  const divContainer = document.createElement("div");
  const divModal = document.createElement("div");
  const divModalHeader = document.createElement("div");
  const divUserInfo = document.createElement("div");
  const imgProfile = document.createElement("img");
  const divUser = document.createElement("div");
  const h3User = document.createElement("h3");
  const spanUser = document.createElement("span");
  const btnClose = document.createElement("button");
  const divModalDescription = document.createElement("div");
  const h2Description = document.createElement("h2");
  const pDescription = document.createElement("p");

  divContainer.className = "container-modal";
  divModal.className = "modal";
  divModalHeader.className = "modal-header";
  divUserInfo.className = "user-info";
  imgProfile.src = img;
  imgProfile.alt = "foto de perfil";
  h3User.innerText = user;
  spanUser.innerText = stack;
  btnClose.innerText = "X";
  btnClose.onclick = () => divContainer.remove();
  divModalDescription.className = "modal-description";
  h2Description.innerText = title;
  pDescription.innerText = text;

  body.appendChild(divContainer);
  divContainer.appendChild(divModal);
  divModal.append(divModalHeader, divModalDescription);
  divModalHeader.append(divUserInfo, btnClose);
  divUserInfo.append(imgProfile, divUser);
  divUser.append(h3User, spanUser);
  divModalDescription.append(h2Description, pDescription);
};
