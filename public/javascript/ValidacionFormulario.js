document.addEventListener('DOMContentLoaded', function() {
    var nombresInput = document.querySelector('input[name="userName"]');
    var apellidosInput = document.querySelector('input[name="userLastName"]');
    var nombreApoderadoInput = document.querySelector('input[name="guardianName"]');
    var telefonoInput = document.querySelector('input[name="phoneNumber"]');
    var numeroDocumentoInput = document.querySelector('input[name="docNumber"]');
    var nombreEstudianteInput = document.querySelector('input[name="studentName"]');

    function validateLettersOnly(input) {
        input.value = input.value.replace(/[^A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]/g, '');
    }

    function validateNumbersOnly(input) {
        input.value = input.value.replace(/[^\d]/g, ''); // Filtra solo dígitos
    }

    nombresInput.addEventListener('input', function() {
        validateLettersOnly(this);
    });

    apellidosInput.addEventListener('input', function() {
        validateLettersOnly(this);
    });

    nombreApoderadoInput.addEventListener('input', function() {
        validateLettersOnly(this);
    });

    nombreEstudianteInput.addEventListener('input', function() {
        validateLettersOnly(this);
    });

    telefonoInput.addEventListener('input', function() {
        validateNumbersOnly(this);
        // Limitar la cantidad de dígitos
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9);
        }
    });

    numeroDocumentoInput.addEventListener('input', function() {
        validateNumbersOnly(this);
        var maxDigits = 8; // Por defecto, establecer el máximo en 8 dígitos

        // Obtener el tipo de documento seleccionado
        var tipoDocumento = document.querySelector('select[name="docType"]').value;
        if (tipoDocumento === 'CE') {
            maxDigits = 20; // Cambiar el máximo a 20 si el tipo de documento es Carnet de extranjería
        }

        // Limitar la cantidad de dígitos
        if (this.value.length > maxDigits) {
            this.value = this.value.slice(0, maxDigits);
        }
    });

    // Mostrar el formulario después de cargar los elementos
    document.querySelector('.form-register').classList.add('show');

    // Validación del formulario al enviar
    document.querySelector('.form-register').addEventListener('submit', function(event) {
        var isValid = true;
        var formElements = this.elements;

        for (var i = 0; i < formElements.length; i++) {
            if (formElements[i].hasAttribute('required') && formElements[i].value.trim() === '') {
                isValid = false;
                var fieldName = formElements[i].name;
                document.getElementById('error-' + fieldName).innerText = 'Por favor, completa este campo.';
            }
        }

        // Validación específica para el campo de sexo (ejemplo)
        var sexoInput = document.querySelector('select[name="gender"]');
        var sexoSelected = sexoInput.value !== '';

        if (!sexoSelected) {
            isValid = false;
            document.getElementById('error-gender').innerText = 'Por favor, selecciona tu sexo.';
        } else {
            document.getElementById('error-gender').innerText = '';
        }

        if (!isValid) {
            event.preventDefault(); // Evitar que se envíe el formulario si no es válido
        }
    });

    // Limpiar mensajes de error al corregir los campos
    var formInputs = document.querySelectorAll('.form-register .controls');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var fieldName = this.name;
            document.getElementById('error-' + fieldName).innerText = '';
        });
    });
});


const btnSignIn = document.getElementById("sign-in");

btnSignIn.addEventListener("click", function() {
    window.location.href = "../"; 
});

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el formulario con animación
    var formContainer = document.querySelector('.container-form');
    formContainer.classList.add('show');
});

