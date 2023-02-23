import React, { FC, useState } from 'react'
import { Button, Form, Input } from 'antd';

interface PostFormProps {
  createNewPost: (post: any) => void;
  showModalForm: (val: boolean) => void;
}

const PostForm: FC<PostFormProps> = ({ createNewPost, showModalForm }) => {

  const [form] = Form.useForm();
  const [post, setPost] = useState({title: '', body: ''});

  const handleCreate = () => {
    createNewPost(post);
    setPost({title: '', body: ''});
    form.resetFields();
    showModalForm(false);
  }

  return (
    <div>
      <Form form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title' }]}
        >
          <Input value={post.title} onChange={e => setPost({...post, title: e.target.value})} placeholder='Title'/>
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please input body' }]}
        >
          <Input value={post.body} onChange={e => setPost({...post, body: e.target.value})} placeholder='Body'/>
        </Form.Item>
        
        <Button type='primary' onClick={handleCreate}>
          Add new post
        </Button>
      </Form>
    </div>
  );
}

export default PostForm;