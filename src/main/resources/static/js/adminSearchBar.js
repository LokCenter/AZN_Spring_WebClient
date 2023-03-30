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
        datalistContent += `<li data-userid="${users[i].id}" data-username="${users[i].username}">${users[i].username}</li>`;
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
            localStorage.setItem("name", user.dataset.username)
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
 * Makes the user list invisible if the search input loses focus
 */
window.addEventListener("click", (event) => {
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
 * Trie data structure from the user list and returns it.
 * @param users
 * @returns Trie
 */
function buildUserTrie(users) {
    const root = {};
    for (const { username } of users) {
        let currentNode = root;
        for (const letter of username) {
            if (!currentNode[letter]) {
                currentNode[letter] = {};
            }
            currentNode = currentNode[letter];
        }
        currentNode.isWord = true;
    }
    return root;
}


let userTrie = buildUserTrie([]);

/**
 * Filters the user list according to the entered search term using trie search
 */
function filterUserList() {
    let filter = searchBar.value.toUpperCase();
    let userListContent = userList.getElementsByTagName("li");
    let currentNode = userTrie;

    for (let i = 0; i < filter.length; i++) {
        const letter = filter.charAt(i);
        if (!currentNode[letter]) {
            for (let j = i; j < filter.length; j++) {
                for (let k = 0; k < userListContent.length; k++) {
                    if (userListContent[k].textContent.toUpperCase().startsWith(filter.substring(0, j + 1))) {
                        userListContent[k].style.display = "";
                    } else {
                        userListContent[k].style.display = "none";
                    }
                }
            }
            return;
        }
        currentNode = currentNode[letter];
    }

    const matchingWords = [];

    function getWords(node, word) {
        if (node.isWord) {
            matchingWords.push(word);
        }
        for (let letter in node) {
            if (letter !== "isWord") {
                getWords(node[letter], word + letter);
            }
        }
    }

    getWords(currentNode, filter);

    for (let i = 0; i < userListContent.length; i++) {
        const username = userListContent[i].textContent.toUpperCase();
        if (matchingWords.length > 0 && matchingWords.includes(username)) {
            userListContent[i].style.display = "";
            let regex = new RegExp(`(${filter})`, "gi");
            userListContent[i].innerHTML = userListContent[i].textContent.replace(regex, "<b>$1</b>");
        } else {
            userListContent[i].style.display = "none";
        }
    }
}

/**
 * Trigger filterTable() when clearing the input by clicking the "x" in those browsers that support it.
 */
searchBar.addEventListener("search", () => {
    if (searchBar.value === "") filterUserList();
})

/**
 * Request all usernames and id's and build the trie
 */
axios.get("/admin/usernameList")
    .then((response) => {
        if (response.data !== '' && (response.data.constructor === Object || response.data.constructor === Array)) {
            if (response.data.length > 0) {
                let users = response.data;
                userTrie = buildUserTrie(users);
                createUserList(users);
            }
        } else {
            // TODO: show error message
        }

    }).catch((e) => {
    console.log("cannot request data", e)
})
