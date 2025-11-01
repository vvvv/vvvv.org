import { createApp } from "vue";
import LocationSetter from "./LocationSetter.vue";

if (import.meta.env.DEV)
{
    import("@/styles/bootstrap.min.css");
    import("@scss/main.scss");
    import("@css/creative.css");
}

import '../src/styles/style.scss'

createApp(LocationSetter).mount("#app");