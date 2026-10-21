
@extends('layouts.app')

@section('title', 'Convive | Un espacio para coincidir')

@section('content')

<header class="navbar">
    <a href="/" class="brand">Con<span>Vive</span></a>

    <nav class="nav-links" aria-label="Navegación principal">
        <a href="#" class="nav-link active">Explorar</a>
        <a href="#" class="nav-link">Mi perfil</a>
        <a href="#" class="nav-link">Solicitudes</a>
        <a href="#" class="nav-link">Contrato</a>
    </nav>

    <div class="user-label">
        Carlos H. · Inquilino
    </div>
</header>

<main class="main-content">

    <section class="hero">

        <div class="hero-copy">
            <div class="eyebrow">
                ESPACIOS REALES. CONEXIONES QUE ENCAJAN.
            </div>

            <h1>
                Un lugar para vivir.<br>
                Personas con<br class="desktop-break">
                quienes coincidir.
            </h1>

            <p class="hero-description">
                Habitaciones y personas que coinciden contigo.<br class="desktop-break">
                Compara estilos de vida y encuentra tu próximo espacio.
            </p>

            <div class="hero-actions">
                <a href="#" class="button button-primary">
                    Encontrar habitación
                </a>

                <a href="#" class="button button-outline">
                    Soy arrendador
                </a>
            </div>

            <p class="preferences">
                Limpieza · Horarios · Mascotas · Visitas
            </p>
        </div>

        <div class="featured-panel">
            <h2>Un espacio que se siente como tú</h2>

            <article class="property-card">

                <div class="room-illustration" role="img"
                     aria-label="Ilustración de una habitación amueblada">

                    <div class="window">
                        <span></span>
                    </div>

                    <div class="wall-frame"></div>

                    <div class="bed">
                        <div class="bed-headboard"></div>
                        <div class="pillow pillow-one"></div>
                        <div class="pillow pillow-two"></div>
                        <div class="blanket"></div>
                    </div>

                    <div class="side-table"></div>
                    <div class="plant-pot"></div>
                    <div class="plant-leaves">♥</div>
                </div>

                <div class="property-details">
                    <p class="compatibility">92.5% compatibles</p>

                    <h3>Habitación cerca de ESCOM</h3>

                    <p class="property-location">
                        Lindavista · Ciudad de México
                    </p>

                    <p class="property-features">
                        16.5 m² · Agua, luz, internet y gas
                    </p>

                    <p class="property-price">
                        $4,500 MXN / mes
                    </p>

                    <p class="property-owner">
                        Ana · Arquitecta · Horario diurno
                    </p>
                </div>
            </article>

            <p class="match-note">
                Coinciden en limpieza y horario diurno.
            </p>
        </div>

    </section>

    <section class="search-panel" aria-label="Búsqueda de vivienda">

        <div class="search-field">
            <label for="location">¿Dónde quieres vivir?</label>
            <input
                id="location"
                type="text"
                value="Lindavista, Ciudad de México"
                readonly
            >
        </div>

        <div class="search-field">
            <label for="budget">Presupuesto mensual</label>
            <input
                id="budget"
                type="text"
                value="Hasta $5,000 MXN"
                readonly
            >
        </div>

        <button type="button" class="button button-primary search-button">
            Explorar espacios
        </button>

    </section>

    <section class="steps-section">

        <h2>Más que una habitación, una buena convivencia.</h2>

        <div class="steps-grid">

            <article class="step-card">
                <h3>01 · Cuéntanos sobre ti</h3>
                <p>
                    Completa tu perfil y tus hábitos de convivencia.
                </p>
            </article>

            <article class="step-card">
                <h3>02 · Encuentra tu match</h3>
                <p>
                    Compara espacios y conoce por qué coinciden.
                </p>
            </article>

            <article class="step-card">
                <h3>03 · Hazlo tu hogar</h3>
                <p>
                    Envía una solicitud y consulta tu contrato.
                </p>
            </article>

        </div>

    </section>

</main>

<footer class="footer">
    <p>ConVive · Un espacio para coincidir</p>

    <nav aria-label="Enlaces informativos">
        <a href="#">Ayuda</a>
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
    </nav>
</footer>

@endsection
