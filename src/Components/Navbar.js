import { getUserSessionData } from "../utils/session.js";

let navBar = document.querySelector("#navBar");
// destructuring assignment
const Navbar = () => {
  let navbar;
  let user = getUserSessionData();
  if (user) {
    //User is authenticated
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
    <a class="navbar-brand" href="/" data-uri="/">MyCMS</a
    ><button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link" href="#" data-uri="/">Accueil</a>
        <a class="nav-item nav-link" href="#" data-uri="/addrecipe">Ajouter une recette</a>
        <a class="nav-item nav-link" href="#" data-uri="/users">List users</a> 
        <a class="nav-item nav-link" href="#" data-uri="/profile">${user.user.username}</a>
        <a class="nav-item nav-link" href="#" data-uri="/logout">Déconnexion</a>
      </div>
    </div>
  </nav>`;
  } else {
    //User is not authenticated
    navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
  <a class="navbar-brand" href="/" data-uri="/">MyCMS</a
  ><button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="#" data-uri="/">Accueil</a>
      <a class="nav-item nav-link" href="#" data-uri="/register">S'inscrire</a>
      <a class="nav-item nav-link" href="#" data-uri="/login">Se connecter</a> 
    </div>
  </div>
  </nav>`;
  }
  return (navBar.innerHTML = navbar);
};
export default Navbar;
