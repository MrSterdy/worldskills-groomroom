import { fontFamily } from "tailwindcss/defaultTheme";

import themes from "daisyui/src/theming/themes";

export default {
    mode: "jit",
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        fontFamily: {
            merriweather: ["Merriweather"],
            "open-sans": ["OpenSans"],
            sans: ["OpenSans", ...fontFamily.sans]
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            light: {
                ...themes["[data-theme=light]"],
                primary: "#f39bc3",
                "primary-content": "#fff",
                secondary: "#a155b9"
            }
        }]
    }
};
