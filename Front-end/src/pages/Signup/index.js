import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Dùng Link để chuyển trang
import styles from './Signup.module.scss';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // Xử lý đăng ký tại đây
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className={styles.signupForm}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">User name</label>
                    <input
                        type="text"
                        id="username"
                        className={styles.input}
                        placeholder="Nhập tên đăng nhập..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        placeholder="Nhập email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.input}
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className={styles.signupButton}>
                    Sign Up
                </button>
            </form>

            <div className={styles.switch}>
                <span>Bạn đã có tài khoản? </span>
                {/* Dùng Link để chuyển sang trang Login */}
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;
