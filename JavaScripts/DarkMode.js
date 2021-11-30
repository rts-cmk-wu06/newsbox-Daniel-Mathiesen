let DarkTheme = localStorage.getItem('DarkMode')
const darkModeToggle = document.querySelector("#ChangeDarkMode");

// Is darkmode on?

const enableDarkMode = () => {
    // Add Darkmode class to body
    document.body.classList.add("DarkModeTheme")
    // update DarkMode in localStorage
    localStorage.setItem("DarkMode", "enabled")
};

const disableDarkMode = () => {
    // Add Darkmode class to body
    document.body.classList.remove("DarkModeTheme")
    // update DarkMode in localStorage
    localStorage.setItem("DarkMode", null)
};

if (DarkTheme === "enabled"){
    enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    DarkTheme = localStorage.getItem("DarkMode");
    if (DarkTheme !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
