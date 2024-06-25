N
o
 
l
i
n
e
s
import i18n from 'i18next';
export default i18n;
import React from 'react';
import TagsSelect from '../TagsSelect';
import i18n from '../../services/i18n';
class AddRemoveTagsDialog extends React.Component<Props, State> {
  render() {
    const { newlyAddedTags = [] } = this.state;
    return (
        renderContent={() => (
            <TagsSelect placeholderText={i18n.t('core:selectTags')} tags={newlyAddedTags} handleChange={this.handleChange} />
        )}
    );
  }
}
