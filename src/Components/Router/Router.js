import HomePage from "../Pages/HomePage.js";
import ErrorPage from "../Pages/ErrorPage.js";
import LoginPage from "../Pages/LoginPage.js";
import LogoutPage from "../Pages/LogoutPage.js";
import RegisterPage from "../Pages/RegisterPage.js";
import AddRecipePage from "../Pages/AddRecipePage.js";
import ProfilePage from "../Pages/ProfilePage.js";
import UserListPage from "../Pages/UserListPage.js";
import SeeRecipePage from "../Pages/SeeRecipePage.js";
import AboutUsPage from "../Pages/AboutUsPage.js";
import UpdatePage from "../Pages/UpdatePage.js";

const routes = {
  "/": HomePage,
  "/error": ErrorPage,
  "/login": LoginPage,
  "/logout": LogoutPage,
  "/register": RegisterPage,
  "/addrecipe": AddRecipePage,
  "/profile": ProfilePage,
  "/users": UserListPage,
  "/seerecipe": SeeRecipePage,
  "/aboutus": AboutUsPage,
  "/updateRecipe": UpdatePage,
};

let navBar = document.querySelector("#navBar");
let componentToRender;

// dictionnary of routes
const Router = () => {
  /* manage to route the right component when the page is loaded */
  window.addEventListener("load", (e) => {
    componentToRender = routes[window.location.pathname];
    if (!componentToRender)
      return ErrorPage(
        new Error(
          "The " + window.location.pathname + " ressource does not exist."
        )
      );
    componentToRender();
  });

  /* manage click on the navBar*/
  const onNavigate = (e) => {
    let uri;
    if (e.target.tagName === "A") {
      e.preventDefault();
      // To get a data attribute through the dataset object, get the property by the part of the attribute name after data- (note that dashes are converted to camelCase).
      uri = e.target.dataset.uri;
    }
    if (uri) {
      // use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
      window.history.pushState({}, uri, window.location.origin + uri);
      // render the requested component
      // for the components that include JS, we want to assure that the JS included is not runned when the JS file is charged by the browser
      // therefore, those components have to be either a function or a class
      componentToRender = routes[uri];
      if (routes[uri]) {
        componentToRender();
      } else {
        ErrorPage(new Error("The " + uri + " ressource does not exist"));
      }
    }
  };

  navBar.addEventListener("click", onNavigate);

  // Display the right component when the user use the browsing history
  window.addEventListener("popstate", () => {
    componentToRender = routes[window.location.pathname];
    componentToRender();
  });
};

const RedirectUrl = (uri, data) => {
  // use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
  window.history.pushState({}, uri, window.location.origin + uri);
  // render the requested component
  // for the components that include JS, we want to assure that the JS included is not runned when the JS file is charged by the browser
  // therefore, those components have to be either a function or a class
  componentToRender = routes[uri];
  if (routes[uri]) {
    if (!data) componentToRender();
    else componentToRender(data);
  } else {
    ErrorPage(new Error("The " + uri + " ressource does not exist"));
  }
};

export { Router, RedirectUrl };