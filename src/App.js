// import React, { useState, useRef, useMemo } from 'react';
// import CreateUser from './CreateUser';
// import UserList from './UserList';
// import './App.css';

// function countActiveUsers(users){
//   console.log('활성 사용자를 세는 중');
//   return users.filter(user=>user.active).length;
// }

// function App() {
//   // 상태값 선언
//   const [inputs, setInputs] = useState({
//     username: '',
//     email: ''
//   });
//   // 비구조화 할당
//   const { username, email }= inputs;
//   const onChange = e =>{
//     const { name, value } = e.target;
//     setInputs({
//       ...inputs,
//       [name]: value
//     });
//   }

//   // useState를 사용할 배열 생성
//   const [users,setUsers] = useState([
//     {
//       id: 1,
//       username: 'velopert',
//       email: 'public.velopert@gmail.com',
//       active: true
//     },
//     {
//       id: 2,
//       username: 'tester',
//       email: 'tester@example.com',
//       active: false
//     },
//     {
//       id: 3,
//       username: 'liz',
//       email: 'liz@example.com',
//       active: false
//     }
//   ]);

//   const nextId = useRef(4);
//   // onCreate 함수 새거 만들때
//   const onCreate = () => {
//     const user = {
//       // current는 usRef를 쓴 nextId의 현재값 받아올 때 사용
//       // 새로만들 때 id 계속 수정되니까 현재값으로 받아옴
//       id: nextId.current,
//       username,
//       email
//     };
//     // setUsers(users.concat(user));
//     // concat으로도 배열 복사가능
//     setUsers([...users, user]);

//     setInputs({
//       username: '',
//       email: ''
//     });
//     nextId.current+=1;
//   };

//   const onRemove = id =>{
//     // user.id가 onRemove를 누른 id와 일치하지 않는 원소들만 골라서 user를 새로 만듬
//     // 그말은 즉 user.id가 같은것만 빼고 새로 만듬
//     setUsers(users.filter(user=>user.id!==id));
//   };
  
  
//   const onToggle = id =>{
//     setUsers(
//       users.map(user =>
//         // onToggle를 눌렀을 때 user.id가 id와 같으면
//         // {...user(user를 불러와서), active(속성을): !user.active(false로 수정)}를 수행
//         // 아니면 그대로 user 사용
//         user.id === id ? { ...user, active: !user.active } : user
//       )
//     );
//   };
//   const count = useMemo(() => countActiveUsers(users), [users]);

//   return (
//     <>
//       <CreateUser
//         username={username}
//         email={email}
//         onChange={onChange}
//         onCreate={onCreate}
//       />
//       <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
//       <div>활성사용자 수 : {count}</div>
//     </>
//   );
// }

// export default App;


import React, { useRef, useState, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
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
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;