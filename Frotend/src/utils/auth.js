export const BASE_URL = "https://api.mesto22.nomoredomains.icu";

const checkResponse = (res) => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


export const register =  (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(checkResponse)
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method:"POST",
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
    .then(checkResponse)

};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(checkResponse)
    } 