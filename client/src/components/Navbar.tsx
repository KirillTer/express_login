import { Menu } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logoutUser } from '../store/reducers/auth/ActionCreators'
import { RouteNames } from './AppRouter';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user } = useAppSelector(state => state.authReducer)

  const publicMenuItems = [
    {
      key: "/login",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.LOGIN),
      label: 'Login'
    },
    {
      key: "/registration",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.REGISTRATION),
      label: 'Registration'
    }
  ];

  const privateMenuItems = [
    {
      key: "/login",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.LOGIN),
      label: 'Login'
    },
    {
      key: "/registration",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.REGISTRATION),
      label: 'Registration'
    },
    {
      key: "/users",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.USERS),
      label: 'Users'
    },
    {
      key: "user",
      label: user ? user.email : 'User',
      icon: <UserOutlined />,
      children: [
        {
          label: 'Logout',
          key: 'logout',
          onClick: () => {
            dispatch(logoutUser())
            navigate(RouteNames.LOGIN)
          },
        },
      ],
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu
          theme='dark'
          mode="horizontal"
          selectedKeys={(location.pathname !== `/`) ? [location.pathname] : isAuth ? [RouteNames.USERS] : [RouteNames.LOGIN]}
          items={isAuth ? privateMenuItems : publicMenuItems}
        />
      </Header>
    </Layout>
  );
}
 
export default Navbar;