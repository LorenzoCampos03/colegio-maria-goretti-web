document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se envíe el formulario

        // Mostrar SweetAlert solo cuando se envía el formulario
        Swal.fire({
            icon: 'success',
            title: '¡Registrado!',
            text: 'Tu registro ha sido exitoso.',
        });
    });
});