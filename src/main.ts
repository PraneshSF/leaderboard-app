import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";

// Import Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faTrophy,
  faMagnifyingGlass,
  faCircleXmark,
  faXmark,
  faCirclePlus,
  faCircleMinus,
  faEye,
  faArrowUpZA,
  faArrowDownAZ,
  faArrowUp19,
  faArrowDown91,
} from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(
  faPlus,
  faMinus,
  faTrash,
  faTrophy,
  faMagnifyingGlass,
  faCircleXmark,
  faXmark,
  faCirclePlus,
  faCircleMinus,
  faEye,
  faArrowUpZA,
  faArrowDownAZ,
  faArrowUp19,
  faArrowDown91
);

const app = createApp(App);

app.use(createPinia());

// Register FontAwesomeIcon globally
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
