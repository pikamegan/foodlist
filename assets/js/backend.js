const url = "http://localhost:3000/";

export async function register(email, password, name, type) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url + "register",
            type: "POST",
            data: JSON.stringify({
                email: email,
                password: password,
                name: name,
                type: type,
            }),
            contentType: "application/json",
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (error) {
                reject(error.statusText);
            });
    });
}

export async function login(email, password) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url + "login",
            type: "POST",
            data: JSON.stringify({
                email: email,
                password: password,
            }),
            contentType: "application/json",
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (error) {
                reject(error.statusText);
            });
    });
}
