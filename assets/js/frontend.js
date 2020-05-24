import * as backend from "./backend.js";

$(function () {
    console.log("hi");
    backend
        .login("test@t123est.com", "dfsdf")
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
});
