const nav = document.getElementsByClassName("nav-main")[0];

// Differentiates the currently viewed page from the other ones.
// Color needs to be set manually because somehow it doesn't want to accept that property from the CSS file.
if (location.href.includes("monthplan")) {
    setNavItemsInactive();
    nav.children[0].className = "nav-active";
    nav.children[0].style.color = "var(--clr-accent)"
} else if (location.href.includes("overview")) {
    setNavItemsInactive();
    nav.children[1].className = "nav-active";
    nav.children[1].style.color = "var(--clr-accent)"
}
// Don't need to check for admin panel since it doesn't have this nav bar

/**
 * Sets the class of all nav items to "inactive" and resets the color accordingly.
 */
function setNavItemsInactive() {
    for (let i = 0; i < nav.length; i++) {
        nav.children[i].className = "nav-inactive";
        nav.children[i].style.color = "var(--clr-light)";
    }
}