/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
      },
      maxWidth: {
        '64': '16rem', // Replace '16rem' with your desired maximum width value
      },
      colors: {
        main_bg_light: "#F8F8FC",
        main_bg_dark: "#121212",
        sidemenu_bg_light: "#ffff",
        sidemenu_bg_dark: "#0D0D0D",
        btnBorder: "#E4E1E1",
        mainIconColor: "#7E7979",
        cardLight: "#ffff",
        cardDark: "#1E1E1E",
        dividerDark: "#7E7979",
        dividerLight: "#DFD4D4",
        arrowBtnBgLight: "#292D32",
        arrowBtnBgDark: "#1E1E1E",
        textContainerLight: "#FAFAFA",
        textContainerDark: "#262626",
        iconColorLight: "#1000C8",
        iconColorDark: "#607D8B",
        userContainerDark: "#333333"
      }
    },
  },
  plugins: [],
});
