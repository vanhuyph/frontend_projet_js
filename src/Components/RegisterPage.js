import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";
import { setUserSessionData } from "../utils/session.js";

/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
let registerPage = `
<div class="container-fluid">
      <div class="container m-5">
        <div class="row ">
          <article
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg12"
          >
            <form>
              <div class="form-group">
                <label for="email">Username</label>
                <input class="form-control" id="username" type="text" name="username" placeholder="Enter your username" required="" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email" placeholder="Enter your email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+\$" />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password" placeholder="Enter your password" required="" pattern=".*[A-Z]+.*" />
              </div>
              <button class="btn btn-primary" id="btn" type="submit">Submit</button>
              
              <div class="alert alert-danger mt-2 d-none" id="messageBoard"></div><span id="errorMessage"></span>
            </form>
          </article>
        </div>
      </div>
</div>
            
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
  fetch("/api/users/", {
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
    errorMessage = "This user is already registered.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default RegisterPage;
