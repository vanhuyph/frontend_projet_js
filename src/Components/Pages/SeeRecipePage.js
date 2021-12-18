import { RedirectUrl } from "../Router/Router.js";

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
    <div class="container">
      <h4 style="margin-top:30px; margin-bottom:30px;">Recette de "${recipe.name}"</h4>
        <div class ="card border-dark">
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="m-3">Description :</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="m-3">${recipe.description}</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="m-3">Durée (min) :</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="m-3">${recipe.duration}</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="m-3">Quantité :</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="m-3">${recipe.qty_people} personnes</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="m-3">Date de création :</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="m-3">${recipe.creation_date}</p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="m-3">Ingrédients :</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="m-3">${recipe.ingredients_list}</p>
          </div>
        </div>
        
      </div>
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