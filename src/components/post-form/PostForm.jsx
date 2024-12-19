import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index'
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({post}) {
    console.log(post);
    
    
    const {
            register, handleSubmit, watch,
            setValue, getValues, control
        } = useForm(
            {
                defaultValues: {
                    title: post?.title || '',
                    slug: post?.slug || '',
                    content: post?.content || '',
                    status: post?.status || 'active'
                }
            }
        );
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
     
    const submit = async (data) => {
        // for update post
        if(post) {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
            // if file is uploaded then delete the previous file
            if (file) {
                service.deleteFile(post.featuredImage);
            }
            const dbPost = await service.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                }
            
            ); 
            // if post is updated then navigate to the post list page
            if (dbPost) {
                navigate('/post/${dbPost.$id}');
            }
        } else {
            const file = await service.uploadFile(data.image[0]);
            
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await service.createPost(
                    {
                        ...data,
                        userId: userData.$id,
                    }
                );
                if (dbPost) {
                    navigate('/post/${dbPost.$id}')
                }
            } 
        
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            // Convert to lowercase, trim leading/trailing spaces
            return value
                .trim() // Remove whitespace from both ends
                .toLowerCase() // Convert to lowercase
                .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters (except spaces and hyphens)
                .replace(/\s+/g, '-') // Replace spaces (one or more) with a single hyphen
                .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
                .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
        }
        return '';
    }, []);
    

    React.useEffect(() => {
        // For creating a new post, if no post exists, set the slug based on title.
        if (post && post.title) {
            const generatedSlug = slugTransform(post.title);
            setValue('slug', generatedSlug, { shouldValidate: true });  
        }

        // Set up slug for new posts as the title is typed
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const generatedSlug = slugTransform(value.title);
                setValue('slug', generatedSlug, { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();  // Cleanup subscription on unmount
    }, [post, setValue, slugTransform, watch]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
