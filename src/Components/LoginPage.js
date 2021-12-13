/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
import { getUserSessionData, setUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";

//Form login page
let loginPage = `
<div class="container-fluid">
      <div class="container m-5">
        <div class="row ">
          <article
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg12"
          >
            <form>
            <div class="form-group">
              <label for="email">Pseudo</label>
              <input class="form-control" id="username" type="text" name="username" placeholder="Entrez votre pseudo" required="" />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input class="form-control" id="password" type="password" name="password" placeholder="Entrez votre mot de passe" required="" pattern=".*[A-Z]+.*" />
            </div>
            <button class="btn btn-primary" id="btn" type="submit">Connexion</button>
            <!-- Create an alert component with bootstrap that is not displayed by default-->
            <div class="alert alert-danger mt-2 d-none" id="messageBoard"></div>
            </form>
          </article>
        </div>
      </div>
</div>
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
  console.log("onUserLogin:", userData);
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  // re-render the navbar for the authenticated user
  Navbar();
  RedirectUrl("/");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("401")) errorMessage = "Wrong username or password.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default LoginPage;
