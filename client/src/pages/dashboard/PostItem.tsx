import React, { FC } from 'react';
import { IUser } from "../../models/IUser";
import { Button } from 'antd';

interface UserItemProps {
  user: IUser;
  remove?: (post: IUser) => void;
  update?: (post: IUser) => void;
}

const PostItem: FC<UserItemProps> = ({ user, remove, update }) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (remove) remove(user)
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const email = prompt() || ""
    if (update) update({ ...user, email })
  }

  return (
    <div className="postItem" onClick={handleUpdate}>
      <div className="postItem_header">
        {user._id}. {user.email}
        <Button type="primary" danger onClick={handleRemove}>Delete</Button>
      </div>
    </div>
  );
};

export default PostItem;