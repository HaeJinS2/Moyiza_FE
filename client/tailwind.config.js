module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        gatherBlue: "#7099F8",
      },
      boxShadow: {
        'cm': '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
        'cms': '0px 0px 5px 0px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        'sans': ['Pretendard'],
      },
      fontWeight: {
        'regular': '500'
      },
    },
  },
  plugins: [],
}
