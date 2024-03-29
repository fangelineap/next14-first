"use server"

import { revalidatePath } from 'next/cache';
import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';

const { Post, User } = require("./models");
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
};

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await Post.findByIdAndDelete(id);
        console.log('Deleted');
        revalidatePath('/blog');
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
};

export const handleLogout = async () => {
    "use server";
    await signOut();
};

export const register = async (prevState, formData) => {
    const { username, email, password, confirmPassword, img } = Object.fromEntries(formData);

    if(password !== confirmPassword) return { error: "Passwords do not match"};

    try {
        connectToDB();
        
        const user = await User.findOne({ username });

        if(user) return { error: "Username already exist" };

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPass,
            img
        });

        await newUser.save();
        console.log('Saved to db');

        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: 'Something went wrong' };
    }
}

export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn('credentials', { username, password });
    } catch (error) {
        if(error.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
        throw error;
    }
}