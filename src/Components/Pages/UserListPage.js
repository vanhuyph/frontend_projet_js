import { RedirectUrl } from "../Router/Router.js";
import { getUserSessionData } from "../../utils/session.js";

let page = document.querySelector("#page");

const UserListPage = () => {
  const user = getUserSessionData();

  if (!user.user.admin) {
    RedirectUrl("/error", "Ressource non autorisée");
  } else
    fetch("/api/users", {
      method: "GET",
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
      .then((data) => {
        if (typeof data === "string") onError(data);
        else onUserList(data);
      })
      .catch((err) => onError(err));
};

const onUserList = (data) => {
  const user = getUserSessionData();
  if (!data) return;

  let table = `
  <div class="container-lg">
  <h2 id="admin-h2">Panel de contrôle</h2>
  <table id="table-admin" class="table table-bordered table-hover">
  <thead>
    <tr>
      <th>Utilisateur</th>
      <th>Email</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    `;

  data.forEach((element) => {
    if (!element.admin) {
      table += `
              <tr id="${element.id}">
                <td>${element.username}</td>
                <td>${element.email}</td>
                <td><button type="button" class="btnDeleteUser" id="btnDeleteUser">Supprimer</button></td>
              </tr>`;
    }
  });

  table += `</tbody>
      </table>
      </div>`;
  page.innerHTML = table;

  document.querySelectorAll("#btnDeleteUser").forEach((item) => {
    item.addEventListener("click", onDeleteUser);
  });
};

const onDeleteUser = (e) => {
  const userId = e.target.parentElement.parentElement.id;
  const user = getUserSessionData();

  fetch("/api/users/" + userId, {
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
    .then((data) => onUserDeleted(data))
    .catch((err) => onError(err));
};

const onUserDeleted = (data) => {
  alert("L'utilisateur " + data.username + " a bien été supprimé !");
  document.getElementById(data.id).remove();
};

const onError = (err) => {
  console.log("UserListPage::onError", err);
  let errorMessage;
  if (err.message) {
    errorMessage = err.message;
  } else errorMessage = err;
  if (errorMessage.includes("jwt expired")) {
    errorMessage += "<br> Veuillez vous reconnecter.";
  }
  RedirectUrl("/error", errorMessage);
};

export default UserListPage;