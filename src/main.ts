import "./app.css";
import App from "./App.svelte";
import { authorizeWithUserAndPass } from "./auth";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
