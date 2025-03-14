import ListPost from '@/Components/Post/ListPost';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Post } from '@/types/posts';
import { Head, Link } from '@inertiajs/react';

export interface Props extends PageProps{
    usersPosts: Post[]
}

export default function Dashboard({usersPosts} : Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tableau de bord
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className="text-2xl font-semiBold text-gray-900">
                                    Mes publications
                                </h2>
                                <Link href={route("posts.create")} className='inline-flex items-center px-4 py-2 border
                        text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200'>
                                    Creer un post
                                </Link>
                            </div>

                            {usersPosts.length > 0 ? (
                                <ListPost posts={usersPosts} showAuthor={false} canEdit={true} />
                            )
                            :
                            (
                                <div className='text-center py-12'>
                                    <p className='mb-4 text-gray-500'>
                                        Vous n'avez pas encore creer de post
                                    </p>

                                    <Link href={route("posts.create")} className='text-indigo-500 hover:text-indigo-700 transition'>
                                        Créer votre premier post
                                    </Link>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
