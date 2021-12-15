import { RedirectUrl } from "./Router.js";

const HomePage = async (search) => {
  let page = document.querySelector("#page");
  page.innerHTML = `
  <div class="container text-center" id="generateRecipes"></div>
  <div class="container text-center" id="recipesList"></div>
  `;

  if (search === undefined) {
    fetch("/api/recipes", {
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
      .then((data) => onRecipesListPage(data))
      .catch((err) => onError(err));
  } else {
    fetch("/api/recipes/" + search, {
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
      .then((data) => onRecipesListPage(data))
      .catch((err) => onError(err));
  }

  let generateRecipes = document.querySelector("#generateRecipes");
  let generateDisplay = `
    <div class="container text-center">
      <h4>Recette aléatoire : </h4>
      <button type="button" class="btn btn-primary" id="btnGenerate">Générer</button>
    </div>
    `;
  generateRecipes.innerHTML = generateDisplay;

  //Bouton pour généré une recette aleatoirement.
  let btnGenerateRecipe = document.getElementById("btnGenerate");
  btnGenerateRecipe.addEventListener("click", onGenerateRecipe);
};

const onRecipesListPage = (data) => {
  let recipesList = document.querySelector("#recipesList");
  if (!data) return;

  let list = `<div class="container">
  <h4>Recettes populaires : </h4>
  <form class="d-flex">
        <input class="form-control form-outline-primary me-2 " type="search" placeholder="Search" aria-label="Search" id="search">
        <button class="btn btn-outline-primary" type="button" id="btnSearch">Search</button>
  </form>
  `;

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
      <button type="button" class="btn btn-primary btn-sm" id="btnDetail">Voir détails</button>
    </div>`;
  });

  list += `</div>`;
  recipesList.innerHTML = list;

  let btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", (onSearchRecipe) => {
    let search = document.getElementById("search").value;
    RedirectUrl("/", search);
  });

  document.querySelectorAll("#btnDetail").forEach((item) => {
    item.addEventListener("click", onRecipeDetail);
  });
};

const onRecipeDetail = (e) => {
  let recipeId = e.target.parentElement.id;
  RedirectUrl("/seerecipe", recipeId);
};

const onGenerateRecipe = () => {
  fetch("/api/recipes/random", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onGenerateRecipesDisplay(data))
    .catch((err) => onError(err));
};

const onGenerateRecipesDisplay = (data) => {
  let generateRecipes = document.querySelector("#generateRecipes");
  if (!data) return;

  let aRecipe = `
  <div class="container text-center">
      <h4>Recette aléatoire : </h4>
      <button type="button" class="btn btn-primary" id="btnGenerate">Générer</button>
  </div>
  <div class="container">
    <div class="border">
        Nom : ${data.name} <br>
        Description : ${data.description} <br>
        Duration : ${data.duration} <br>
        Nombre personnes : ${data.qty_people} <br>
        Date : ${data.creation_date} <br>
        Liste ingrédients : ${data.ingredients_list} <br>
        Pseudo : ${data.username} <br>
        <button type="button" class="btn btn-primary btn-sm" id="btnReduire">Réduire recette</button>
    </div>
  </div>`;
  generateRecipes.innerHTML = aRecipe;

  //Bouton pour généré une recette aleatoirement.
  let btnGenerateRecipe = document.getElementById("btnGenerate");
  btnGenerateRecipe.addEventListener("click", onGenerateRecipe);

  let btnReduireRecipe = document.getElementById("btnReduire");
  btnReduireRecipe.addEventListener("click", (onReduceRecipe) => {
    RedirectUrl("/");
  });
};

const onError = (err) => {
  let errorMessage = "Error";
  if (err.message) {
    errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default HomePage;
