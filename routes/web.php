<?php

use App\Http\Controllers\PostController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [WelcomeController::class, 'index']);

Route::middleware("auth", "verified")->group(function() {
    Route::get("/posts/create", [PostController::class, 'create'])->name("posts.create");
    Route::post("/posts", [PostController::class, 'store'])->name("posts.store");
    Route::get("/posts/{post}/edit", [PostController::class, 'edit'])->name("posts.edit");
    Route::put("/posts/{post}", [PostController::class, 'update'])->name("posts.update");
    Route::delete("/posts/{post}", [PostController::class, 'destroy'])->name("posts.destroy");
    Route::post("/posts/{post}/like", [PostController::class, 'like'])->name("posts.like");
});

Route::get("/posts/{post}", [PostController::class, 'show'])->name("posts.show");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        "usersPosts" => Auth::user()->posts()->with("author")->latest()->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
