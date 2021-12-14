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

};




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

export default HomePage;
