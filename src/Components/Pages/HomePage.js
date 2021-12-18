import { RedirectUrl } from "../Router/Router.js";

let page = document.querySelector("#page");
let homepage = `
    <div class="container text-center">
      <h4>Recette aléatoire : </h4>
      <button type="button" class="btn btn-primary" id="btnGenerate">Générer</button>
    </div>
    <div class="container text-center" id="generateRecipes"></div>
    <div class="container" id="recipesList"></div>
`;

/***************************************************************************************
 *    Title: AnimeJS documentation
 *    Availability: https://animejs.com/documentation/#JSobjProp
 *
 ***************************************************************************************/
function loadingTimeAnimation() {
  console.log("Animation");
  let generateRecipes = document.querySelector("#generateRecipes");
  const myObject = {
    "Génération de la recette en cours": "0%",
  };
  anime({
    targets: myObject,
    "Génération de la recette en cours": "100%",
    easing: "linear",
    duration: 1500,
    round: 1,
    update: function () {
      console.log("Display loading");
      generateRecipes.innerHTML = JSON.stringify(myObject);
    },
  });
}

const HomePage = async (search) => {
  page.innerHTML = homepage;
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

  // button generating a recipe randomly
  let btnGenerateRecipe = document.getElementById("btnGenerate");
  btnGenerateRecipe.addEventListener("click", () => {
    loadingTimeAnimation();
    setTimeout(() => {
      onGenerateRecipe();
    }, 2200);
  });
};

const onRecipesListPage = (data) => {
  let recipesList = document.querySelector("#recipesList");
  if (!data) return;

  let list = `<div class="container">
  <h4>Liste des recettes : </h4>
  <form class="d-flex">
        <input class="form-control form-outline-primary me-2 " type="search" placeholder="Rechercher une recette" aria-label="Search" id="search">
        <button class="btn btn-outline-primary" type="submit" id="btnSearch">Rechercher</button>
  </form>
  `;

  data.forEach((recipe) => {
    list += `
    <div class=" row border m-3" style="border: 1px solid #b9b9b9; border-radius: 10px; 
    box-shadow: 1px 1px 50px 1px#dadada; padding:10px 10px;" >
      <article
              class="
                col-xs-12 col-sm-12 col-md-9 col-lg9 " 
            >
          <h4 style="margin-top:10px;">${recipe.name}</h4>
          Recette pour ${recipe.qty_people} personnes <br>
          Durée (min) : ${recipe.duration} <br>
          <div style="margin-top: 15px; margin-bottom:10px; float:left;" id="${recipe.id}">
            <button type="button" class="btn btn-outline-primary" id="btnDetail">Détails</button>
          </div>

          <div style="margin-top: 15px; text-align:right; font-size:12px; color:grey; float:right;">
          Créateur : ${recipe.username} <br>
          Date de création : ${recipe.creation_date}
          </div>
      </article>
       <article
              class="
                col-xs-12 col-sm-12 col-md-3 col-lg3 text-center " id="${recipe.id}"
            >
      </article>
    </div>`;
  });

  list += `</div>`;
  recipesList.innerHTML = list;
  let btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", () => {
    let search = document.getElementById("search").value;
    RedirectUrl("/", search);
  });

  document.querySelectorAll("#btnDetail").forEach((item) => {
    item.addEventListener("click", onRecipeDetail);
  });
};

const onRecipeDetail = (e) => {
  let recipeId = e.target.parentElement.id;
  console.log(recipeId);
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
  <div class="container" id="container-reduce">
    <div class="border">
        Nom : ${data.name} <br>
        Description : ${data.description} <br>
        Durée (min) : ${data.duration} <br>
        Recette pour ${data.qty_people} personnes <br>
        Date de création : ${data.creation_date} <br>
        Liste d'ingrédients : ${data.ingredients_list} <br>
        Créateur : ${data.username} <br>
        <button type="button" class="btn btn-primary btn-sm" id="btnReduce">Réduire recette</button>
    </div>
  </div>`;
  generateRecipes.innerHTML = aRecipe;
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
