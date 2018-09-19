import React from 'react';
import {Row, Progress} from "antd";
import readableFileSize from "tbrtc-common/utilities/readableFileSize";
import './style.less';

const FileProgress = ({channelId, info, stats}) => (
    <React.Fragment>
        <Row className="transferred-filename">
            {info.name}
        </Row>
        <Row className="transferred-filesize">
            {readableFileSize(info.size)}
        </Row>
        {!!stats
            ? <Row>
                <Progress percent={stats.percent} size="small" status={stats.percent < 99.99 ? 'active' : 'success'}/>
            </Row> : null
        }

    </React.Fragment>
);

export default FileProgress;