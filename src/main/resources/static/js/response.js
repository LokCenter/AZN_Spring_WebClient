let button = document.getElementById("button");

button.addEventListener("click", (e) => {
    // csrf token
    const token = $("meta[name='_csrf']").attr("content");
    const header = $("meta[name='_csrf_header']").attr("content");

    //body
    const params = JSON.stringify({message: "hello"});

    axios.defaults.headers.post[header] = token
    axios.post("http://localhost:8880/response", {
        test: 'test'
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
});