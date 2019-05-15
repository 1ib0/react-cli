import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import styles from './index.less';
import { square } from './utils';
import './assets/fonts/iconfont.css';

function App() {
    /**
     * 测试 懒加载
     * 测试结果：import()的模块会打包成单独的chunk
     */
    // import('./utils')
    // .then((modules) => {
    //     const cube = modules.cube;
    //     cube(12);
    // })
    // .catch(error => console.log(error));
    
    /**
     * 测试 tree shaking
     * 测试结果：当只是引入square方法而不引入cube方法是，build打包会删除掉cube的代码
     */
    // square(12);
    // // cube(12);
    return (<div>
        <div className={styles.flex_wrapper}>
            <Button type='primary'>left</Button>
            <Button type='primary'>right</Button>
        </div>
        <div>
            <img className={styles.camera} src={require('./assets/images/camera.svg')} alt="相机" />
            <img className={styles.camera} src={require('./assets/images/ckxt.jpeg')} alt="刺客信条" />
        </div>
        <i className='iconfont iconblock'></i>
        <i className='iconfont icon-wujiaoxing'></i>
    </div>)
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);