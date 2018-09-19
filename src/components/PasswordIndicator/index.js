import React from 'react';
import { Progress } from 'antd';
import heatmapBar from '../../utils/heatmapBar';
import './style.less';

const PasswordIndicator = ({percent, status, errors}) => {
    const statusMsg = errors.length > 0 ? 'niewystarczające' : status;
    const errorMsgs = [];
    errors.forEach((error, index) => errorMsgs.push(<li key={index}>{error}</li>));
    return (
        <div className="password-indicator">
            <Progress
                percent={percent}
                format={percent => statusMsg}
                strokeLinecap="square"
                strokeColor={heatmapBar(percent)}
            />
            {
                errors.length ? <ul className="errors">{errorMsgs}</ul> : null
            }
        </div>
    );
};

export default PasswordIndicator;