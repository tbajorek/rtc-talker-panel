import React from 'react';
import ui from 'redux-ui';
import {Table} from 'antd';
import userChecker from "../../utils/userChecker";
import FilterDropdown from "./FilterDropdown";

import './style.less';

@ui({
    key: 'universalTable',
    state: {
        searched: {},
        sortedInfo: {},
        filteredInfo: {},
    }
})
class UniversalTable extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = {};
    }

    onSetSearchInput(key, element) {
        this.searchInput[key] = element;
    }

    onSearch(key, selectedKeys, confirm) {
        confirm();
        this.props.updateUI('searched', {...this.props.ui.searched, [key]: selectedKeys[0]});
    }

    onReset(key, clearFilters) {
        clearFilters();
        this.props.updateUI('searched', {...this.props.ui.searched, [key]: ''});
    }

    _getUniqueValues(dataSource, key) {
        const values = dataSource.reduce((a, b) => a.includes(b[key]) ? a : [...a, b[key]], []);
        console.log(values);
        return dataSource.reduce((a, b) => a.includes(b[key]) ? a : [...a, b[key]], []);
    }

    onChange(pagination, filters, sorter) {
        this.props.updateUI({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    columnsWorking(columns, dataSource, loggedUser) {
        const newColumns = [];
        let newColumn;
        let newDataSource = dataSource;
        columns.forEach(column => {
                if (userChecker(loggedUser, column)) {
                    newColumn = {key: column.key, dataIndex: column.key, title: column.title};
                    if (column.filters) {
                        const uniqueValues = this._getUniqueValues(dataSource, column.key).map(value => ({
                            text: value,
                            value
                        }));
                        if(uniqueValues.length === 0) {
                            newColumn.filters = uniqueValues;
                            newColumn.onFilter = (value, record) => (typeof record[column.key] === 'string' || Array.isArray(record[column.key])) ? record[column.key].includes(value) : record[column.key] == value;
                            newColumn.filteredValue = this.props.ui.filteredInfo[column.key] || null;
                        }
                    }
                    if (typeof column.sorter !== 'undefined') {
                        newColumn.sorter = column.sorter;
                        newColumn.sortOrder = this.props.ui.sortedInfo.columnKey === column.key && this.props.ui.sortedInfo.order;
                    }
                    if (typeof column.render !== 'undefined') {
                        newColumn.render = column.render;
                    }
                    if (column.searching) {
                        newColumn.filterDropdown = (params) => <FilterDropdown {...params} keyValue={column.key}
                                                                               onSetSearchInput={this.onSetSearchInput.bind(this)}
                                                                               onSearch={this.onSearch.bind(this)}
                                                                               onReset={this.onReset.bind(this)}/>;
                        if(column.onFilter) {
                            newColumn.onFilter = column.onFilter;
                        } else {
                            newColumn.onFilter = (value, record) => ('' + record[column.key]).toLowerCase().includes(('' + value).toLowerCase());
                        }
                        newColumn.onFilterDropdownVisibleChange = (visible) => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput[column.key].focus();
                                });
                            }
                        };
                        if (!column.render) {
                            newColumn.render = (text) => {
                                if(text === null) {
                                    return '';
                                }
                                const searchText = this.props.ui.searched[column.key];
                                const regExp = new RegExp(searchText, 'gi');
                                const match = text.match(regExp);
                                let key = 1;
                                return searchText ? (
                                    <span>
                                        {text.split(regExp).map((fragment, i) => {
                                            return (
                                                i > 0 ? <React.Fragment key={key++}><span className="found-value">{match[0]}</span>{fragment}</React.Fragment> : fragment
                                        )})}
                                    </span>
                                ) : text;
                            };
                        }
                    }
                    newColumns.push(newColumn);
                }
            }
        );
        columns.forEach(column => {
            if(column.transform) {
                newDataSource = newDataSource.map(singleData => ({...singleData, [column.key]: column.transform(singleData[column.key])}));
            }
        });
        return {columns: newColumns, dataSource: newDataSource};
    }

    render() {
        const {columns, dataSource} = this.columnsWorking(this.props.columns, this.props.dataSource, this.props.loggedUser);
        return (
            <Table className="universal-table" columns={columns} dataSource={dataSource} onChange={this.onChange.bind(this)} loading={this.props.loading} />
        );
    }
}

export default UniversalTable;

/**
 + key
 + title
 + filters: true
 + searching: true
 + sorter: (a, b) => -1
 + role/roles
 */