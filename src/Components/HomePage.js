<<<<<<< HEAD
const HomePage = async () => {
  let page = document.querySelector("#page");
  page.innerHTML = "";
  try {
    fetch("/api/recipes") // fetch return a promise => we wait for the response
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        console.log(response.json)
        return response.json(); // json() return a promise => we wait for the response
      }).then((recipes) => {
        console.log(recipes)
        recipes.forEach((recipe) => {
          const name = document.createElement("div");
          const description = document.createElement("div");
          const duration = document.createElement("div");
          const qty_people = document.createElement("div");
          const creation_date = document.createElement("div");
          const ingredients_list = document.createElement("div");
          const username = document.createElement("div");
          name.innerHTML = recipe.name;
          description.innerHTML = recipe.description;
          duration.innerHTML = recipe.duration;
          qty_people.innerHTML = recipe.qty_people;
          creation_date.innerHTML = recipe.qty_people;
          ingredients_list.innerHTML = recipe.ingredients_list;
          username.innerHTML = recipe.username;
          page.appendChild(name);
          page.appendChild(description);
          page.appendChild(duration);
          page.appendChild(qty_people);
          page.appendChild(creation_date);
          page.appendChild(ingredients_list);
          page.appendChild(username);
        })
      })
  } catch (error) {
    console.error("recipeView::error: ", error);
  }
  // try {
  //   // hide data to inform if the pizza menu is already printed
  //   const response = await fetch("/api/recipes"); // fetch return a promise => we wait for the response

  //   if (!response.ok) {
  //     // status code was not 200, error status code
  //     throw new Error(
  //       "fetch error : " + response.status + " : " + response.statusText
  //     );
  //   }
  //   const recipes = await response.json(); // json() returns a promise => we wait for the data
  //   // create a wrapper to provide a responsive table
  //   const tableWrapper = document.createElement("div");
  //   tableWrapper.className = "table-responsive pt-5";
  //   // create an HTMLTableElement dynamically, based on the pizzas data (Array of Objects)
  //   const table = document.createElement("table");
  //   table.className = "table table-hover";
  //   tableWrapper.appendChild(table);
  //   // deal with header
  //   const thead = document.createElement("thead");
  //   const header = document.createElement("tr");
  //   thead.appendChild(header);
  //   const header1 = document.createElement("th");
  //   header1.innerText = "Nom de recette";
  //   const header2 = document.createElement("th");
  //   header2.innerText = "Description";
  //   const header3 = document.createElement("th");
  //   header3.innerText = "Duration (min)";
  //   header.appendChild(header1);
  //   header.appendChild(header2);
  //   header.appendChild(header3);
  //   table.appendChild(thead);
  //   // deal with data rows for tbody
  //   const tbody = document.createElement("tbody");
  //   recipes.forEach((recipe) => {
  //     const line = document.createElement("tr");
  //     const titleCell = document.createElement("td");
  //     titleCell.innerText = recipe.name;
  //     line.appendChild(titleCell);
  //     const descriptionCell = document.createElement("td");
  //     descriptionCell.innerText = recipe.description;
  //     line.appendChild(descriptionCell);
  //     const durationCell = document.createElement("td");
  //     durationCell.innerText = recipe.duration;
  //     line.appendChild(durationCell);

  //     tbody.appendChild(line);
  //   });
  //   table.appendChild(tbody);
  //   // add the HTMLTableElement to the main, within the #page div
  //   page.appendChild(tableWrapper);
  // } catch (error) {
  //   console.error("recipeView::error: ", error);
  // }
=======
import { RedirectUrl } from "./Router.js";
>>>>>>> 04ed319a1d3bc1b38facf7ccfd5f61eb0de80672

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

<<<<<<< HEAD

// anime({
//   targets: "#vm path",
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: "easeInOutSine",
//   duration: 1500,
//   delay: function (el, i) {
//     return i * 250;
//   },
//   direction: "alternate",
//   loop: true,
// });
=======
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
>>>>>>> 04ed319a1d3bc1b38facf7ccfd5f61eb0de80672

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
  <div class="container">
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
  btnReduceRecipe.addEventListener("click", (onReduceRecipe) => {
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