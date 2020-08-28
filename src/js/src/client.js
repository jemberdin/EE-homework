
export const getAllUsers = () => fetch('/api/users');

export const addNewUser = user => 
    fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    });

