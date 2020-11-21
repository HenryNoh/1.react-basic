import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import './App.css';

function App() {
  const name = 'react';
  const style = {
    backgroundColor : 'black',
    color: 'aqua',
    fontsize: 24,
    padding: '1rem'
  }
  return (
    // 다른 컴포넌트를 묶는 컴포넌트 style을 해당 컴포넌트 내부에서 설정시
    // 상위 컴포넌트의 props에 children을 넣어주고 내부 컴포넌트 안에 children을 넣어준다.
    <Wrapper>
    {/* 주석*/}
      {/* name을 정해줌 */}
      <Hello name="react" color="red" />
      {/* isSpecial이라는 props 설정 true값은 js라서 {}로 묶어주기*/}
      {/* isSpecial={true} == isSpecial */}
      <Hello name="isSpecial" color="blue" isSpecial />
      {/* name을 정해주지 않아서 default로 표시됨 */}
      <Hello color="pink"/>
      {/*
      App 내부에 설정해준 style과 name으로 설정됨
      div 태그에서 바로 css를 설정해주고 싶은 경우에는 style={sytle}
      .css에서 css를 설정해주고 싶은 경우에는 className(camelCase 사용)으로 div class 설정
      */}
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
      {/* Counter 사용하는 방법 */}
      <Counter/>
      {/* Input 사용하는 방법 */}
      <InputSample/>
    </Wrapper>
  );
}

export default App;
