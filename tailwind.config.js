import {nextui} from '@nextui-org/theme'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: "320px",
      "2xs": "430px",
      "3xs": "520px",
      sm: "640px",
      md: "768px",
      mdb: "880px",
      lg: "1024px",
      lgb: "1175px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1760px",
    },
    fontFamily: {
      poppinsLight: ["Poppins-Light"],
      poppinsRegular: ["Poppins-Regular"],
      poppinsMedium: ["Poppins-Medium"],
      poppinsSemiBold: ["Poppins-SemiBold"],
      poppinsBold: ["Poppins-Bold"],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primaryGreen: "#00FF6B",
        primaryGray: "#B6B6B6",
        primaryGray2: "#F4F4F4",
        primaryBg: "#F3F4F7",
        darkPrimaryBg: "#1B1B1B",
        success: {
          900: "#007A64",
          800: "#00936A",
          700: "#00B771",
          600: "#00DB71",
          500: "#00FF6B",
          400: "#3FFF7C",
          300: "#66FF87",
          200: "#99FFA5",
          10: "#CCFFCD",
        },
        warning: {
          900: "#775E01",
          800: "#907402",
          700: "#B39304",
          600: "#B39304",
          500: "#F9D509",
          400: "#FBE245",
          300: "#FDEB6A",
          200: "#FEF49C",
          10: "#FEFACD",
        },
        info: {
          900: "#0D1674",
          800: "#16228C",
          700: "#2333AE",
          600: "#3348D0",
          500: "#4660F2",
          400: "#7389F7",
          300: "#90A3FB",
          200: "#B5C3FD",
          10: "#DAE1FE",
        },
        danger: {
          900: "#7A1028",
          800: "#931B2C",
          700: "#B72B33",
          600: "#DB413E",
          500: "#FF6756",
          400: "#FF9780",
          300: "#FFB499",
          200: "#FFD2BB",
          10: "#FFEBDD",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [addVariablesForColors, 
            nextui(), 
            require("tailwindcss-animate"),
            function ({ addVariant }) {
              addVariant("child", "& > *");
              addVariant("child-hover", "& > *:hover");
            },
          ],
};
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
