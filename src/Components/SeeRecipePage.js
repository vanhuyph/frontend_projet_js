import { RedirectUrl } from "./Router.js";

const SeeRecipePage = (id) => {
  //Obtenir toutes les infos d'une recette
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
      Duration : ${recipe.duration} <br>
      Nombre personnes : ${recipe.qty_people} <br>
      Date : ${recipe.creation_date} <br>
      Liste ingrédients : ${recipe.ingredients_list} <br>
      Pseudo : ${recipe.username} <br>
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
