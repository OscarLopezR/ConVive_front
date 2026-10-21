
@extends('layouts.app')

@section('title', 'Convive | Iniciar sesión')

@section('content')

<header class="auth-navbar">
    <a href="/" class="auth-brand">ConVive</a>

    <nav class="auth-nav">
        <a href="/" class="auth-nav-link">Volver al inicio</a>
        <a href="#registro" class="auth-nav-link" data-demo-action="register">
            Crear cuenta
        </a>
    </nav>
</header>

<main class="auth-main">

    <section class="auth-heading">
        <h1>Qué bueno verte de nuevo.</h1>
        <p>Inicia sesión para encontrar tu próximo espacio.</p>
    </section>

    <div class="auth-grid">

        <section class="login-card">

            <h2>Inicia sesión</h2>
            <p class="login-intro">
                Tu comunidad y tus espacios favoritos te esperan.
            </p>

            <form id="login-form" novalidate>

                <div class="auth-field">
                    <label for="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nombre@correo.com"
                        autocomplete="email"
                        required
                    >
                    <span class="field-error" id="email-error"></span>
                </div>

                <div class="auth-field password-field">
                    <label for="password">Contraseña</label>

                    <div class="password-input-wrap">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            autocomplete="current-password"
                            required
                        >

                        <button
                            type="button"
                            class="password-toggle"
                            id="toggle-password"
                            aria-label="Mostrar contraseña"
                            aria-pressed="false"
                        >
                            Mostrar
                        </button>
                    </div>

                    <span class="field-error" id="password-error"></span>
                </div>

                <button type="submit" class="auth-button auth-button-primary">
                    Iniciar sesión
                </button>

                <button
                    type="button"
                    class="auth-button auth-button-outline"
                    data-demo-action="forgot"
                >
                    Olvidé mi contraseña
                </button>

                <button
                    type="button"
                    class="auth-button auth-button-outline"
                    data-demo-action="register"
                >
                    Crear una cuenta
                </button>

                <p
                    class="auth-feedback"
                    id="login-feedback"
                    role="status"
                    aria-live="polite"
                ></p>

            </form>

        </section>

        <aside class="auth-promo">
            <h2>
                Tu próximo hogar<br class="promo-break">
                sigue esperándote.
            </h2>

            <p>
                Encuentra habitaciones y personas que comparten
                tu forma de vivir.
            </p>
        </aside>

    </div>

</main>

@endsection
