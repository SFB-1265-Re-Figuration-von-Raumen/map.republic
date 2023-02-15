import Nav from '@/components/Nav';
import { UserProvider } from '@/pages/api/authContext';

const Layout = ({ user, loading = false, children }) => (
    <UserProvider value={{ user, loading }}>
        <Nav />
        {children}
    </UserProvider >
);
export default Layout;