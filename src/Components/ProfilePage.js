import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

const ProfilePage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = `
  <h4>Vos informations :</h4>
  <div id="infoUser"></div>
  <h4>Mes recettes :</h4>
  <div class="container text-center" id="theseRecipes"></div>
  `;
  const user = getUserSessionData();
  if (!user) return RedirectUrl("/login");
  let username = user.user.username;

  // get all recipes from its creator
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

  // get information from the user
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
  let infoUser = document.querySelector("#infoUser");
  let table = `
  <div> Pseudo : ${data.username}</div>
  <div> Email : ${data.email}</div>
  `;
  infoUser.innerHTML = table;
};

const onTheseRecipesList = (data) => {
  let recipesList = document.querySelector("#theseRecipes");
  if (!data) return;

  let list = `<div class="container">`;

  data.forEach((recipe) => {
    list += `
    <div class="border" id="${recipe.id}">
      Nom : ${recipe.name} <br>
      Description : ${recipe.description} <br>
      Duration (min) : ${recipe.duration} <br>
      Recette pour ${recipe.qty_people} personnes <br>
      Date de création : ${recipe.creation_date} <br>
      Liste d'ingrédients : ${recipe.ingredients_list} <br>
      Créateur : ${recipe.username} <br>
      <button type="button" class="btn btn-primary btn-sm" id="btnUpdateRecipe">Modifier</button>
      <button type="button" class="btn btn-danger btn-sm" id="btnDeleteRecipe">Supprimer</button>
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
  alert("Votre recette " + data.name + " a bien été supprimée !");
  document.getElementById(data.id).remove();
};

const onError = (err) => {
  let errorMessage = "Error";
  if (err.message) {
    errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default ProfilePage;