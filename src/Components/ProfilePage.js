import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

const ProfilePage = () => {
  let page = document.querySelector("#page");
  let user = getUserSessionData();
  if (!user) return RedirectUrl("/login");
  console.log(user);
  page.innerHTML = "";
  console.log(user.user.username);
  try {
    fetch("/api/recipes?username=" + user.user.username)
      .then((response) => {
        if (!response.ok)
          throw new error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        console.log(response.json);
        return response.json();
      }).then((recipes) => {
        if(recipes.length === 0){
          page.innerHTML = "<h2>Vous n'avez encore ajoutez aucune recette.</h2>";
        } else{
          page.innerHTML = "<h2>Mes recettes :</h2>";
        }
        console.log(recipes)
        recipes.forEach((recipe) => {
          const name = document.createElement("div");
          const description = document.createElement("div");
          const duration = document.createElement("div");
          const qty_people = document.createElement("div");
          const creation_date = document.createElement("div");
          const ingredients_list = document.createElement("div");
          const delete_button = document.createElement("input");
          const recipeId = document.createElement("div");
          name.innerHTML = recipe.name;
          description.innerHTML = recipe.description;
          duration.innerHTML = recipe.duration;
          qty_people.innerHTML = recipe.qty_people;
          creation_date.innerHTML = recipe.qty_people;
          ingredients_list.innerHTML = recipe.ingredients_list;
          recipeId.id = "recipe_id";
          recipeId.type = "hidden";
          recipeId.value = recipe.id;
          console.log("recipe id : ", recipeId.value);
          delete_button.id = "delete_btn";
          delete_button.value = "Supprimer";
          delete_button.data = recipeId.value;
          delete_button.type = "submit";
          delete_button.className = "btn btn-danger";
          console.log("btn recipe id : ", delete_button.data);
          delete_button.addEventListener("click", onDeleteRecipe);
          page.appendChild(name);
          page.appendChild(description);
          page.appendChild(duration);
          page.appendChild(qty_people);
          page.appendChild(creation_date);
          page.appendChild(ingredients_list);
          page.appendChild(delete_button);
        })
      })
  } catch (error) {
    console.error("recipeView::error: ", error);
  }
};

const onDeleteRecipe = (e) => {
  const targetedRecipeId = e.target.data;
  const user = getUserSessionData();
  console.log(targetedRecipeId);

  fetch("/api/recipes/" + targetedRecipeId, {
    method: "DELETE",
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
    .catch((err) => onError(err));
};

const onError = (err) => {
  console.log("DeleteRecipe::onError", err);
  let errorMessage;
  if (err.message) {
    errorMessage = err.message;
  } else errorMessage = err;
  RedirectUrl("/error", errorMessage);
};



export default ProfilePage