
<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'pages.home')->name('home');

Route::view('/login', 'pages.login')->name('login');

Route::view('/register', 'pages.register')->name('register');
