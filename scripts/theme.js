var root = document.querySelector(':root');
var theme_icon = document.getElementById('theme-icon');

var theme = "light";

var lightcolor = "251, 251, 251";
var darkcolor = "36, 36, 35";

const colors = {
    "light": {
        background: lightcolor,
        foreground: darkcolor
    },
    "dark": {
        background: darkcolor,
        foreground: lightcolor
    }
};

function updateTheme() {
    theme = (theme == "light") ? "dark" : "light";

    root.style.setProperty('--foreground', colors[theme].foreground);
    root.style.setProperty('--background', colors[theme].background);

    if(theme == "light") {
        theme_icon.classList.remove("fa-moon");
        theme_icon.classList.add("fa-sun");
    } else {
        theme_icon.classList.remove("fa-sun");
        theme_icon.classList.add("fa-moon");
    }
}