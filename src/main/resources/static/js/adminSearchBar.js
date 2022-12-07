let users = [];
const searchBar = document.getElementById("search-user");
const userList = document.getElementById("user-list");

// "user data" for testing
for (let i = 0; i < 15; i++) {
    users.push(`user ${i}`);
}
users.push("My User");
users.push("Michele Michele");
users.push("Gustav Mieser");

/**
 * Takes an array of users and adds each user to the list.
 * Adds event listeners for displaying the selected user's name and redirecting to their page.
 * @param users
 */
function createUserList(users) {
    let datalistContent = "";
    for (let i = 0; i < users.length; i++) {
        datalistContent += `<li>${users[i]}</li>`;
    }
    userList.innerHTML = datalistContent;

    const userListItems = userList.getElementsByTagName("li");
    for (let user of userListItems) {
        user.addEventListener("click", () => {
            searchBar.value = user.textContent;
            userList.style.display = "none";
            // Redirect to selected user's page
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
            console.log(response.data)
            for (let data in response.data) {
                // go over each user
                // response.data[data].username/.id
                // TODO: insert users to user array
                // TODO: check if there is any user
                // createUserList(users);
            }
        } else {
            // TODO: show no userdata message
        }

    }).catch((e) => {
    console.log("cannot request data", e)
})