<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'post_id',
        'parent_id',
        'content',
    ];

    protected $with = ["author"];

    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    //Un commentaire peut avoir plusieurs reponses
    public function reponses()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    //Comment peut appartenir à un autre commentaire
    public function parent()
    {
       return $this->belongsTo(Comment::class, 'parent_id');
    }

}
