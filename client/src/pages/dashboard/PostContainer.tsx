
// import React, { useEffect, useState, useRef, useTransition } from "react";
import { Button, Layout, Row } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { userAPI } from "../../services/UserService";
import PostItem from "./PostItem";
// import PostFilter from "./PostFilter";
// import PostModal from "./PostModal";
import { IUser } from "../../models/IUser";


const Table = () => {

  // const [_, startTransition] = useTransition();
  // const [selectedSortedPosts, setSelectedSortedPosts] = useState([]);
  
  const {
    data: users,
    error: apiError,
    isLoading,
    refetch,
  } = userAPI.useFetchAllUsersQuery({});

  const [updatePost] = userAPI.useUpdateUserMutation();
  const [deletePost] = userAPI.useDeleteUserMutation();
  // const [createPost] = userAPI.useCreateUserMutation();

  // const handleCreate = async (newUser: IUser) => {
  //   await createPost({ email: newUser.email, password: newUser.password } as IUser);  
  // };

  const handleRemove = (user: IUser) => {
    deletePost(user);
  };

  const handleUpdate = (user: IUser) => {
    updatePost(user);
  };

  // const handleFilter = (user: IUser) => {
  //   setSelectedSortedPosts(user as any);
  // };

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        {/* <PostFilter users={users as []} handleFilter={handleFilter}/> */}
        <div className="post__list">
          <Button type="primary" onClick={() => refetch()}>Refetch</Button>
          {/* <PostModal createNewPost={handleCreate}/> */}
          <h1 >Users list</h1>
          {apiError 
            ? <h1>{(apiError as any).data.message}</h1>
            : isLoading 
            ? <h1>Loading...</h1>
            : !users?.length
            ? <div>No available users</div>
            : <TransitionGroup>
              {users.map((user: IUser) => (
                <CSSTransition
                  key={user._id}
                  timeout={500}
                  classNames="postAnimation"
                >
                  <PostItem
                    remove={handleRemove}
                    update={handleUpdate}
                    key={user._id}
                    user={user}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          }
        </div>
      </Row>
    </Layout>
  );
}
 
export default Table;