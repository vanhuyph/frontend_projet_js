import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";

const AddRecipePage = () => {

    let user = getUserSessionData();
    if (!user) return RedirectUrl("/login");
    console.log(user);
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = `<h2>Ajoutez votre propre recette personnalisé</h2>`;

    // create the "Add a recipe" form
    const form = document.createElement("form");
    form.className = "p-5";
    const name = document.createElement("input");
    name.type = "text";
    name.id = "name";
    name.placeholder = "Nom de la recette";
    name.required = true;
    name.className = "form-control mb-3";

    const description = document.createElement("textarea");
    description.id = "description";
    description.required = true;
    description.rows = 5;
    description.placeholder = "Étapes de la réalisation";
    description.className = "form-control mb-3";

    const duration = document.createElement("input");
    duration.type = "number";
    duration.placeholder = "Temps de la réalisation (min)"
    duration.min = 1;
    duration.id = "duration";
    duration.required = true;
    duration.className = "form-control mb-3";

    const qty_people = document.createElement("input");
    qty_people.type = "number";
    qty_people.placeholder = "Quantité pour les personnes"
    qty_people.min = 1;
    qty_people.id = "qty_people";
    qty_people.required = true;
    qty_people.className = "form-control mb-3";

    const dateTimeNow = new Date();
    const date = dateTimeNow.toLocaleDateString('en-GB');
    console.log(dateTimeNow.toLocaleDateString('en-GB'));

    const creation_date = document.createElement("input");
    creation_date.type = "hidden";
    creation_date.id = "creation_date";
    creation_date.value = date;

    const ingredients_list = document.createElement("input");
    ingredients_list.type = "text";
    ingredients_list.id = "ingredients_list";
    ingredients_list.placeholder = "Ingrédients de la recette"
    ingredients_list.required = true;
    ingredients_list.className = "form-control mb-3";

    const username = document.createElement("input");
    username.type = "hidden";
    username.id = "username";
    username.value = user.user.username;
    
    console.log(user.user.username);
   
    const submit = document.createElement("input");
    submit.value = "Ajouter";
    submit.type = "submit";
    submit.className = "btn btn-danger";
    form.appendChild(name);
    form.appendChild(description);
    form.appendChild(duration);
    form.appendChild(qty_people);
    form.appendChild(creation_date);
    form.appendChild(ingredients_list);
    form.appendChild(username);
    form.appendChild(submit);

    form.addEventListener("submit", onSubmit);
    pageDiv.appendChild(form);
}

 const onSubmit = async (e) => {
    e.preventDefault();
    let user = getUserSessionData();
    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const duration = document.getElementById("duration");
    const qty_people = document.getElementById("qty_people");
    const creation_date = document.getElementById("creation_date");
    const ingredients_list = document.getElementById("ingredients_list");
    const username = document.getElementById("username");
    console.log("forms values : ", name.value, description.value, duration.value, qty_people.value, creation_date.value, ingredients_list.value, username.value);
    try {
        const options = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({
                name: name.value,
                description: description.value,
                duration: duration.value,
                qty_people: qty_people.value,
                creation_date: creation_date.value,
                ingredients_list: ingredients_list.value,
                username: username.value
            }), // body data type must match "description-Type" header
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        };

        const response = await fetch("/api/recipes", options); // fetch return a promise => we wait for the response

        if (!response.ok) {
            throw new Error(
                "fetch error : " + response.status + " : " + response.statusText
            );
        }
        const recipe = await response.json(); // json() returns a promise => we wait for the data
        console.log("recipe added : ", user);

        // call the HomePage via the Router
        RedirectUrl("/");
    } catch (error) {
        console.error("AddRecipePage::error: ", error);
    }
}

export default AddRecipePage;