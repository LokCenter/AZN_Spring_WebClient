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
 * @param users
 */
function createUserList(users) {
    let datalistContent = "";
    for (let i = 0; i < users.length; i++) {
        datalistContent += `<li>${users[i]}</li>`;
    }
    userList.innerHTML = datalistContent;
}

/**
 * Make user list visible when search bar is focused
 */
searchBar.addEventListener("focus", () => {
    userList.style.display = "block";
})

/**
 * Make user list invisible when search bar isn't focused
 */
searchBar.addEventListener("blur", () => {
    userList.style.display = "none";
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

createUserList(users);