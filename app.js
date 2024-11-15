document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const contactsList = document.getElementById('contactsList');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function renderContacts() {
        contactsList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('contact-card');
            contactCard.innerHTML = `
                <div>
                    <strong>${contact.nombre}</strong><br>
                    Tel: ${contact.telefono}<br>
                    Email: ${contact.email}<br>
                    Dirección: ${contact.direccion}
                </div>
                <div>
                    <button class="edit" onclick="editContact(${index})">Editar</button>
                    <button class="delete" onclick="deleteContact(${index})">Eliminar</button>
                </div>
            `;
            contactsList.appendChild(contactCard);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newContact = {
            nombre: document.getElementById('name').value.trim(),
            telefono: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            direccion: document.getElementById('address').value.trim(),
        };

        if (newContact.nombre && newContact.telefono) {
            contacts.push(newContact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            form.reset();
            renderContacts();
        } else {
            alert('El nombre y el teléfono son obligatorios.');
        }
    });

    window.editContact = (index) => {
        const contact = contacts[index];
        document.getElementById('name').value = contact.nombre;
        document.getElementById('phone').value = contact.telefono;
        document.getElementById('email').value = contact.email;
        document.getElementById('address').value = contact.direccion;

        form.onsubmit = (e) => {
            e.preventDefault();
            contact.nombre = document.getElementById('name').value.trim();
            contact.telefono = document.getElementById('phone').value.trim();
            contact.email = document.getElementById('email').value.trim();
            contact.direccion = document.getElementById('address').value.trim();

            contacts[index] = contact;
            localStorage.setItem('contacts', JSON.stringify(contacts));
            form.reset();
            form.onsubmit = null;
            renderContacts();
        };
    };

    window.deleteContact = (index) => {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
    };

    renderContacts();
});
