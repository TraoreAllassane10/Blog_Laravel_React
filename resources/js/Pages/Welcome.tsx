import Nav from "@/Components/Nav";
import ListPost from "@/Components/Post/ListPost";
import { PageProps } from "@/types";
import { Post } from "@/types/posts";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({
    auth,
    posts,
    canRegister,
}: PageProps<{ posts: Post[]; canRegister: boolean }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen">
                <Nav />

                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-gray-800">
                            <span className="block">Binevenue sur</span>
                            <span className="block text-indigo-700">
                                Notre Blog Communautaire
                            </span>
                        </h1>

                        <p className="mt-3 max-w-md mx-auto text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Cupiditate aspernatur quas necessitatibus
                            animi laboriosam beatae nostrum incidunt tempore
                        </p>

                        {!auth.user && canRegister && (
                            <div className="mt-5 mx-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                                <div className="rounded-md shadow-md">
                                    <Link href={route('register')} className="inline-flex items-center px-4 py-2 border
                                         text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200">
                                        Commencer
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-800">
                            Articles récents
                        </h2>

                        <p className="mt-3 max-w-2xl mx-auto text-xl">
                            Les derniers articles publiés par nos utilisateurs
                        </p>
                    </div>

                    <ListPost posts={posts} />
                </div>
            </div>
        </>
    );
}
