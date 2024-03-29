"use client"

import React from 'react'
import styles from './loginForm.module.css';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/action';
import Link from 'next/link';

const LoginForm = () => {
    const [state, formAction] = useFormState(login, undefined);

    const router = useRouter();

  return (
    <form className={styles.form} action={formAction}>
        <input type="text" placeholder='username' name='username' />
        <input type="password" placeholder='password' name='password' />
        <button>Login</button>

        {state?.error}
        <Link href="/register">Doesn't have an account? <u>Register</u></Link>
    </form>
  )
}

export default LoginForm