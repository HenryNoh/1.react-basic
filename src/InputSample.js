import React, { useState, useRef } from 'react';

function InputSample(){
    // const [text,setText] = useState('');

    // const onChange = (e) =>{
    //     setText(e.target.value);
    // };

    // const onReset = () =>{
    //     setText('');
    // };
    
    // useState를 썼을때 앞에 오는 [] 배열 안의 첫번째 인자는 변수, 두번째 인자는 함수이다.
    // useSate({ 이 안에 선언되는 것은 변수에서 사용할 객체이다. })
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });

    // 특정 DOM을 선택할 때 사용하는 ref
    const nameInput = useRef();

    // 비구조화 할당을 해주지 않으면 밑의 JSX에서 JS의 변수를 사용할 수 없다.
    const {name, nickname} = inputs;

    // es6의 화살표 함수로 JS function을 만들어준다.
    // (e)는 argu 인자이다.
    const onChange = (e) => {
        // 마찬가지로 비구조화 할당으로 onChane 함수가 작동 될 때 그곳에 선언된 value와 name을 받아온다.
        const {value,name} = e.target;
        // 이후 setInputs로 기존 inputs에 저장된 값을 바꿔준다.
        setInputs({
            // ...inputs는 es6문법으로 기존에 inputs에 저장된 모든 값을 복사해온다.
            ...inputs,
            // 밑의 name="name" 으로 선언 된 value를 바꿔준다.
            // name="name" 일 경우 {name}의 값을 바꿔주고
            // name="nickname" 일 경우 {nickname}의 값을 바꿔준다.
            [name]:value
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        })
        nameInput.current.focus();
    };

    return(
        <div>
            {/* <input onChange = {onChange} value = {text}/> */}
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick = {onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;