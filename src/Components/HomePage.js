import { RedirectUrl } from "./Router.js";

function loadingTimeAnimation() {
  const myObject = {
      'Génération de la recette aléatoire en cours': '0%'
    }
    anime({
      targets: myObject,
      "Génération de la recette aléatoire en cours": '100%',
      easing: 'linear',
      duration: 1000,
      round: 1,
      update: function() {
        page.innerHTML = JSON.stringify(myObject);
      }
    });
}

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

  // button generating a recipe randomly
  let btnGenerateRecipe = document.getElementById("btnGenerate");
  // btnGenerateRecipe.addEventListener("click", () =>{
  //   loadingTimeAnimation();
  //   setTimeout(() => {
      
      
  //   }, 1500);
    

  // });
  btnGenerateRecipe.addEventListener("click", onGenerateRecipe);
};

const onRecipesListPage = (data) => {
  let recipesList = document.querySelector("#recipesList");
  if (!data) return;

  let list = `<div class="container">
  <h4>Recettes populaires : </h4>
  <form class="d-flex">
        <input class="form-control form-outline-primary me-2 " type="search" placeholder="Search" aria-label="Search" id="search">
        <button class="btn btn-outline-primary" type="submit" id="btnSearch">Search</button>
  </form>
  `;

  data.forEach((recipe) => {
    list += `
    <div class="border">
      Nom : ${recipe.name} <br>
      Description : ${recipe.description} <br>
      Duration (min) : ${recipe.duration} <br>
      Recette pour ${recipe.qty_people} personnes <br>
      Date de création : ${recipe.creation_date} <br>
      Liste d'ingrédients : ${recipe.ingredients_list} <br>
      Créateur : ${recipe.username} <br>
    </div>`;
  });

  list += `</div>`;
  recipesList.innerHTML = list;

  let btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", (onSearchRecipe) => {
    let search = document.getElementById("search").value;
    RedirectUrl("/", search);
  });
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
  <div class="container" id="container-reduce">
    <div class="border">
        Nom : ${data.name} <br>
        Description : ${data.description} <br>
        Duration (min) : ${data.duration} <br>
        Recette pour ${data.qty_people} personnes <br>
        Date de création : ${data.creation_date} <br>
        Liste d'ingrédients : ${data.ingredients_list} <br>
        Créateur : ${data.username} <br>
        <button type="button" class="btn btn-primary btn-sm" id="btnReduce">Réduire recette</button>
    </div>
  </div>`;
  generateRecipes.innerHTML = aRecipe;

  // button generating a recipe randomly
  let btnGenerateRecipe = document.getElementById("btnGenerate");
  btnGenerateRecipe.addEventListener("click", onGenerateRecipe);

  let btnReduceRecipe = document.getElementById("btnReduce");
  btnReduceRecipe.addEventListener("click", () => {
    document.getElementById("container-reduce").innerHTML = "";
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