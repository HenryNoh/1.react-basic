import React, { useState, useRef, useMemo, useCallback, useReducer } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users){
  console.log('활성 사용자를 세는 중');
  return users.filter(user=>user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
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
  ]
};

function reducer(state,action){
  switch (action.type){
    case 'CHANGE_INPUT':
      return{
        // 기존의 state를 받아오고
        // inputs 값에 state의 inputs를 넣어주고
        // 해당 dispatch에서 가져온 name과 value를 선택해서 바꿔준다.
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      // inputs에 기존의 initialState의 inputs를 넣어줘서 생성하고 (빈거?)
      // users는 App에서 비구조화 할당으로 state가 구현되서 그곳의 users의 기존 값을 복사해온다 처음에는
      // 그 다음부터는 작동된 action을 통하여 받아온 user를 복사해서 새걸 만들어준다.
      return{
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      // Toggle 할 때는 기존의 state 받아오고
      // users 객체를 map함수로 탐색하는데
      // 만약에 user의 id와 동작한 action의 id가 같으면
      // 기존 user를 복사하여 active속성만 false로 바꿔준다.
      // id가 다르면 user를 그대로 놔둔다.
      return{
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? {...user, active: !user.active} : user
        )
      };
    case 'REMOVE_USER':
      // Remove 할 때는 기존의 state 받아오고
      // users에서 filter 함수로 해당꺼 제외하고 다시 만들어준다. 
      return{
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  // useReducer를 사용해서 첫번째 인자 reducer 함수, 두번째 인자 initialState를 받아오고
  // 비구조화 할당으로 state에 넣어준다.
  // 비구조화 할당으로 users에 state값을 할당
  // 비구조화 할당으로 username,email에 state의 input에 들어가 있는 값을 할당
  // onCreate에서 써줄 nextId를 useRef로 할당
  const [state,dispatch] = useReducer(reducer,initialState);
  const { users } = state;
  const { username, email } = state.inputs;
  const nextId = useRef(4);

  // onChange 함수는 useCallback으로 구현해준다.
  // onChange 함수가 들어갈 곳에서 name과 value를 받아오고
  // dispatch를 통해서 reducer의 action.name에 함수가 들어갈 곳에서 받아온 name을 넣어주고
  // action.value에 함수가 들어갈 곳에서 받아온 value를 넣어준다.
  const onChange = useCallback(e => {
    const { name,value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  }, []);
  
  // onCreate 함수는 useCallback으로 구현해준다.
  // dispatch를 통해서 reducer의 users를 바꿔줄 action.user에 username과 email을 넣어준다. 
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
  }, [username,email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} onToggle={onToggle} onRemove={onRemove}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;