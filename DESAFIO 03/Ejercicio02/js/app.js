document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userNameInput = document.getElementById('user-name');
    const userUsernameInput = document.getElementById('user-username');
    const userEmailInput = document.getElementById('user-email');
    const userStreetInput = document.getElementById('user-street');
    const userCityInput = document.getElementById('user-city');
    const userZipcodeInput = document.getElementById('user-zipcode');
    const userPhoneInput = document.getElementById('user-phone');
    const userWebsiteInput = document.getElementById('user-website');
    const userIdInput = document.getElementById('user-id');
    const submitButton = document.getElementById('submit-button');
    const userList = document.getElementById('user-list');

    // La URL debe ser cambiada por el alumno según su cuenta de MockAPI
    const API_URL = 'https://6a2256c95c61035328699bf8.mockapi.io/usuarios';

    function clearForm() {
        userIdInput.value = '';
        userNameInput.value = '';
        userUsernameInput.value = '';
        userEmailInput.value = '';
        userStreetInput.value = '';
        userCityInput.value = '';
        userZipcodeInput.value = '';
        userPhoneInput.value = '';
        userWebsiteInput.value = '';
        submitButton.textContent = 'Crear Usuario';
    }

    // Función para obtener todos los usuarios (GET)
    function fetchUsers() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', API_URL, true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                let rawUsers = JSON.parse(xhr.responseText);
                let users = [];
                // Aplanar el arreglo por si el JSON inicial se guardó como un solo registro tipo array
                rawUsers.forEach(item => {
                    if (Array.isArray(item)) {
                        users = users.concat(item);
                    } else {
                        users.push(item);
                    }
                });
                displayUsers(users);
            } else {
                console.error('Error al obtener los usuarios:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error de red.');
        };
        xhr.send();
    }

    // Función para mostrar los usuarios en la lista
    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            
            // Si el address viene anidado o plano
            const street = user.address?.street || user.street || '';
            const city = user.address?.city || user.city || '';
            const zipcode = user.address?.zipcode || user.zipcode || '';
            
            // Construir la dirección formateada
            let addressParts = [street, city, zipcode].filter(part => part.trim() !== '');
            const formattedAddress = addressParts.join(',<br>') || '-';

            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username || '-'}</td>
                <td>${user.email || '-'}</td>
                <td>${formattedAddress}</td>
                <td>${user.phone || '-'}</td>
                <td>${user.website || '-'}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-primary edit" style="width: 70px;"
                            data-id="${user.id}" 
                            data-name="${user.name}" 
                            data-username="${user.username || ''}" 
                            data-email="${user.email || ''}" 
                            data-street="${street}" 
                            data-city="${city}" 
                            data-zipcode="${zipcode}" 
                            data-phone="${user.phone || ''}" 
                            data-website="${user.website || ''}">Editar</button>
                        <button class="btn btn-sm btn-primary delete" style="width: 70px;" data-id="${user.id}">Borrar</button>
                    </div>
                </td>
            `;
            userList.appendChild(tr);
        });
    }

    // Función para crear un nuevo usuario (POST)
    function createUser(userData) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', API_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Usuario creado:', JSON.parse(xhr.responseText));
                fetchUsers();
                clearForm();
            } else {
                console.error('Error al crear el usuario:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error de red.');
        };
        xhr.send(JSON.stringify(userData));
    }

    // Manejador del formulario (Crear/Actualizar)
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userData = {
            name: userNameInput.value.trim(),
            username: userUsernameInput.value.trim(),
            email: userEmailInput.value.trim(),
            phone: userPhoneInput.value.trim(),
            website: userWebsiteInput.value.trim(),
            address: {
                street: userStreetInput.value.trim(),
                city: userCityInput.value.trim(),
                zipcode: userZipcodeInput.value.trim()
            }
        };
        const userId = userIdInput.value;

        if (userData.name === '') return;

        if (userId) {
            updateUser(userId, userData);
        } else {
            createUser(userData);
        }
    });

    // Delegación de eventos para los botones de editar y eliminar
    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const btn = e.target;
            userIdInput.value = btn.getAttribute('data-id');
            userNameInput.value = btn.getAttribute('data-name') || '';
            userUsernameInput.value = btn.getAttribute('data-username') || '';
            userEmailInput.value = btn.getAttribute('data-email') || '';
            userStreetInput.value = btn.getAttribute('data-street') || '';
            userCityInput.value = btn.getAttribute('data-city') || '';
            userZipcodeInput.value = btn.getAttribute('data-zipcode') || '';
            userPhoneInput.value = btn.getAttribute('data-phone') || '';
            userWebsiteInput.value = btn.getAttribute('data-website') || '';
            submitButton.textContent = 'Actualizar Usuario';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (e.target.classList.contains('delete')) {
            if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                const id = e.target.getAttribute('data-id');
                deleteUser(id);
            }
        }
    });

    // Función para actualizar un usuario (PUT)
    function updateUser(id, userData) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${API_URL}/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Usuario actualizado');
                fetchUsers();
                clearForm();
            } else {
                console.error('Error al actualizar el usuario:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error de red.');
        };
        xhr.send(JSON.stringify(userData));
    }

    // Función para eliminar un usuario (DELETE)
    function deleteUser(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${API_URL}/${id}`, true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Usuario eliminado');
                fetchUsers();
            } else {
                console.error('Error al eliminar el usuario:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error de red.');
        };
        xhr.send();
    }

    // Cargar los usuarios al iniciar la página
    fetchUsers();
});
