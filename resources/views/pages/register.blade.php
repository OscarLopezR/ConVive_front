
@extends('layouts.app')

@section('title', 'Convive | Crear cuenta')

@section('content')

<header class="navbar">
    <a href="/" class="brand">ConVive</a>

    <nav class="nav-links" aria-label="Navegación principal">
        <a href="/" class="nav-link active">Explorar</a>
        <a href="#" class="nav-link" data-register-message="Mi perfil">Mi perfil</a>
        <a href="#" class="nav-link" data-register-message="Solicitudes">Solicitudes</a>
        <a href="#" class="nav-link" data-register-message="Contrato">Contrato</a>
    </nav>

    <div class="user-label">Carlos H. · Inquilino</div>
</header>

<main class="register-main">

    <div class="register-layout">

        <aside class="register-promo">
            <h1>
                Tu espacio.<br>
                Tu ritmo.<br>
                Tu gente.
            </h1>

            <p>
                Todo comienza con conocerte. Elige tu rol y crea una
                cuenta para encontrar personas compatibles.
            </p>

            <div class="promo-label">
                ESTUDIANTES Y PROFESIONALES
            </div>
        </aside>

        <section class="register-card">

            <p class="register-eyebrow">BIENVENIDO A CONVIVE</p>

            <h2>Crea tu cuenta</h2>

            <p class="register-description">
                Elige cómo quieres formar parte de la comunidad.
            </p>

            <form id="register-form" novalidate>

                <div class="role-selector" aria-label="Elige tu rol">

                    <button
                        type="button"
                        class="role-button selected"
                        data-role="tenant"
                        aria-pressed="true"
                    >
                        Busco habitación
                    </button>

                    <button
                        type="button"
                        class="role-button"
                        data-role="landlord"
                        aria-pressed="false"
                    >
                        Ofrezco habitación
                    </button>

                </div>

                <input type="hidden" id="account-role" value="tenant">

                <div class="register-name-grid">

                    <div class="register-field">
                        <label for="first-name">Nombre</label>
                        <input
                            type="text"
                            id="first-name"
                            name="first_name"
                            placeholder="Carlos"
                            autocomplete="given-name"
                            required
                        >
                        <span class="register-error"></span>
                    </div>

                    <div class="register-field">
                        <label for="last-name">Apellidos</label>
                        <input
                            type="text"
                            id="last-name"
                            name="last_name"
                            placeholder="Hernández López"
                            autocomplete="family-name"
                            required
                        >
                        <span class="register-error"></span>
                    </div>

                </div>

                <div class="register-field">
                    <label for="register-email">Correo electrónico</label>
                    <input
                        type="email"
                        id="register-email"
                        name="email"
                        placeholder="carlos.h@email.com"
                        autocomplete="email"
                        required
                    >
                    <span class="register-error"></span>
                </div>

                <div class="register-field">
                    <label for="register-phone">Teléfono</label>
                    <input
                        type="tel"
                        id="register-phone"
                        name="phone"
                        placeholder="55 1234 5678"
                        autocomplete="tel"
                        inputmode="tel"
                        required
                    >
                    <span class="register-error"></span>
                </div>

                <div class="register-field">
                    <label for="register-password">Contraseña</label>

                    <div class="register-password-wrap">
                        <input
                            type="password"
                            id="register-password"
                            name="password"
                            placeholder="Crea una contraseña"
                            autocomplete="new-password"
                            minlength="8"
                            required
                        >

                        <button
                            type="button"
                            id="register-toggle-password"
                            class="register-password-toggle"
                            aria-label="Mostrar contraseña"
                            aria-pressed="false"
                        >
                            Mostrar
                        </button>
                    </div>

                    <span class="register-error"></span>
                </div>

                <label class="terms-label" for="accept-terms">
                    <input
                        type="checkbox"
                        id="accept-terms"
                        name="accept_terms"
                        required
                    >
                    <span>
                        Acepto los términos y el aviso de privacidad.
                    </span>
                </label>

                <p class="terms-error" id="terms-error"></p>

                <button
                    type="submit"
                    class="register-submit"
                >
                    Crear cuenta
                </button>

                <a href="/login" class="register-login-link">
                    Ya tengo cuenta · Iniciar sesión
                </a>

                <p
                    id="register-feedback"
                    class="register-feedback"
                    role="status"
                    aria-live="polite"
                ></p>

            </form>

        </section>

    </div>

</main>

<footer class="footer">
    <p>ConVive · Un espacio para coincidir</p>

    <nav aria-label="Enlaces informativos">
        <a href="#" data-register-message="Ayuda">Ayuda</a>
        <a href="#" data-register-message="Privacidad">Privacidad</a>
        <a href="#" data-register-message="Términos">Términos</a>
    </nav>
</footer>

@endsection
