"use server"

const { Post } = require("./models");
const { connectToDB } = require("./utils");

export const addPost = async (formData) => {
    // single destructuring
    // const title = formData.get('title');
    // const desc = formData.get('desc');
    // const slug = formData.get('slug');

    // destructuring using fromEntries
    const { title, desc, slug, userId } = Object.fromEntries(formData);

    try {
        connectToDB();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        });

        await newPost.save();
        console.log('Saved to DB');
        revalidatePath('/blog');
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    console.log('Hello');
};

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await Post.findByIdAndDelete(id);
        console.log('Deleted');
        // revalidatePath('/blog');
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}