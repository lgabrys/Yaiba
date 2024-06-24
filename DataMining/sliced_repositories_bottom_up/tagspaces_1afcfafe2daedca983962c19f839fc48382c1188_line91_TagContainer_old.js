import React from 'react';
import uuidv1 from 'uuid';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveTagIcon from '@material-ui/icons/Close';
class TagContainer extends React.Component<Props> {
  render() {
    const {
      key,
      tag,
      deleteIcon,
      isDragging,
      defaultTextColor,
      defaultBackgroundColor,
      tagGroup,
      entryPath,
      allTags
    } = this.props;
    const { tagMode } = this.props;
    let mode = '';
    let textColor = tag.textcolor || defaultTextColor;
    let backgroundColor = tag.color || defaultBackgroundColor;
    allTags.some((currentTag: Tag) => {
      if (currentTag.title === tag.title) {
        textColor = currentTag.textcolor;
        backgroundColor = currentTag.color;
      }
    });
    if (tagMode === 'remove') {
      mode = deleteIcon || (
        <RemoveTagIcon
          data-tid={'tagRemoveButton_' + tag.title.replace(/ /g, '_')}
          style={{
            color: 'white'
          }}
          onClick={event => this.props.handleRemoveTag(event, tag)}
        />
      );
    } else if (tagMode === 'display') {
      mode = '';
    } else {
      mode = (
        <MoreVertIcon
          data-tid={'tagMoreButton_' + tag.title.replace(/ /g, '_')}
          style={{
            color: 'white'
          }}
        />
      );
    }
  }
}
