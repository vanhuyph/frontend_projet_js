import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";
import { removeSessionData } from "../utils/session.js";

const LogoutPage = () => {
  removeSessionData();
  // re-render the navbar for a non-authenticated user
  Navbar();
  RedirectUrl("/");
};

export default LogoutPage;