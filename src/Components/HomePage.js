const HomePage = () => {
  let page = document.querySelector("#page");
  let generate = `
  <div class="container text-center">
    <button type="button" class="btn btn-primary" id="btnGenerate" >Générer une recette</button>
  </div>
  `;
  page.innerHTML = "";

  fetch("/api/recipes") // fetch return a promise => we wait for the response
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      console.log(response.json);
      return response.json(); // json() return a promise => we wait for the response
    })
    .then((recipes) => {
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
      });
    });

  //Bouton pour généré une recette aleatoirement.
  let btnGenerateRecipe = document.getElementById("btnGenerate");
  btnGenerateRecipe.addEventListener("click", onGenerateRecipe);
};

const onGenerateRecipe = () => {
  fetch("/api/recipes/random", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
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
    .then((randomRecipe) => {
      console.log(randomRecipe);
    });
};

export default HomePage;
