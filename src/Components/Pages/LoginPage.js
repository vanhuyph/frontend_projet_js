/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
import { getUserSessionData, setUserSessionData } from "../../utils/session.js";
import { RedirectUrl } from "../Router/Router.js";
import Navbar from "../NavBar/Navbar.js";
import ImageLogin from "../../img/login.jpg";

//Form login page
let loginPage = `
<div class="container-login">
  <div class="container-in">
    <div class="container-form">
      <form>
        <h2>Connexion</h2>
        <div class="form-lign">
          <label for="username">Pseudo</label>
          <input class="form-input" id="username" type="text" name="username" oninvalid="this.setCustomValidity('Entrer votre pseudo')" oninput="this.setCustomValidity('')" required="" />
        </div>
        <div class="form-lign">
          <label for="password">Mot de passe</label>
          <input class="form-input" id="password" type="password" name="password" oninvalid="this.setCustomValidity('Entrer votre mot de passe')" oninput="this.setCustomValidity('')" required="" pattern=".*[A-Za-z]+.*" />
        </div>
        <button class="form-button" type="submit">CONNEXION</button>
        <a class="register-link" href="/register">Pas encore de compte ?</a>
        <!-- Create an alert component with bootstrap that is not displayed by default-->
        <div class="alert alert-danger mt-2 d-none" id="messageBoard"></div>
      </form>     
    </div>
    <div class="container-image">
      <img src="${ImageLogin}"/>
    </div>
    </div>
<div>
`;

const LoginPage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = loginPage;
  let loginForm = document.querySelector("form");
  const user = getUserSessionData();
  if (user) {
    // re-render the navbar for the authenticated user
    Navbar();
    RedirectUrl("/");
  } else loginForm.addEventListener("submit", onLogin);
};

const onLogin = (e) => {
  e.preventDefault();
  let user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  fetch("/api/users/login", {
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
    .then((data) => onUserLogin(data))
    .catch((err) => onError(err));
};

const onUserLogin = (userData) => {
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  // re-render the navbar for the authenticated user
  Navbar();
  RedirectUrl("/");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("401")) errorMessage = "Pseudo/mot de passe incorrect.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default LoginPage;