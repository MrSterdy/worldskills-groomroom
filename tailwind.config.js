import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    mode: "jit",
    theme: {
        extend: {
            fontFamily: {
                merriweather: ["Merriweather"],
                "open-sans": ["OpenSans"],
                sans: ["OpenSans", ...fontFamily.sans]
            }
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light"]
    }
};
