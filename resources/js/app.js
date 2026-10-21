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
