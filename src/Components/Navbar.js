import { getUserSessionData } from "../utils/session.js";
import favIcon from "../img/favicon.png";

const Navbar = () => {
  let navBar = document.querySelector("#navBar");
  let navbar;
  let user = getUserSessionData();
  if (user && user.user.admin === false) {
    // User is authenticated and is not an admin
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
    <a class="navbar-brand" href="/" data-uri="/"><img src="${favIcon}" width="65" height="65" class="img-fluid"></a>
    <button
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
         
        <a class="nav-item nav-link" href="#" data-uri="/profile">Mon profil</a>
        <a class="nav-item nav-link" href="#" data-uri="/logout">Déconnexion</a>
      </div>
    </div>
  </nav>`;
  } else if (user && user.user.admin === true) {
    //User is authenticated and is an admin
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
    <a class="navbar-brand" href="/" data-uri="/"><img src="${favIcon}" width="65" height="65" class="img-fluid"></a>
    <button
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
        <a class="nav-item nav-link" href="#" data-uri="/users">Liste d'utilisateurs</a> 
        <a class="nav-item nav-link" href="#" data-uri="/profile">Mon profil</a>
        <a class="nav-item nav-link" href="#" data-uri="/logout">Déconnexion</a>
      </div>
    </div>
  </nav>`;
  } else {
    //User is not authenticated
    navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
  <a class="navbar-brand" href="/" data-uri="/"><img src="${favIcon}" width="65" height="65" class="img-fluid"></a>
  <button
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
