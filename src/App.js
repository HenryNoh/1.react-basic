import React, { useState, useRef, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users){
  console.log('활성 사용자를 세는 중');
  return users.filter(user=>user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email }= inputs;

  const onChange = useCallback(
    e => {
      console.log("변화됨");
      const { name, value } = e.target;
      setInputs(inputs=>({
        ...inputs,
        [name]: value
      }));
    },[]
  );

  const [users,setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(
    () => {
      console.log("생성됨");
      const user = {
        id: nextId.current,
        username,
        email
      };
      setUsers(users => users.concat(user));

      setInputs({
        username: '',
        email: ''
      });
      nextId.current+=1;
    },[username,email]
  );

  const onRemove = useCallback(
    id =>{
      console.log("제거됨");
      setUsers(users => users.filter(user=>user.id!==id));
    },
    []
  );
  
  const onToggle = useCallback(
    id =>{
      console.log("토글됨");
      setUsers(users =>
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },[]
  );

  const count = useMemo(
    () =>
     countActiveUsers(users), [users]
  );

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;