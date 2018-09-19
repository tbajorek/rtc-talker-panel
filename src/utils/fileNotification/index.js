import {Icon, notification} from "antd";
import FileProgress from "../../components/FileProgress";
import React from "react";
import './style.less';

export const updateFileNotification = (channelId, type, info, stats) => notification.open({
    btn: null,
    icon: <Icon type={type === 'sent' ? 'upload' : 'download'} />,
    message: `${type === 'sent' ? 'Wysyłanie' : 'Pobieranie'} pliku`,
    key: channelId,
    placement: 'bottomLeft',
    description: <FileProgress channelId={channelId} info={info} stats={stats} />,
    duration: 0,
    className: `file-transfer-notification${(stats && stats.percent < 99.99) ? ' working' : ''}`
});