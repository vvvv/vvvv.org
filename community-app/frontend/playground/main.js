import { createApp } from "vue";
import locationUpdater from "./feature/locationUpdater.vue";
import MapTester from "./MapTester.vue";

if (import.meta.env.DEV)
{
    import("@/styles/bootstrap.min.css");
    import("@scss/main.scss");
    import("@css/creative.css");
}

import '../src/styles/style.scss'

createApp(MapTester).mount("#app");