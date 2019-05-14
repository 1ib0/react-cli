import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import styles from './index.less';

function App() {
    return (<React.Fragment>
        <div className={styles.flex_wrapper}>
            <Button type='primary'>left</Button>
            <Button type='primary'>right</Button>
        </div>
        <div>
            <img className={styles.camera} src={require('./assets/camera.svg')} alt="相机" />
        </div>
    </React.Fragment>)
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

