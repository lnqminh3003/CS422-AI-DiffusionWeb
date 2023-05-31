/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mybg':"url('https://arbmarvel.s3.us-west-1.amazonaws.com/bg-about.png?fbclid=IwAR3tnCJBsoGrdnX6U3bFezzcylk59F68iNHmiCLrUOKuoxWi9iCU4T2FrH8')"
      },
      fontSize: {
        small: '0.6rem',
        meidum: '0.7rem',
      },
      colors: {
        textMau: 'rgb(253 224 71)',
        textXanh: 'rgb(0,191,255)',
        textHong : '#e5989b',
        textVang : 'rgb(250 202 21)',
        hi: 'rgb(47,73,120)'
      },
      scale: {
        'mayBay': '0.3',
        'base': '0.3',
      },
      screens: {
        'pc': '1650px',
      }
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
