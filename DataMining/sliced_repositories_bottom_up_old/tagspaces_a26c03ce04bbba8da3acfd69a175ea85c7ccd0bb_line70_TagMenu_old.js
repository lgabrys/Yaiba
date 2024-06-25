import React from 'react';
class TagLibraryMenu extends React.Component<Props, State> {
  showFilesWithThisTag = () => {
    if (this.props.selectedTag) {
      this.props.searchLocationIndex({
        tags: [this.props.selectedTag.title],
      });
    }
  };
}
