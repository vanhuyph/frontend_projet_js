import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

let profilePage = `<h2>Mes recettes : </h2>`;


const ProfilePage = () => {
    let page = document.querySelector("#page");
    let user = getUserSessionData();
    if (!user) return RedirectUrl("/login");
    console.log(user);
    // page.innerHTML = "";
    page.innerHTML = profilePage;
    console.log(user.user.username);
    fetch("/api/recipes?username=" + user.user.username)
    .then((response) => {
        if(!response.ok)
        throw new error(
            "fetch error : " + response.status + " : " + response.statusText
        );
        console.log(response.json);
        return response.json();
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

export default ProfilePage