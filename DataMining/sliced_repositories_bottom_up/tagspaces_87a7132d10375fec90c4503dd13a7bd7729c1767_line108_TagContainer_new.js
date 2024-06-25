import React from 'react';
import uuidv1 from 'uuid';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveTagIcon from '@material-ui/icons/Close';
class TagContainer extends React.Component<Props> {
  static defaultProps = {
    isDragging: false,
    tagMode: 'default',
    key: undefined,
    tagGroup: undefined,
    entryPath: undefined,
    deleteIcon: undefined,
    defaultTextColor: undefined,
    defaultBackgroundColor: undefined
  };
  render() {
    const {
      key,
      tag,
      deleteIcon,
      isDragging,
      defaultTextColor,
      tagTextColor,
      defaultBackgroundColor,
      tagBackgroundColor,
      tagGroup,
      entryPath
    } = this.props;
    const { tagMode } = this.props;
    let mode = '';
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
    return (
        data-tid={'tagContainer_' + tag.title.replace(/ /g, '_')}
        key={key || tag.id || uuidv1()}
        onClick={event => { if (this.props.handleTagMenu) { this.props.handleTagMenu(event, tag, entryPath || tagGroup); } }}
        onContextMenu={event => { if (this.props.handleTagMenu) { this.props.handleTagMenu(event, tag, entryPath || tagGroup); } }}
        onDoubleClick={event => { if (this.props.handleTagMenu) { this.props.handleTagMenu(event, tag, entryPath || tagGroup); } }}
        style={{
          backgroundColor: 'transparent',
          marginLeft: 4,
          marginTop: 0,
          marginBottom: 4,
          display: 'inline-block'
        }}
      >
        <Button
          size="small"
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 13,
            textTransform: 'none',
            color: tag.textcolor || defaultTextColor || tagTextColor,
            backgroundColor: tag.color || defaultBackgroundColor || tagBackgroundColor,
            minHeight: 25,
            margin: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 3,
            borderRadius: 5
          }}
        >
          <span>
            {tag.title}
          </span>
          {mode}
        </Button>
      </div>
    );
  }
}
