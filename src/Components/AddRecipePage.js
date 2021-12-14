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
            <form>
            <div class="form-group">
              <input class="form-control" id="name" type="text" name="name" placeholder="Nom de la recette" required />
            </div>
            <div class="form-group">
              <textarea class="form-control" id="description" rows="5" type="text" name="description" placeholder="Étapes de la réalisation" required /></textarea>
            </div>
            <div class="form-group">
              <input class="form-control" id="duration" type="number" min=1 name="duration" placeholder="Durée de la réalisation (min)" required />
            </div>
            <div class="form-group">
              <input class="form-control" id="qty_people" type="number" min=1 name="qty_people" placeholder="Quantité pour les personnes" required />
            </div>
            <div class="form-group">
              <input class="form-control" id="ingredients_list" type="text" name="ingredients_list" placeholder="Ingrédients" required />
            </div>
            <button class="btn btn-danger" id="btnForm" type="submit">Ajouter</button>
            </form>
          </article>
        </div>
      </div>
    </div>
  `;
  page.innerHTML = form;
  let btnForm = document.getElementById("btnForm");
  btnForm.addEventListener("click", onSubmit);
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