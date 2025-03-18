<?php

namespace App\Models;

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',
    ];

    protected $appends = ['is_liked', 'likes_count', 'comments_count'];

    protected $with = ['likedBy', 'comments'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "post_likes");
    }

    public function getIslikedAttribute(): bool
    {
        return Auth::check() && $this->likedBy()->get()->contains('id', Auth::id());
    }

    public function getLikesCountAttribute(): int
    {
        return $this->likedBy()->count();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function getCommentsCountAttribute(): int
    {
        return $this->comments()->count();
    }
}
