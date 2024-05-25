"use client";
import React, { useState } from 'react';
import styles from './login.module.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      router.push('/dashboard');
    }
    else {
      alert(data.message);
    }
  };

  return (
    <div className={styles['login-container']}>
      {/* need bigger h1 useing tailwind , add margin at bottom*/}
      <h1 className='text-4xl mb-4'>Login</h1>
      <form className={styles['formtag']} onSubmit={handleSubmit}>
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login