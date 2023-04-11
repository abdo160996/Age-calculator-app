const themeBtn = document.querySelector("#theme-switch");

//checker
document.addEventListener("DOMContentLoaded", function () {
    const mediaState = window.matchMedia("(prefers-color-scheme:dark)");

    mediaState.matches ? darkMode() : window.localStorage.getItem("theme") === "dark" ? darkMode() : lightMode();
});

//Btn
themeBtn.addEventListener("click", toggleDarkMode);

//apply darkMode
function toggleDarkMode() {
    document.documentElement.classList.contains("dark") ? lightMode() : darkMode()

}
function darkMode() {

    document.documentElement.classList.add("dark");
    window.localStorage.setItem("theme", "dark");
}
function lightMode() {

    document.documentElement.classList.remove("dark");
    window.localStorage.setItem("theme", "light");
}
