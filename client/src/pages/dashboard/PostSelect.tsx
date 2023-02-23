import React, { FC } from 'react'
import { Select } from 'antd';

interface PostSelectProps {
  selectPosts: (post: any) => void;
}

const PostSelect: FC<PostSelectProps> = ({selectPosts}) => {
  return ( 
    <Select
      defaultValue="title"
      style={{ width: 300 }}
      onChange={selectPosts}
      options={[
        {
          value: 'title',
          label: 'Title',
        },
        {
          value: 'body',
          label: 'Body',
        },
      ]}
    />
  );
}
 
export default PostSelect;