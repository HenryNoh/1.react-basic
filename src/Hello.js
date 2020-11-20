import React from 'react';

function Hello({color,name,isSpecial}) {
    return (
        <div style={{color}}>
            {/* 3항 연산자 사용 */}
            {/* {isSpecial ?<b>*</b> : null} */}
            {/* && || 논리계산법 (https://learnjs.vlpt.us/useful/03-short-circuiting.html) */}
            {isSpecial && <b>*</b>}
            Hello Friends {name}
        </div>
    );
}
// Name.defaultProps로 안에서 쓸 변수 설정해줄 시 default로 사용가능 
Hello.defaultProps = {
    name: '이름없음'
}

export default Hello;