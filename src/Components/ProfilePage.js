import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

const ProfilePage = () => {
  let page = document.querySelector("#page");
<<<<<<< HEAD
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
          page.innerHTML = "<h3>Vous n'avez encore ajoutez aucune recette.</h3>";
        } else{
          page.innerHTML = "<h3>Mes recettes :</h3>";
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
  e.preventDefault();
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
    // re-render the page after a delete
    .then(ProfilePage())
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


=======
  page.innerHTML = `
  <h4>Vos informations :</h4>
  <div class="container" id="infoUser"></div>
  <h4>Mes recettes :</h4>
  <div class="container text-center" id="theseRecipes"></div>
  `;
  const user = getUserSessionData();
  if (!user) return RedirectUrl("/login");
  let username = user.user.username;
>>>>>>> 04ed319a1d3bc1b38facf7ccfd5f61eb0de80672

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
  console.log(data);
  let infoUser = document.querySelector("#infoUser");
  let table = `
  <div> Pseudo : ${data.username}</div>
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
  alert("Votre recette " + data.name + " a bien été supprimée !");
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