import React, { FC, useEffect, useState } from 'react'
import PostSelect from "./PostSelect";
import { Input } from 'antd';

interface PostFilterProps {
  posts: [];
  handleFilter: (posts: any) => void;
}

const PostFilter: FC<PostFilterProps> = ({ posts, handleFilter }) => {

  const [sortedPosts, setSortedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSortedPosts(posts);
  }, [posts]);

  useEffect(() => {
    handleFilter(sortedPosts ? sortedPosts.filter((post) => (post['body'] as string).toLowerCase().includes(searchQuery)) : posts as []);
  }, [sortedPosts, searchQuery, posts, handleFilter]);

  const handleSelect = (val: any) => {
    setSortedPosts([...posts].sort((a: any, b: any) => a[val].localeCompare(b[val])));
  }

  return ( 
    <div style={{display: 'flex', justifyContent: 'space-around',  'margin': '20px 0 0 0'}}>
      <PostSelect selectPosts={handleSelect}/>
      <Input style={{ width: 300 }} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='Search'/>
    </div>
  );
}
 
export default PostFilter;