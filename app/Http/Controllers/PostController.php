<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function create(): Response
    {
        if(!Auth::check())
        {
            abort(403);
        }
        return Inertia::render("Posts/Create");
    }

    public function store(Request $request)
    {
        if(!Auth::check())
        {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|mimes:jpeg,jpg,png,gif,svg|max:2068'
        ]);

        $post = new Post();

        $post->title = $validated['title'];
        $post->description = $validated['description'];
        $post->user_id = Auth::id();

        if($request->hasFile('image'))
        {
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        $post->save();

        return redirect()->route("dashboard")->with("success", "Post Crée avec succes");

    }

    public function show(Post $post): Response
    {
        return Inertia::render("Posts/Show", [
            'post' => $post->load("author"),
        ]);
    }

    public function edit(Post $post): Response
    {
        return Inertia::render("Posts/Edit", [
            'post' => $post,

        ]);
    }

    public function update(Request $request,Post $post)
    {
        if(!Auth::check())
        {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|mimes:jpeg,jpg,png,gif,svg|max:2068'
        ]);


        $post->title = $validated['title'];
        $post->description = $validated['description'];

        if($request->hasFile('image'))
        {
            if($post->image)
            {
                Storage::disk("public")->delete($post->image);
            }
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        $post->save();

        return redirect()->route("dashboard")->with("success", "Post mis à jour avec succes");

    }

    public function destroy(Post $post)
    {
        if($post->image)
        {
            Storage::disk("public")->delete($post->image);
        }

        $post->delete();

        return redirect()->back()->with("sucess", "Post supprimé avec succès ");
    }

    public function like(Post $post)
    {
        $user = Auth::user();

        if($post->likedBy()->where("user_id", $user->id)->exists())
        {
            $post->likedBy()->detach($user->id);
            $message = "Post retiré";
        }
        else
        {
            $post->likedBy()->attach($user->id);
            $message  = "Post liké";
        }

        return redirect()->back()->with("success", $message);
    }
}
