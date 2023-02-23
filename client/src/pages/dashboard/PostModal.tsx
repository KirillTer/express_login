import React, { useState } from 'react';
import PostForm from "./PostForm";
import { Button, Modal } from 'antd';

interface PostModalProps {
  createNewPost: (post: any) => void;
}

const PostModal: React.FC<PostModalProps> = ({createNewPost}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{'margin': '20px'}}>
        Create new post
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <PostForm createNewPost={createNewPost} showModalForm={setIsModalOpen}/>
      </Modal>
    </>
  );
};

export default PostModal;