import React from 'react';

function User({user}){
    return(
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    )
}
// map 함수 사용방법
// app에서 users를 받아와서 users 배열을 돌면서 각각의 user는 User 컴포넌트의 user로 들어간다.
// map 함수를 쓸 때는 필수로 key도 함께 설정해주어야 한다.
function UserList({users}){
    return(
        <div>
            {users.map(user=>(
                <User user={user} key={user.id}/>
            ))}
        </div>
    );
}

export default UserList;