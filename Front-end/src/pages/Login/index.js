import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Sử dụng Link của React Router để chuyển trang
import styles from './Login.module.scss';
import images from '~/assets/images';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý đăng nhập tại đây
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Remember me:', remember);
    };

    return (
        <div className={styles.loginForm}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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

                <div className={styles.rememberForgot}>
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#!" className={styles.forgotLink}>
                        Forgot Password?
                    </a>
                </div>

                <button type="submit" className={styles.loginButton}>
                    Login
                </button>

                <div className={styles.divider}>or</div>

                <div className={styles.socialLogin}>
                    <button type="button" className={styles.facebookBtn}>
                        <img src={images.facebook} alt="Facebook " className={styles.iconBtn} />

                        <span className={styles.textFacebook}> Facebook </span>
                    </button>
                    <button type="button" className={styles.googleBtn}>
                        <img src={images.google} alt="Google " className={styles.iconBtn} />
                        <span className={styles.textGoogle}> Google </span>
                    </button>
                </div>
            </form>

            <div className={styles.switch}>
                <span>Bạn chưa có tài khoản? </span>
                {/* Dùng Link để chuyển sang trang Signup */}
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;
