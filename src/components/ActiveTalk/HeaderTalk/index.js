import React from 'react';
import { Row, Col, Popover, Icon, Button, Tooltip, Popconfirm } from "antd";
import ExtendedAvatar from '../../ExtendedAvatar';
import './style.less';

const getContent = (domain, siteUrl) => (
    <div>
        <p>Domena: <b>{domain}</b></p>
        <p>Adres strony: <b>{siteUrl}</b></p>
    </div>
);

const HeaderTalk = ({remoteUser, talkStop, domain, siteUrl}) => (
    <Row className="active-talk-header">
        <Col className="avatar-container" span={2}><ExtendedAvatar size={64} user={remoteUser}/></Col>
        <Col className="user-details" span={5}>
            <h3>{remoteUser.name} {remoteUser.surname}</h3>
            <Popover content={getContent(domain, siteUrl)} title="Szczegóły" trigger="hover">
                <Icon className="info-icon" type="info-circle" style={{ cursor: 'pointer', fontSize: 26, color: 'rgb(3, 91, 135)' }} />
            </Popover>
        </Col>
        <Col span={7}>
            <Popconfirm title="Czy chcesz zakończyć tę rozmowę?" onConfirm={talkStop} onCancel={()=>null} okText="Tak" cancelText="Nie">
            <Tooltip title="Zakończ rozmowę">
                <Button className="disconnect-button" icon="poweroff" />
            </Tooltip>
            </Popconfirm>
        </Col>
    </Row>
);

export default HeaderTalk;