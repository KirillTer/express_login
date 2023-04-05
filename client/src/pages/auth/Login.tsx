import { useEffect, useState } from 'react'
import { Button, Form, Input, Layout, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../store/reducers/auth/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RouteNames } from '../../components/AppRouter';

const Login = () => {

  const { user, error } = useAppSelector(state => state.authReducer)
  const [ redirect, setRedirect] = useState(false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(user && redirect) {
      console.log('LOGIN', user, redirect)
      setRedirect(false)
      navigate(RouteNames.USERS);
    }
  }, [navigate, redirect, user])

  const onFinish = (values: any) => {
    dispatch(loginUser({email: values.email, password: values.password}));
    setRedirect(true)
  }

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: '40px' }}
          onFinish={onFinish}
          autoComplete={'false'}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 3, message: 'Please input at least 3 character!' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          {error && <p>{error}</p>}
        </Form>
      </Row>
    </Layout>
  );
}
 
export default Login;