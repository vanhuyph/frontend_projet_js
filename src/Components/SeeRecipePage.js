import { RedirectUrl } from "./Router.js";

const SeeRecipePage = (id) => {
  // get all information of a recipe
  fetch("/api/recipes/seerecipe/" + id, {
    method: "GET",
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
    .then((data) => onDisplayRecipe(data))
    .catch((err) => onError(err));
};

const onDisplayRecipe = (recipe) => {
  let page = document.querySelector("#page");
  let aRecipe = `
    <div class="border" id="${recipe.id}">
      Nom : ${recipe.name} <br>
      Description : ${recipe.description} <br>
      Duration (min) : ${recipe.duration} <br>
      Recette pour ${recipe.qty_people} personnes <br>
      Date de création : ${recipe.creation_date} <br>
      Liste d'ingrédients : ${recipe.ingredients_list} <br>
      Créateur : ${recipe.username} <br>
    </div>`;

  page.innerHTML = aRecipe;
};

const onError = (err) => {
  let errorMessage = "Error";
  if (err.message) {
    errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default SeeRecipePage;