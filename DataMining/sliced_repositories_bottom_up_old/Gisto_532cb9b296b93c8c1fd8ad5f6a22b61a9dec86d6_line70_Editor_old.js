import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/common/Loading';
export class Editor extends React.Component {
  renderEditor = () => {
    const {
      edit, onChange, file, className, id, language, filesCount
    } = this.props;
    if (!file.content) {
      return (
          <Loading color={ baseAppColor }/>
      );
    }
  };
}
