import React from 'react';
import ui from 'redux-ui';
import { Row, Col, Icon, Tooltip, Button, Checkbox, Switch, Divider } from 'antd';
import './style.less';
import {setOnlineStatus} from "../../actions/availability";

@ui({
    key: 'availabilityForm',
    state: {
        video: false,
        audio: false,
        chat: false
    }
})
class Availability extends React.Component {
    getAvailability(type) {
        return typeof this.props.availability !== 'undefined' && this.props.availability.indexOf(type) >= 0;
    }
    componentWillMount() {
        const video = this.getAvailability('video');
        const audio = this.getAvailability('audio');
        const chat = this.getAvailability('chat');
        this.props.updateUI({video, audio, chat});
    }
    render() {
        return (
            <React.Fragment>
                <Row className="online-switch">
                    <h2>Włącz dostępność online</h2>
                    <Switch checked={this.props.online} className="online-switch" loading={this.props.changingOnline} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} onChange={() => this.props.setOnlineStatus(!this.props.online)}/>
                </Row>
                <Divider />
                <Row>
                    <h2>Kanały komunikacji</h2>
                    <Col span={8}><Tooltip title="Połączenie wideo">
                        <Checkbox checked={this.props.ui.video} onChange={() => this.props.updateUI('video', !this.props.ui.video)}><Icon type="video-camera" className={`availability-type${this.props.ui.video ? ' checked' : ''}`} /></Checkbox>
                    </Tooltip></Col>
                    <Col span={8}><Tooltip title="Połączenie audio">
                        <Checkbox checked={this.props.ui.audio} onChange={() => this.props.updateUI('audio', !this.props.ui.audio)}><Icon type="phone" className={`availability-type${this.props.ui.audio ? ' checked' : ''}`} /></Checkbox>
                    </Tooltip></Col>
                    <Col span={8}><Tooltip title="Rozmowa tekstowa">
                        <Checkbox checked={this.props.ui.chat} onChange={() => this.props.updateUI('chat', !this.props.ui.chat)}><Icon type="message" className={`availability-type${this.props.ui.chat ? ' checked' : ''}`} /></Checkbox>
                    </Tooltip></Col>
                </Row>
                <Row className="availability-buttons">
                    <Col span={12}>
                        <Button type="primary" size="large" icon="save" onClick={() => this.props.changeAvailability(this.props.userId, this.props.ui, this.props.token)}>Zapisz</Button>
                    </Col>
                    <Col span={12}>
                        <Button type="default" size="large" icon="close" onClick={() => {
                            const video = this.getAvailability('video');
                            const audio = this.getAvailability('audio');
                            const chat = this.getAvailability('chat');
                            this.props.updateUI({video, audio, chat});
                        }}>Anuluj</Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Availability;