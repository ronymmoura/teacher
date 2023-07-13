/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: "var(--font-poppins)",
        alt: "var(--font-grandiflora)",
      },
      textColor: {
        primary: "var(--color-primary)",
      },
      backgroundColor: {
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-radix")],
};
