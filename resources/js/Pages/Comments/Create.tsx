import Nav from "@/Components/Nav";
import { CommentProps, ShowProps } from "./../../types/posts";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Heart } from "lucide-react";
import { Button } from "@/Components/ui/button";
import TextInput from "@/Components/TextInput";
import { FormEvent, FormEventHandler } from "react";
import { Textarea } from "@headlessui/react";

export default function Create({ auth, postC }: CommentProps) {
    const handleLike = () => {
        if (!auth.user) {
            window.location.href = route("login");
            return;
        }

        router.post(
            route("posts.like", postC.id),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handleDelete = () => {
        if (confirm("Etes-vous sur de vouloir supprimer ce post")) {
            router.delete(route("posts.destroy", postC.id));
        }
    };

    const canEdit = auth.user?.id === postC.user_id;

    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
    });

    const submitComment = (e: FormEvent) => {
        e.preventDefault();
        post(route("comments.store", { post: postC.id }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleDeleteComment = (commentId: number, e: FormEvent) => {
        e.preventDefault()
        router.delete(route('comments.destroy', {comment: commentId}), {preserveScroll: true, preserveState: true})
    }

    return (
        <div className=" min-h-screen bg-gray-50">
            <Head title={postC.title} />
            <Nav />

            <div className="py-12">
                <article className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex justify-between items-center">
                                <Link
                                    href="/"
                                    className="text-indigo-500 hover:text-indigo-800 transition"
                                >
                                    Retour
                                </Link>

                                {canEdit && (
                                    <div className="flex gap-4">
                                        <Link
                                            href={route("posts.edit", postC.id)}
                                            className="text-indigo-500 hover:text-indigo-800 transition"
                                        >
                                            Modifier
                                        </Link>

                                        <button
                                            onClick={handleDelete}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </div>

                            {postC.image && (
                                <div className="mb-8">
                                    <img
                                        src={`/storage/${postC.image}`}
                                        alt={postC.title}
                                        className="w-full h-96 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <h1 className="text-3xl font-bold text-gray-800">
                                {postC.title}
                            </h1>

                            <div className="flex items-center justify-between text-xl text-gray-500 mb-8">
                                <div className="flex items-center gap-4">
                                    <span>Par {postC.author.name}</span>
                                    <span>-</span>
                                    <span>
                                        {new Date(
                                            postC.created_at
                                        ).toLocaleDateString("fr-FR")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleLike}
                                        className={`transition-colors ${
                                            postC.is_liked
                                                ? "text-red-600 hover:text-red-700"
                                                : "text-gray-500 hover:text-red-700"
                                        }`}
                                    >
                                        <Heart
                                            className="w-6 h-6 "
                                            fill={
                                                postC.is_liked
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />
                                    </button>

                                    <span className="text-gray-600">
                                        {postC.likes_count}
                                    </span>
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <p className="text-gray-700">
                                    {postC.description}
                                </p>
                            </div>

                            <div>
                                <form
                                    onSubmit={submitComment}
                                    className="flex justify-between place-items-center gap-4 p-4"
                                >
                                    <TextInput
                                        id="description"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                        className="w-3/4"
                                    />
                                    <Button
                                        type="submit"
                                        className="w-1/4 bg-indigo-500 hover:bg-indigo-700 transition"
                                        disabled={processing}
                                    >
                                        Commenter
                                    </Button>

                                    {errors && <p>{errors.content}</p>}
                                </form>
                            </div>

                            <div className="py-6">
                                <h3 className="text-3xl text-gray-800 font-semibold mb-4">
                                    Commentaires -{" "}
                                    <span className="text-xl text-indigo-500">
                                        {postC.comments_count} commentaire(s)
                                    </span>
                                </h3>
                                {postC.comments.map((comment) => (
                                    <div key={comment.id}>
                                        <p

                                            className="text-lg text-gray-800"
                                        >
                                            {comment.content} - Par {comment.author}
                                        </p>

                                        <div className="flex gap-2">
                                            <Link href="#" className="text-indigo-500">Repondre</Link>
                                            <button onClick={(e) => handleDeleteComment(comment.id, e)}  className="text-red-500">Supprimer</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            {/* <div className="py-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-md">

                    </div>
                </div>
            </div> */}
        </div>
    );
}
