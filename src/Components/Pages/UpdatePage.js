import { getUserSessionData } from "../../utils/session";
import { RedirectUrl } from "../Router/Router.js";


const UpdatePage = (id) => {
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
}

const onDisplayRecipe = (data) => {
    let page = document.querySelector("#page");

    let formUpdate = `
   <div class="container-fluid">
      <div class="container mt-4">
        <div class="row ">
          <article
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg12"
          >
          <h4>Modifier recette</h4>
            <form id="formAddRecipe">
            <div class="form-input">
            <label for="name">Nom</label>
              <input class="form-control" id="name" type="text" name="name" value="${data.name}" oninvalid="this.setCustomValidity('Entrer le nom de la recette')" oninput="this.setCustomValidity('')" required />
            </div>
            <div class="form-input">
              <label for="description">Description</label>
              <input class="form-control" id="description" rows="5" type="text" name="description" value="${data.description}" oninvalid="this.setCustomValidity('Entrer la description de la recette')" oninput="this.setCustomValidity('')" required />            
            </div>
            <div class="form-input">
              <label for="duration">Duree (min)</label>
              <input class="form-control" id="duration" type="number" min=1 name="duration" value="${data.duration}" oninvalid="this.setCustomValidity('Entrer une duree valide')" oninput="this.setCustomValidity('')" required />
            </div>
            <div class="form-input" >
              <label for="qty">Quantit pour les personnes</label>
              <input class="form-control" id="qty_people" type="number" min=1 name="qty_people" value="${data.qty_people}" oninvalid="this.setCustomValidity('Entrer la quantite pour les personnes')" oninput="this.setCustomValidity('')" required />
            </div>
            <div class="form-input">
              <label for="ingredients">Ingredients</label>
              <input class="form-control" id="ingredients_list" type="text" name="ingredients_list" value="${data.ingredients_list}" oninvalid="this.setCustomValidity('Entrer les ingredients de la recette')" oninput="this.setCustomValidity('')" required />
            </div>
            <div class="form-submit">
              <input class="form-control" id="btnForm" type="button" name="${data.id}" value="Modifier">
            </div>
            </form>
          </article>
        </div>
      </div>
    </div>
  `;
  page.innerHTML= formUpdate;

  let btnUpdate = document.getElementById("btnForm");
  btnUpdate.addEventListener("click", onUpdateRecipe);
}

const onUpdateRecipe = () => {
    let recipeId = document.getElementById("btnForm").name;
    const user = getUserSessionData();

    let recipe = {
        name : document.getElementById("name").value,
        description: document.getElementById("description").value,
        duration: document.getElementById("duration").value,
        qty_people: document.getElementById("qty_people").value,
        ingredients_list : document.getElementById("ingredients_list").value
    }


    fetch("/api/recipes/" + recipeId, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
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
        .then((data) => onRecipeUpdated(data))
        .catch((err) => onError(err));   
    
}

const onRecipeUpdated = (data) => {
    alert("votre recette : " + data.name + " a bien ete modifier");
    console.log("onRecipeUpdate");
    return RedirectUrl("/profile");
}

const onError = (err) => {
    let errorMessage = "Error";
    if (err.message) {
      errorMessage = err.message;
    }
    RedirectUrl("/error", errorMessage);
};

export default UpdatePage;