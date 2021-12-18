import { getUserSessionData } from "../../utils/session.js";
import { RedirectUrl } from "../Router/Router.js";

const ProfilePage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = `
  <div class="container mt-4">
  <h4>Mes informations</h4>
		<div class="main-body">
			<div class="row">
				<div class="col-lg-4">
					<div class="card border-dark">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">
								<img src="https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1-300x300.jpg" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
								<div class="mt-3">
									<h4 id="user-username"></h4>
									<p id="user-email" class="text-secondary mb-1"></p>
								</div>
							</div>
						</div>
					</div>
				</div>
        <div class="col-lg-8">
					<div class="card border-dark">
						<div class="card-body ">
							<div class="row mb-3 text-center" id="theseRecipes">
              
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  `;
  const user = getUserSessionData();
  if (!user) return RedirectUrl("/login");
  let username = user.user.username;

  // get all recipes from its creator
  fetch("/api/recipes/" + username, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onTheseRecipesList(data))
    .catch((err) => onError(err));

  // get information from the user
  fetch("/api/users/" + username, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onInfoUser(data))
    .catch((err) => onError(err));
};

const onInfoUser = (data) => {
  let userUsername = document.querySelector("#user-username");
  let userEmail = document.querySelector("#user-email");
  let profileUsername = `<div>Pseudo : ${data.username}</div>`;
  let profileMail = `<div>Email : ${data.email}</div>`;
  userUsername.innerHTML = profileUsername;
  userEmail.innerHTML = profileMail;
};

const onTheseRecipesList = (data) => {
  let recipesList = document.querySelector("#theseRecipes");
  if(data.length === 0 || !data){
    console.log("in");
    let emptyList = `<div class="container"><h4 class="mb-3">N'hésitez pas à ajouter vos propres recettes</h4>`;
    recipesList.innerHTML = emptyList;
    return;
  };

  let list = `<div class="container"><h4 class="mb-3">Mes recettes</h4>`;

  data.forEach((recipe) => {
    list += `
    <div class="border" id="${recipe.id}">
      <div class="row mb-3 mt-3">
        <div class="col-sm-3">
          <h6 class="mb-0">Nom :</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          <p>${recipe.name}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <h6 class="mb-0">Description :</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          <p>${recipe.description}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <h6 class="mb-0">Durée (min) :</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          <p>${recipe.duration}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <h6 class="mb-0">Quantité :</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          <p>${recipe.qty_people} personnes</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <h6 class="mb-0">Date de création :</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          <p>${recipe.creation_date}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <h6 class="mb-0">Ingrédients :</h6>
        </div>
        <div class="col-sm-9 text-secondary">
          <p>${recipe.ingredients_list}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <h6 class="mb-0"></h6>
        </div>
        <div class="col-sm-9 text-secondary">
          <button type="button" class="btn btn-primary btn-sm" id="btnUpdateRecipe">Modifier</button>
          <button class="delete-button-profile" type="submit" id="btnDeleteRecipe" value="${recipe.id}">Supprimer</button>
        </div>
      </div>
    </div>
    `;
  });
  list += `</div>`;
  recipesList.innerHTML = list;

  document.querySelectorAll("#btnDeleteRecipe").forEach((item) => {
    console.log("Delete recipe id ", item.value);
    item.addEventListener("click", onDeleteRecipe);
  });
};

const onDeleteRecipe = (e) => {
  let recipeId = e.currentTarget.value;
  console.log(recipeId);
  const user = getUserSessionData();

  fetch("/api/recipes/" + recipeId, {
    method: "DELETE",
    headers: {
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
    .then((data) => onDeletedRecipes(data))
    .catch((err) => onError(err));
};

const onDeletedRecipes = (data) => {
  alert("Votre recette " + data.name + " a bien été supprimée !");
  document.getElementById(data.id).remove();
};

const onError = (err) => {
  let errorMessage = "Error";
  if (err.message) {
    errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default ProfilePage;