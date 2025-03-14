import { Post, Props } from "@/types/posts";
import { usePage, router, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, } from "../ui/card";
import { Edit, Eye, Heart, Trash2 } from "lucide-react";
import { Button } from "../ui/button";


export default function ListPost({ posts, showAuthor = true }: Props) {
    const { auth } = usePage().props as any;
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (postId: number) => {
        if (confirm("Etês-vous sûr de vouloir supprimer cet article ?")) {
            setDeletingId(postId);
            router.delete(route("posts.destroy", postId), {
                onSuccess: () => {
                    setDeletingId(null);
                },

                onError: () => {
                    setDeletingId(null);
                    alert("Une erreur est surveni lors de la suppression");
                },
            });
        }
    };

    const handleLike = (postId: number) => {
        router.post(
            route("posts.like", postId),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const canEditPost = (post: Post) => {
        return auth.user?.id === post.user_id;
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                    {post.image && (
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src={`storage/${post.image}`}
                                alt={post.title}
                                className="object-cover w-full h-48"
                            />
                        </div>
                    )}

                    <CardHeader>
                        <h3 className="text-xl font-semiBlod text-gray-800">
                            {post.title}
                        </h3>
                    </CardHeader>

                    <CardContent>
                       <p className="text-gray-600 line-clamp-3 nb-4">
                            {post.description}
                       </p>

                       <div className="flex items-center justify-between text-sm text-gray-500">
                            {showAuthor && (
                                <span>Par {post.author.name}</span>
                            )}

                            <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                       </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center justify-end space-x-2">
                           <Button variant="ghost" size="icon" onClick={() => handleLike(post.id)} className=
                           {`transition-colors ${post.is_liked ? "text-red-600 hover:text-red-700" :
                            "text-text-gray-600 hover:text-red-700"
                           }`}>
                                <Heart className="h-6 w-6 " fill={post.is_liked ? "currentColor" : "none"}/>
                           </Button>

                           <div className="text-gray-600">
                                {post.likes_count}
                           </div>
                        </div>

                        <div className="flex items-center space-x-3">
                           <Button variant="link" asChild>
                                <Link href={route("posts.show", post.id)}>
                                        <Eye/>
                                </Link>
                           </Button>

                           {canEditPost(post) && (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link href={route("posts.edit", post.id)}>
                                            <Edit/>
                                        </Link>
                                    </Button>

                                    <Button onClick={() => handleDelete(post.id)}  disabled={deletingId === post.id}
                                     variant="ghost" asChild className="text-red-500
                                     hover:text-red-700 ">
                                       <Trash2/>
                                    </Button>
                                </>
                           )
                           }
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
