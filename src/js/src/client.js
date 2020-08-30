import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}
export const getAllUsers = () => 
    fetch('/api/users').then(checkStatus);

export const addNewUser = user => 
    fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
    .then(checkStatus);

    export const deleteUser = (id, firstName, lastName) =>
        fetch(`api/users/${id}`, {
            method: 'DELETE'
        })
        .then(checkStatus);

