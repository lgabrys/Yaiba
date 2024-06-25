N
o
 
l
i
n
e
s
import React from 'react';
import TagsSelect from '../TagsSelect';
class AddRemoveTagsDialog extends React.Component<Props, State> {
  render() {
    const { newlyAddedTags = [] } = this.state;
    return (
        renderContent={() => (
            <TagsSelect tags={newlyAddedTags} handleChange={this.handleChange} />
        )}
    );
  }
}
