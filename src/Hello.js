import React from 'react';

function Hello({color,name}) {
    return (
        <div style={{color}}>
            Hello Friends {name}
        </div>
    );
}
// Name.defaultProps로 안에서 쓸 변수 설정해줄 시 default로 사용가능 
Hello.defaultProps = {
    name: '이름없음'
}

export default Hello;