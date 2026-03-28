import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx"; //imported from router.jsx
import { Provider } from "react-redux";
import { store } from "./redux/store.js"; //impoeted from redux store
import { registerSW } from "virtual:pwa-register";

// Register PWA service worker for automatic updates
registerSW({ immediate: true });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
