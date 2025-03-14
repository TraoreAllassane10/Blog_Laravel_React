import { useForm, Head } from "@inertiajs/react"
import { useState, FormEvent } from "react"
import { CreateProps, PostFormData } from './../../types/posts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";


export default function Create({}: CreateProps){

    const {data, setData, post, processing, errors, reset} = useForm<PostFormData>({
        title: '',
        description: '',
        image: null as File | null
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(file){
            setData('image', file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }

            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post(route("posts.store"), {
            onSuccess: () => {
                reset();
                setPreviewUrl("");
            }
        })
    }
  return (
    <AuthenticatedLayout header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Creer un post
        </h2>
    }>
        <Head title="Creer un post"/>

        <div className="p-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-semiBold mb-6">Créer un post</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData("title", e.target.value)}/>
                                {errors.title && <div className="bg-red-500 text-sm">{errors.title}</div>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Titre</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData("description", e.target.value)}/>
                                {errors.description && <div className="bg-red-500 text-sm">{errors.description}</div>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Image</Label>
                                <Input type="file" id="image" onChange={handleImageChange} accept="images/*"
                                className="block py-2 file mr-4 file:rounded-md file:border-0 file:text-sm file:text-semibold
                                file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                {errors.image && <div className="bg-red-500 text-sm">{errors.image}</div>}
                                {previewUrl && (
                                    <div className="mt-2">
                                        <img src={previewUrl} alt="preview" className="max-h-40 rounded-md"/>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Annuler
                                </Button>

                                <Button type="submit" disabled={processing}>
                                    {processing ? "Création en cours" : "Créer le post"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}
