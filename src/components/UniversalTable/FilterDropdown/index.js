import React from 'react'
import { Input, Button } from 'antd';
import './style.less';

class FilterDropdown extends React.Component {
    render() {
        const { keyValue, onSetSearchInput, onSearch, onReset, setSelectedKeys, selectedKeys, confirm, clearFilters } = this.props;
        return (
            <div className="custom-filter-dropdown">
                <Input
                    ref={element => onSetSearchInput(keyValue, element)}
                    placeholder="Wyszukaj"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => onSearch(keyValue, selectedKeys, confirm)}
                />
                <Button type="primary" onClick={() => onSearch(keyValue, selectedKeys, confirm)}>Wyświetl</Button>
                <Button onClick={() => onReset(keyValue, clearFilters)}>Wyczyść filter</Button>
            </div>
        );
    }
}

export default FilterDropdown;