let gdata = localStorage.getItem("mute");
if(gdata == "true") {
    $('#mute').bootstrapToggle('off');
}
else {
    $('#mute').bootstrapToggle('on');
}



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

$(function() {
    $('#mute').change(function() {
      console.log('Toggle: ' + $(this).prop('checked'))
      if($(this).prop('checked')) {
        localStorage.setItem("mute", "false");
      }
      else {
        localStorage.setItem("mute", "true");
      }
    })
})