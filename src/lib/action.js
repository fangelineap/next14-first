"use server"

import { revalidatePath } from 'next/cache';
import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';

const { Post, User } = require("./models");
const { connectToDB } = require("./utils");

export const addPost = async (prevState, formData) => {
    // single destructuring
    // const title = formData.get('title');
    // const desc = formData.get('desc');
    // const slug = formData.get('slug');

    // destructuring using fromEntries
    const { title, desc, slug, userId, img } = Object.fromEntries(formData);

    try {
        connectToDB();

        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
            img
        });

        await newPost.save();
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
        revalidatePath('/blog');
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const addUser = async (prevState, formData) => {
    const { username, email, password, image, isAdmin } = Object.fromEntries(formData);

    try {
        connectToDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPass,
            image,
            isAdmin
        });

        await newUser.save();
        revalidatePath('/blog');
        revalidatePath('/admin');
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);
        revalidatePath('/blog');
        revalidatePath('/admin');
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

        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: 'Something went wrong' };
    }
}

export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (error) {
        if(error.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
        throw error;
    }
}