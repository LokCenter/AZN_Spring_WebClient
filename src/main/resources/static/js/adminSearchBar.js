const searchBar = document.getElementById("search-user");
const userList = document.getElementById("user-list");

/**
 * Takes an array of users and adds each user to the list.
 * Adds event listeners for displaying the selected user's name and redirecting to their page.
 * @param users
 */
function createUserList(users) {
    let datalistContent = "";
    for (let i = 0; i < users.length; i++) {
        datalistContent += `<li data-userid="${users[i].id}">${users[i].username}</li>`;
    }
    userList.innerHTML = datalistContent;

    const userListItems = userList.getElementsByTagName("li");

    for (let user of userListItems) {
        user.addEventListener("click", () => {
            searchBar.value = user.textContent;
            userList.style.display = "none";
            // Redirect to selected user's page
            window.location.href = window.location.href.split('?')[0] + '?userid=' + user.dataset.userid
            // set userid to use it on all pages
            localStorage.setItem("id", user.dataset.userid)
        })
    }
}

/**
 * Make user list visible when search bar is focused
 */
searchBar.addEventListener("focus", () => {
    userList.style.display = "block";
})

/**
 * Roundabout way of making the user list invisible, but needed that way to make the user list's event work
 */
window.addEventListener("click", (event) => {
    // Makes the user list invisible if the search input loses focus, but only if you aren't targeting a list item.
    // Checks for "B" tag as well to account for the filter
    if (document.activeElement !== searchBar && (event.target.tagName !== "LI" || event.target.tagName !== "B")) {
        userList.style.display = "none";
    }
})

/**
 * Filters the user list on keyup
 */
searchBar.addEventListener("keyup", () => {
    filterUserList();
})

/**
 * Filters the user list according to the entered search term
 */
function filterUserList() {
    let filter = document.getElementById("search-user").value.toUpperCase();
    let userListContent = userList.getElementsByTagName("li");

    for (let i = 0; i < userListContent.length; i++) {
        let user = userListContent[i].textContent.toUpperCase();
        if (user.indexOf(filter) > -1) {
            userListContent[i].style.display = "";
            let regex = new RegExp(`(${filter})`, "gi");
            let textWithBoldedSubstring = userListContent[i].textContent.replace(regex, "<b>$1</b>");
            userListContent[i].innerHTML = textWithBoldedSubstring;
        } else {
            userListContent[i].style.display = "none";
        }
    }
}

/**
 * Trigger filterTable() when clearing the input by clicking the "x" in those browsers that support it.
 */
searchBar.addEventListener("search", () => {
    if (document.getElementById("filter-input").value === "") filterTable();
})

/**
 * Request all user names and id's
 */
axios.get("/admin/usernameList")
    .then((response) => {
        if (response.data !== '' && (response.data.constructor === Object || response.data.constructor === Array)) {
            if (response.data.length > 0) {
                let users = response.data;
                createUserList(users);
            }
        } else {
            // TODO: show error message
        }

    }).catch((e) => {
    console.log("cannot request data", e)
})