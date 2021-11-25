import { Router } from "./Components/Router.js";
import Navbar from "./Components/Navbar.js";

/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import "bootstrap/dist/css/bootstrap.css";
/* load bootstrap module (JS) */
import "bootstrap";
/* load animejs module */
import "animejs/lib/anime.es.js";

Navbar();

Router();
