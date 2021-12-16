import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

const AddRecipePage = () => {
  const user = getUserSessionData();
  if (!user) return RedirectUrl("/login");
  const page = document.querySelector("#page");

  let form = `
   <div class="container-fluid">
      <div class="container m-5">
        <div class="row ">
          <article
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg12"
          >
            <form id="formAddRecipe">
            <div class="form-group">
              <label for="labelName">Nom</label>
              <input class="form-control" id="name" type="text" name="name" oninvalid="this.setCustomValidity('Entrer le nom de la recette')" oninput="this.setCustomValidity('')" required />
            </div>
            <div class="form-group">
              <label for="labelDescription">Description</label>
              <input class="form-control" id="description" rows="5" type="text" name="description" oninvalid="this.setCustomValidity('Entrer la description de la recette')" oninput="this.setCustomValidity('')" required />            
            </div>
            <div class="form-group">
              <label for="labelDuration">Durée (min)</label>
              <input class="form-control" id="duration" type="number" min=1 name="duration" oninvalid="this.setCustomValidity('Entrer la durée de la recette')" oninput="this.setCustomValidity('')" required />
            </div>
            <div class="form-group" >
              <label for="labelQty">Quantité pour les personnes</label>
              <input class="form-control" id="qty_people" type="number" min=1 name="qty_people" oninvalid="this.setCustomValidity('Entrer la quantité pour les personnes')" oninput="this.setCustomValidity('')" required />
            </div>
            <div class="form-group">
              <label for="labelIngredients">Ingrédients</label>
              <input class="form-control" id="ingredients_list" type="text" name="ingredients_list" oninvalid="this.setCustomValidity('Entrer les ingrédients de la recette')" oninput="this.setCustomValidity('')" required />
            </div>
            <button class="btn btn-danger" id="btnForm" type="submit">Ajouter</button>
            </form>
          </article>
        </div>
      </div>
    </div>
  `;
  page.innerHTML = form;
  let formAddRecipe = document.getElementById("formAddRecipe");
  formAddRecipe.addEventListener("submit", onSubmit);
};

const onSubmit = (e) => {
  e.preventDefault();
  const user = getUserSessionData();

  var today = new Date();
  var date = today.toLocaleDateString('en-GB');

  let recipe = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    duration: document.getElementById("duration").value,
    qty_people: document.getElementById("qty_people").value,
    creation_date: date,
    ingredients_list: document.getElementById("ingredients_list").value,
    username: user.user.username,
  };
  
  fetch("/api/recipes/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(recipe), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
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
    .then((data) => onRecipeAdded(data))
    .catch((err) => onError(err));
};

const onRecipeAdded = (data) => {
  alert("La recette " + data.name + " a bien été ajoutée !");
  RedirectUrl("/");
};

const onError = (err) => {
  let errorMessage = "Error";
  if (err.message) {
    errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default AddRecipePage;