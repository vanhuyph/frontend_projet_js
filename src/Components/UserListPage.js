import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";

let page = document.querySelector("#page");

const UserListPage = () => {
  const user = getUserSessionData();

  if (!user.user.admin) {
    RedirectUrl("/error", "Resource not authorized. Please login as admin.");
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
  <div class="container-fluid">
    <div class="container m-5">
      <div id="tableUsers" class="table-responsive mt-3">
      <table class="table">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`;

  data.forEach((element) => {
    if (!element.admin) {
      table += `
              <tr id="${element.id}">
                <td >${element.username}</td>
                <td >${element.email}</td>
                <td ><button type="button" class="btn btn-primary" id="btnDeleteUser">Delete</button></td>
              </tr>`;
    }
  });

  table += `</tbody>
      </table>
      </div>
    </div>
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
    .then((data) => UserListPage())
    .catch((err) => onError(err));
};

const onError = (err) => {
  console.log("UserListPage::onError", err);
  let errorMessage;
  if (err.message) {
    errorMessage = err.message;
  } else errorMessage = err;
  if (errorMessage.includes("jwt expired")) {
    errorMessage += "<br> Please logout first, then login.";
  }
  RedirectUrl("/error", errorMessage);
};

export default UserListPage;
