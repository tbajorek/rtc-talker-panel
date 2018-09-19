import React from 'react';
import ui from "redux-ui";
import SelectTag from "./SelectTag";
import ButtonTag from "./ButtonTag";

@ui({
    state: {
        isAdding: false
    }
})
class NewTag extends React.Component {
    render() {
        const {elemId, loading, newTagOptions, updateUI, setNewValue, loadData, excludedOptions, addible} = this.props;
        return this.props.ui.isAdding
            ? <SelectTag setAdding={value => updateUI('isAdding', value)} elemId={elemId} setNewValue={setNewValue}
                         loading={loading} newTagOptions={newTagOptions} loadData={loadData} excludedOptions={excludedOptions} addible={addible}/>
            : <ButtonTag addible={addible} setAdding={value => updateUI('isAdding', value)}/>;
    }
}

export default NewTag;