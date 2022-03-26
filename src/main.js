import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas);
library.add(fab);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.mount("#app");
