export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
                        "primary": "#2c7777",
                        "secondary": "#5e8787",
                        "background-light": "#fcfcfd",
                        "background-dark": "#212c2c",
                    },
                    textSize: {
                        "xs": "0.75rem",
                        "sm": "0.875rem",
                        "base": "1rem",
                        "lg": "1.125rem",
                        "xl": "1.25rem",
                        "2xl": "1.5rem",
                        "3xl": "1.875rem",
                        "4xl": "2.25rem",
                        "5xl": "3rem",
                        "6xl": "4rem",
                    },
                    textColor: {
                        "primary": "#2c7777",
                        "secondary": "#5e8787",
                        "background-light": "#fcfcfd",
                        "background-dark": "#212c2c",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },},
  },
}
