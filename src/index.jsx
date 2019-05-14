// index.js 
// import hello from './hello';

// import welcome from './pages/welcome';
// import { square } from './utils/math';

// document.querySelector("#root").appendChild(hello());

// if (module.hot) {
//     module.hot.accept('./pages/welcome', function () {
//         console.log('---> accept welcome page update');
//         welcome();
//     });
// }

// welcome();
// const squareValue = square(12);
// console.log('squareValue --->', squareValue);
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import style from './index.less';
import './index.less'

function App() {
    return <div className={style.flex_wrapper}>
        <Button type='primary'>left</Button>
        <Button type='primary'>right</Button>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

