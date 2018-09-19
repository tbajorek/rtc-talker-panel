import React from 'react';
import {Icon, Tag} from "antd";

class ButtonTag extends React.Component {
    render() {
        const {setAdding, addible} = this.props;
        return <Tag
            key="addingTag"
            onClick={() => addible ? setAdding(true) : null}
            style={{ background: '#fff', borderStyle: 'dashed' }}
        >
            <Icon type="plus" /> Dodaj nowy
        </Tag>
    }
}

export default ButtonTag;