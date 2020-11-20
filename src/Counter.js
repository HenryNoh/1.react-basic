import React, {useState} from 'react';

function Counter(){
    const [number,setNumber] = useState(0);
    // 새로운 값을 파라미터에 넣는 방식 
    // const onIncrease = () =>{
    //     setNumber(number+1);
    //     console.log('+1');
    // }
    // const onDecrease = () =>{
    //     setNumber(number-1);
    //     console.log('-1');
    // }
    
    // 기존 값을 업데이트하는 방식
    // 함수형 업데이트 방식
    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1);
    }

    const onDecrease = () => {
        setNumber(prevNumber => prevNumber - 1);
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;