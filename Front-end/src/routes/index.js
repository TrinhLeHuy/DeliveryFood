import { LoginLayout } from '~/components/Layout';
import { SignupLayout } from '~/components/Layout';
import Login from '~/pages/Login';
import Home from '../pages/Home';
import Signup from '~/pages/Signup';
import Menu from '../pages/Menu';
import Payment from '../pages/Payment';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/payment', component: Payment },
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/signup', component: Signup, layout: SignupLayout },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes }; 