import React from 'react';
import { square } from '../utils';

export default class Index extends React.Component {
    render() {
        return <div>
            {square(12)}
        </div>
    }
}