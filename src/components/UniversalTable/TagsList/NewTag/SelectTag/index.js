import React from 'react';
import { Select } from 'antd';
import './style.less';

const Option = Select.Option;

class SelectTag extends React.Component {
    componentDidMount() {
        if(!this.props.newTagOptions && this.props.addible) {
            this.props.loadData();
        }
    }
    render() {
        const {elemId, setNewValue, loading, newTagOptions, excludedOptions, setAdding} = this.props;
        return <Select style={{ width: 120 }} onChange={value => {setAdding(false); return setNewValue(elemId, value);}} disabled={loading} onBlur={() => setAdding(false)}>
            {
                newTagOptions ? newTagOptions
                    .filter(newOption => !excludedOptions.find(excluded => excluded.id === newOption.id))
                    .map(option =>
                        <Option key={option.id} value={option.id}>{option.name}</Option>
                    )
                : null
            }
            </Select>;
    }
}

export default SelectTag;