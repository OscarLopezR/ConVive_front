import './bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    // La página actual no es el inicio de sesión.
    if (!loginForm) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');

    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const feedback = document.getElementById('login-feedback');

    // Mostrar u ocultar la contraseña.
    togglePassword.addEventListener('click', () => {
        const isPasswordHidden = passwordInput.type === 'password';

        passwordInput.type = isPasswordHidden ? 'text' : 'password';

        togglePassword.textContent = isPasswordHidden
            ? 'Ocultar'
            : 'Mostrar';

        togglePassword.setAttribute(
            'aria-label',
            isPasswordHidden ? 'Ocultar contraseña' : 'Mostrar contraseña'
        );

        togglePassword.setAttribute(
            'aria-pressed',
            String(isPasswordHidden)
        );
    });

    // Limpiar los mensajes de error al editar los campos.
    function clearFieldError(input, errorElement) {
        input.closest('.auth-field').classList.remove('has-error');
        errorElement.textContent = '';
    }

    emailInput.addEventListener('input', () => {
        clearFieldError(emailInput, emailError);
        feedback.classList.remove('is-visible');
    });

    passwordInput.addEventListener('input', () => {
        clearFieldError(passwordInput, passwordError);
        feedback.classList.remove('is-visible');
    });

    // Validación local: no se envían datos a un servidor.
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        clearFieldError(emailInput, emailError);
        clearFieldError(passwordInput, passwordError);

        feedback.classList.remove('is-visible');
        feedback.textContent = '';

        let hasErrors = false;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            emailInput.closest('.auth-field').classList.add('has-error');
            emailError.textContent = 'Ingresa tu correo electrónico.';
            hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput.closest('.auth-field').classList.add('has-error');
            emailError.textContent = 'Ingresa un correo electrónico válido.';
            hasErrors = true;
        }

        if (!password.trim()) {
            passwordInput.closest('.auth-field').classList.add('has-error');
            passwordError.textContent = 'Ingresa tu contraseña.';
            hasErrors = true;
        }

        if (hasErrors) {
            feedback.textContent = 'Revisa los campos señalados.';
        } else {
            feedback.textContent =
                'Interfaz de demostración: los campos son válidos, ' +
                'pero el inicio de sesión todavía no está conectado.';
        }

        feedback.classList.add('is-visible');
    });

    // Acciones de demostración para las opciones que aún no existen.
    document.querySelectorAll('[data-demo-action]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const action = button.dataset.demoAction;

            const messages = {
                forgot:
                    'La recuperación de contraseña estará disponible ' +
                    'cuando se implemente la autenticación.',
                register:
                    'La pantalla de registro se implementará posteriormente.'
            };

            feedback.textContent = messages[action] || '';
            feedback.classList.add('is-visible');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    // Ejecutar solo en la página de registro.
    if (!registerForm) return;

    const roleButtons = document.querySelectorAll('.role-button');
    const roleInput = document.getElementById('account-role');

    const passwordInput = document.getElementById('register-password');
    const togglePassword = document.getElementById(
        'register-toggle-password'
    );

    const termsCheckbox = document.getElementById('accept-terms');
    const termsError = document.getElementById('terms-error');
    const feedback = document.getElementById('register-feedback');

    // Selección del rol.
    roleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            roleButtons.forEach((item) => {
                item.classList.remove('selected');
                item.setAttribute('aria-pressed', 'false');
            });

            button.classList.add('selected');
            button.setAttribute('aria-pressed', 'true');

            roleInput.value = button.dataset.role;

            feedback.textContent =
                button.dataset.role === 'tenant'
                    ? 'Has seleccionado el rol: Busco habitación.'
                    : 'Has seleccionado el rol: Ofrezco habitación.';

            feedback.classList.add('is-visible');
        });
    });

    // Mostrar u ocultar la contraseña.
    togglePassword.addEventListener('click', () => {
        const hidden = passwordInput.type === 'password';

        passwordInput.type = hidden ? 'text' : 'password';
        togglePassword.textContent = hidden ? 'Ocultar' : 'Mostrar';

        togglePassword.setAttribute(
            'aria-label',
            hidden ? 'Ocultar contraseña' : 'Mostrar contraseña'
        );

        togglePassword.setAttribute('aria-pressed', String(hidden));
    });

    // Limpiar los errores de los campos al escribir.
    registerForm.querySelectorAll('.register-field input').forEach((input) => {
        input.addEventListener('input', () => {
            const field = input.closest('.register-field');

            field.classList.remove('has-error');

            const error = field.querySelector('.register-error');

            if (error) {
                error.textContent = '';
            }

            feedback.classList.remove('is-visible');
        });
    });

    termsCheckbox.addEventListener('change', () => {
        termsError.textContent = '';
        feedback.classList.remove('is-visible');
    });

    // Validación visual local.
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let hasErrors = false;

        feedback.classList.remove('is-visible');
        feedback.textContent = '';
        termsError.textContent = '';

        registerForm.querySelectorAll('.register-field').forEach((field) => {
            field.classList.remove('has-error');

            const error = field.querySelector('.register-error');

            if (error) {
                error.textContent = '';
            }
        });

        function showError(input, message) {
            const field = input.closest('.register-field');

            field.classList.add('has-error');
            field.querySelector('.register-error').textContent = message;

            hasErrors = true;
        }

        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('register-email');
        const phone = document.getElementById('register-phone');

        if (!firstName.value.trim()) {
            showError(firstName, 'Ingresa tu nombre.');
        }

        if (!lastName.value.trim()) {
            showError(lastName, 'Ingresa tus apellidos.');
        }

        const emailValue = email.value.trim();

        if (!emailValue) {
            showError(email, 'Ingresa tu correo electrónico.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            showError(email, 'Ingresa un correo electrónico válido.');
        }

        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');

        if (!phoneValue) {
            showError(phone, 'Ingresa tu número de teléfono.');
        } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
            showError(phone, 'Ingresa un teléfono válido.');
        }

        if (!passwordInput.value) {
            showError(passwordInput, 'Crea una contraseña.');
        } else if (passwordInput.value.length < 8) {
            showError(
                passwordInput,
                'La contraseña debe tener al menos 8 caracteres.'
            );
        }

        if (!termsCheckbox.checked) {
            termsError.textContent =
                'Debes aceptar los términos para continuar.';

            hasErrors = true;
        }

        if (hasErrors) {
            feedback.textContent =
                'Revisa los campos señalados antes de continuar.';
        } else {
            const roleText = roleInput.value === 'tenant'
                ? 'Busco habitación'
                : 'Ofrezco habitación';

            feedback.textContent =
                `Validación visual completada. Rol seleccionado: ${roleText}. ` +
                'Esta demostración no crea una cuenta ni guarda tus datos.';
        }

        feedback.classList.add('is-visible');
    });

    // Navegación provisional para opciones aún no implementadas.
    document.querySelectorAll('[data-register-message]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            feedback.textContent =
                `La sección "${link.dataset.registerMessage}" ` +
                'estará disponible en una futura versión.';

            feedback.classList.add('is-visible');
        });
    });
});
