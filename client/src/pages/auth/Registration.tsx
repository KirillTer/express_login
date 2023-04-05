import { useState } from 'react'
import { Tabs, TabsProps, Button, Form, Input, Layout, Row } from "antd";
import { registerUser } from '../../store/reducers/auth/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const Registration = () => {

  const { error } = useAppSelector(state => state.authReducer)
  const [ activeKey, setActiveKey] = useState('1')
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const nextTab = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      setActiveKey('2')
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const previousTab = () => {
    setActiveKey('1')
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Email and User name`,
      children: (
        <>
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
            label="User name"
            name="userName"
            rules={[
              { required: true, message: 'Please input your user name!' },
              { min: 3, message: 'Please input at least 3 character!'}
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="button" onClick={nextTab}>
              Next step
            </Button>
          </Form.Item>
        </>
      ),
    },
    {
      key: '2',
      label: `Password`,
      children: (
        <>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 3, message: 'Please input at least 3 character!'}
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirmation"
            name="confirmation"
            rules={[
              { required: true, message: 'Please confirm your password!' },
              { min: 3, message: 'Please input at least 3 character!'},
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === getFieldValue('password')) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Please input the same password!')
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Registration
            </Button>
          </Form.Item>
        </>
      ),
    },
    {
      key: '3',
      label: `Status`,
      children: <>
        {error ? error : `You have successfully registered`}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="button" onClick={previousTab}>
            Back to Registration
          </Button>
        </Form.Item>
      </>,
    },
  ];

  const onFinish = async (values: any) => {
    console.log('Finish')
    setActiveKey('3')
    dispatch(registerUser({email: values.email, userName: values.userName, password: values.password}));
  }

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: '40px' }}
          onFinish={onFinish}
          autoComplete={'false'}
        >
          <Tabs defaultActiveKey="1" items={items} activeKey={activeKey}/>
        </Form>
      </Row>
    </Layout>
  );
}
 
export default Registration