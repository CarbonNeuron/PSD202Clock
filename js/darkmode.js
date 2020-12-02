document.addEventListener('colorschemechange', (e) => {
    console.log(`Color scheme changed to ${e.detail.colorScheme}.`);
    if(e.detail.colorScheme == "light") {
        $("#StickyNavBar").removeClass("navbar-dark bg-dark");
        $("#StickyNavBar").addClass("navbar-light bg-light");
    }
    else {
        $("#StickyNavBar").removeClass("navbar-light bg-light");
        $("#StickyNavBar").addClass("navbar-dark bg-dark");
    }
});

function enableDarkTheme() {
    
    DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
    THEME_TOGGLER.innerHTML = "🌙 Dark";
}

function disableDarkTheme() {
   
    DARK_STYLE_LINK.setAttribute("href", LIGHT_THEME_PATH);
    THEME_TOGGLER.innerHTML = "☀️ Light";
}