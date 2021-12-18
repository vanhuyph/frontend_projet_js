import { RedirectUrl } from "../Router/Router.js";
import Navbar from "../NavBar/Navbar.js";
import { setUserSessionData } from "../../utils/session.js";
import ImageLogin from "../../img/login.jpg";

/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
let registerPage = `
<div class="container-register">
  <div class="container-in">
    <div class="container-form">
            <form>
              <h2>S'inscrire</h2>
              <div class="form-lign-register">
                <label for="username">Pseudo</label>
                <input class="form-input" id="username" type="text" name="username" oninvalid="this.setCustomValidity('Entrer votre pseudo')" oninput="this.setCustomValidity('')" required="" />
              </div>
              <div class="form-lign-register">
                <label for="email">Email</label>
                <input class="form-input" id="email" type="text" name="email" oninvalid="this.setCustomValidity('Respecter le format')" onchange="try{setCustomValidity('')}catch(e){}" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+\$" />
              </div>
              <div class="form-lign-register">
                <label for="password">Mot de passe</label>
                <input class="form-input" id="password" type="password" name="password" oninvalid="this.setCustomValidity('Entrer votre mot de passe')" oninput="this.setCustomValidity('')" required="" pattern=".*[A-Za-z]+.*" />
              </div>
              <button class="form-button" id="btn" type="submit">S'INSCRIRE</button>
              <div class="alert alert-danger mt-2 d-none" id="messageBoard"></div><span id="errorMessage"></span>
            </form>
            </div>
            <div class="container-image">
      <img src="${ImageLogin}"/>
    </div>
    </div>
<div>
  `;

const RegisterPage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = registerPage;
  let registerForm = document.querySelector("form");
  registerForm.addEventListener("submit", onRegister);
};

const onRegister = (e) => {
  e.preventDefault();
  let user = {
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  fetch("/api/users/register", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(user), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onUserRegistration(data))
    .catch((err) => onError(err));
};

const onUserRegistration = (userData) => {
  messageBoard.classList.remove("d-blocks");
  console.log("onUserRegistration", userData);
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  // re-render the navbar for the authenticated user
  Navbar();
  RedirectUrl("/");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("409"))
    errorMessage = "Ce pseudo existe déjà.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default RegisterPage;
