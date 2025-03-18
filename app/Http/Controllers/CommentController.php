<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{

    public function create(Post $post)
    {
        return Inertia::render('Comments/Create', ["postC" => $post->load("author")]);
    }

    public function store(Request $request, Post $post)
    {

        $validate = $request->validate([
            'content' => "required"
        ]);

        $comment = new Comment();

        $comment->user_id = Auth::id();
        $comment->content = $request->content;

        if($request->has("parent_id"))
        {
            $comment->parent_id = $request->parent_id;
        }

        $post->comments()->save($comment);

        return redirect()->back()->with("success", "Commentaire publié avec sucess");
    }

    public function destroy(Comment $comment)
    {
        if($comment->user_id == Auth::id())
        {
            $comment->delete();
        }

        return redirect()->back();
    }
}
