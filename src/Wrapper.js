import React from 'react';

// children을 props로 받은 후
function Wrapper({children}){
    const style={
        border: '2px solid black',
        padding: '16px',
    };
    return(
        <div style={style}>
            {/* 해당 컴포넌트의 내부에 children을 선언 */}
            {children}
        </div>
    )
}

export default Wrapper;