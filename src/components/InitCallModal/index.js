import React from 'react';
import {Modal, Button, Row, Col} from 'antd';
import {findRouteByName} from "../../routes";
import ExtendedAvatar from "../ExtendedAvatar";

const InitCallModal = ({user, isTalkRequest, type, loadingTalk, onAcceptTalk, onRejectTalk, history}) => {
    const getIcon = type => {
        switch (type) {
            case 'video':
                return 'video-camera';
            case 'audio':
                return 'phone';
            case 'chat':
                return 'message';
            default:
                return 'check';
        }
    };
    return (
        <Modal
            title="Prośba o rozmowę"
            visible={user !== null && isTalkRequest}
            footer={[
                <Button key="accept" onClick={onRejectTalk}>Orzuć</Button>,
                <Button key="reject" type="primary" icon={getIcon(type)} loading={loadingTalk}
                        onClick={() => {
                            onAcceptTalk();
                            const nextRoute = findRouteByName('active-talk');
                            if(!!nextRoute) {
                                history.push(nextRoute.path);
                            }
                        }}>Akceptuj</Button>,
            ]}
        >
            {!!user ? <React.Fragment>
                <Row className="avatar-container"><ExtendedAvatar user={user}/></Row>
                <Row>
                    <Col span={12}>Użytownik</Col>
                    <Col span={12}>{user.name} {user.surname}</Col>
                </Row>
                {!!user.email ? <Row>
                    <Col span={12}>Email</Col>
                    <Col span={12}>{user.email}</Col>
                </Row> : null }
            </React.Fragment> : null}
        </Modal>
    );
};

export default InitCallModal;