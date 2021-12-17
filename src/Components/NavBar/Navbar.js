import { getUserSessionData } from "../../utils/session.js";

const Navbar = () => {
  let navBar = document.querySelector("#navBar");
  let navbar;
  let user = getUserSessionData();
  if (user && user.user.admin === false) {
    // User is authenticated and is not an admin
    navbar = `<nav class="nav-bar" id="navBar">
    <ul class="container-nav-link">
        <li><a class="nav-link" href="#" data-uri="/">Accueil</a></li>
        <li><a class="nav-link" href="#" data-uri="/addrecipe">Ajouter une recette</a></li>
        <li><a class="nav-link" href="#" data-uri="/profile">Mon profil</a></li>
        <li><a class="nav-link" href="#" data-uri="/aboutus">À propos de nous</a></li>
        <li><a class="nav-link" href="#" data-uri="/logout">Déconnexion</a></li>
      </div>
    </div>
  </nav>`;
  } else if (user && user.user.admin === true){
    // User is not authenticated and is an admin
    navbar = `<nav class="nav-bar" id="navBar">
    <ul class="container-nav-link">
        <li><a class="nav-link" href="#" data-uri="/">Accueil</a></li>
        <li><a class="nav-link" href="#" data-uri="/addrecipe">Ajouter une recette</a></li>
        <li><a class="nav-link" href="#" data-uri="/users">Zone admin</a></li>
        <li><a class="nav-link" href="#" data-uri="/profile">Mon profil</a></li>
        <li><a class="nav-link" href="#" data-uri="/aboutus">À propos de nous</a></li>
        <li><a class="nav-link" href="#" data-uri="/logout">Déconnexion</a></li>
      </div>
    </div>
  </nav>`;
  } 
  else {
    //User is not authenticated
    navbar = `<nav class="nav-bar" id="navBar">
    <ul class="container-nav-link">
        <li><a class="nav-link" href="#" data-uri="/">Accueil</a></li>
        <li><a class="nav-link" href="#" data-uri="/aboutus">À propos de nous</a></li>
        <li><a class="nav-link" href="#" data-uri="/login">Connexion</a></li>
    </ul>
  </nav>`;
  }
  return (navBar.innerHTML = navbar);
};

export default Navbar;