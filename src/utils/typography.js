import Typography from "typography"

// ref -> https://github.com/KyleAMathews/typography.js/blob/master/packages/typography-theme-alton/src/index.js
const typography = new Typography({
  baseFontSize: "20px",
  scaleRatio: 2,
  baseLineHeight: 1.45,
  googleFonts: [
    {
      name: "Didact Gothic",
      styles: ["200", "300", "400", "500", "600", "700", "800"],
    },
    {
      name: "Montserrat",
      styles: ["200", "300", "400", "500", "600", "700", "800"],
    },
  ],
  headerFontFamily: ["Montserrat", "sans-serif"],
  bodyFontFamily: ["Didact Gothic", "sans-serif"],
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    "h1,h2,h3,h4,h5,h6": {
      lineHeight: 1.1,
    },
    a: {
      textDecoration: "none",
    },
    // "a:hover,a:active": {
    //   color: options.bodyColor,
    // },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
