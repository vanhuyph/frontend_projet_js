import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

const ProfilePage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = `
  <h4>Information utilisateur :</h4>
  <div class="container" id="infoUser"></div>
  <h4>Mes recettes :</h4>
  <div class="container text-center" id="theseRecipes"></div>
  `;
  const user = getUserSessionData();
  if (!user) return RedirectUrl("/login");
  let username = user.user.username;

  //Obtenir toutes les recettes d'un utilisateur
  fetch("/api/recipes/" + username, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onTheseRecipesList(data))
    .catch((err) => onError(err));

  //Obtenir les informations de l'utilisateur
  fetch("/api/users/" + username, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onInfoUser(data))
    .catch((err) => onError(err));
};

const onInfoUser = (data) => {
  console.log(data);
  let infoUser = document.querySelector("#infoUser");
  let table = `
  <div> Username : ${data.username}</div>
  <div> Email : ${data.email}</div>
  `;
  infoUser.innerHTML = table;
};

const onTheseRecipesList = (data) => {
  console.log(data);
  let recipesList = document.querySelector("#theseRecipes");
  if (!data) return;

  let list = `<div class="container">`;

  data.forEach((recipe) => {
    list += `
    <div class="border" id="${recipe.id}">
      Nom : ${recipe.name} <br>
      Description : ${recipe.description} <br>
      Duration : ${recipe.duration} <br>
      Nombre personnes : ${recipe.qty_people} <br>
      Date : ${recipe.creation_date} <br>
      Liste ingrédients : ${recipe.ingredients_list} <br>
      Pseudo : ${recipe.username} <br>
      <button type="button" class="btn btn-danger btn-sm" id="btnDeleteRecipe">Supprimer</button>
      <button type="button" class="btn btn-primary btn-sm" id="btnUpdateRecipe">Modifier</button>
    </div>`;
  });

  list += `</div>`;

  recipesList.innerHTML = list;

  document.querySelectorAll("#btnDeleteRecipe").forEach((item) => {
    item.addEventListener("click", onDeleteRecipe);
  });
};

const onDeleteRecipe = (e) => {
  let recipeId = e.target.parentElement.id;
  console.log(recipeId);
  const user = getUserSessionData();

  fetch("/api/recipes/" + recipeId, {
    method: "DELETE",
    headers: {
      Authorization: user.token,
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onDeletedRecipes(data))
    .catch((err) => onError(err));
};

const onDeletedRecipes = (data) => {
  alert("Votre recette " + data.name + " a bien été supprimée");
  RedirectUrl("/profile");
};

const onError = (err) => {
  let errorMessage = "Error";
  if (err.message) {
    errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default ProfilePage;
