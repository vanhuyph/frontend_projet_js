let homePage = `
<div class="container-fluid">
      <div class="container m-5">
        <div class="row ">
          <article
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg12 text-center"
          >
          <h3>MyCMS</h3>
          <p>
            Le Lorem Ipsum est simplement du faux texte employé dans la composition et
            la mise en page avant impression. Le Lorem Ipsum est le faux texte standard
            de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
            ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
            Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique
            informatique, sans que son contenu n'en soit modifié.
          </p>
          <button type="button" class="btn btn-primary">Generate</button>
          </article>
        </div>
</div>

`;
const HomePage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
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
      name.innerHTML = recipe.name;
      description.innerHTML = recipe.description;
      duration.innerHTML = recipe.duration;
      qty_people.innerHTML = recipe.qty_people;
      creation_date.innerHTML = recipe.qty_people;
      ingredients_list.innerHTML = recipe.ingredients_list;
      page.appendChild(name);
      page.appendChild(description);
      page.appendChild(duration);
      page.appendChild(qty_people);
      page.appendChild(creation_date);
      page.appendChild(ingredients_list);
      
    })
  })

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
