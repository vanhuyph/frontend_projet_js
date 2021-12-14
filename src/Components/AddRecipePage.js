import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

const AddRecipePage = () => {
  const user = getUserSessionData();
  if (!user) return RedirectUrl("/login");
  const page = document.querySelector("#page");

  let form = `
   <div class="container-fluid">
      <div class="container m-5">
        <div class="row ">
          <article
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg12"
          >
            <form>
            <div class="form-group">
              <input class="form-control" id="name" type="text" name="name" placeholder="Nom de la recette" required />
            </div>
            <div class="form-group">
              <input class="form-control" id="description" type="text" name="description" placeholder="Description de la recette" required />
            </div>
            <div class="form-group">
              <input class="form-control" id="duration" type="number" name="duration" placeholder="Durée de la recette" required />
            </div>
            <div class="form-group">
              <input class="form-control" id="qty_people" type="number" name="qty_people" placeholder="Quantité pour les personnes" required />
            </div>
            <div class="form-group">
              <input class="form-control" id="ingredients_list" type="text" name="ingredients_list" placeholder="Ingrédients de la recette" required />
            </div>
         
            <button class="btn btn-danger" id="btnForm" type="submit">Ajouter</button>
            </form>
          </article>
        </div>
      </div>
    </div>
  `;
  page.innerHTML = form;
  let btnForm = document.getElementById("btnForm");
  btnForm.addEventListener("click", onSubmit);
};

const onSubmit = (e) => {
  e.preventDefault();
  const user = getUserSessionData();

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  let recipe = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    duration: document.getElementById("duration").value,
    qty_people: document.getElementById("qty_people").value,
    creation_date: dateTime,
    ingredients_list: document.getElementById("ingredients_list").value,
    username: user.user.username,
  };

  fetch("/api/recipes/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(recipe), // body data type must match "Content-Type" header
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
    .then((data) => onRecipeAdded(data))
    .catch((err) => onError(err));

  //   const name = document.getElementById("name");
  //   const description = document.getElementById("description");
  //   const duration = document.getElementById("duration");
  //   const qty_people = document.getElementById("qty_people");
  //   const creation_date = document.getElementById("creation_date");
  //   const ingredients_list = document.getElementById("ingredients_list");
  //   const username = document.getElementById("username");
  //   console.log("in");
  //   console.log(
  //     "forms values : ",
  //     name.value,
  //     description.value,
  //     duration.value,
  //     qty_people.value,
  //     creation_date.value,
  //     ingredients_list.value,
  //     username.value
  //   );
  //   try {
  //     const options = {
  //       method: "POST", // *GET, POST, PUT, DELETE, etc.
  //       body: JSON.stringify({
  //         name: name.value,
  //         description: description.value,
  //         duration: duration.value,
  //         qty_people: qty_people.value,
  //         creation_date: creation_date.value,
  //         ingredients_list: ingredients_list.value,
  //         username: username.value,
  //       }), // body data type must match "description-Type" header
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: user.token,
  //       },
  //     };

  //     const response = await fetch("/api/recipes", options); // fetch return a promise => we wait for the response

  //     if (!response.ok) {
  //       throw new Error(
  //         "fetch error : " + response.status + " : " + response.statusText
  //       );
  //     }
  //     const recipe = await response.json(); // json() returns a promise => we wait for the data
  //     console.log("recipe added : ", user);

  //     // call the HomePage via the Router
  //     RedirectUrl("/");
  //   } catch (error) {
  //     console.error("AddRecipePage::error: ", error);
  //   }
};

const onRecipeAdded = (data) => {
  alert("La recette : " + data.name + " a bien été ajoutée");
  RedirectUrl("/");
};

const onError = (err) => {
  let errorMessage = "Error";
  if (err.message) {
    errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default AddRecipePage;
