import { useReducer, useCallback } from 'react';
//App 내부의 onChange 함수를 callback 쓴거랑 App 밖에 reducer
//useInputs 내부의 onChange 함수를 callback 쓴거랑 외부에 reducer

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'RESET':
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = '';
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE',
      name,
      value,
    });
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: 'RESET',
    });
  }, []);
  return [form, onChange, reset];
}

export default useInputs;
