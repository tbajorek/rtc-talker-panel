import React from 'react';
import {Tag, Tooltip} from "antd";
import NewTag from "./NewTag";

class TagsList extends React.Component {
    render() {
        const {data, elemId, loading, closable, newTagOptions, addElement, removeElement, loadData, excludedOptions, addible} = this.props;
        const tags = data.map((element, index) => {
            const isLongTag = element.name.length > 20;
            const tagElem = (
                <Tag key={element.id} closable={closable} afterClose={() => removeElement(elemId, element.id)}>
                    {isLongTag ? `${element.name.slice(0, 20)}...` : element.name}
                </Tag>
            );
            return isLongTag ? <Tooltip title={element.name} key={element.id}>{tagElem}</Tooltip> : tagElem;
        });
        if(addible) {
            tags.push(<NewTag key="newTag" elemId={elemId} loadData={loadData} setNewValue={addElement} loading={loading} newTagOptions={newTagOptions} excludedOptions={excludedOptions} addible={addible}/>);
        }
        return tags;
    }
}

export default TagsList;