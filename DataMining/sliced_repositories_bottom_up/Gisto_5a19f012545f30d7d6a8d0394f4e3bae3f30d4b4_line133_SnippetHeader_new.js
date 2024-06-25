import React from 'react';
import PropTypes from 'prop-types';
import * as snippetActions from 'actions/snippets';
import Input from 'components/common/Input';
export class SnippetHeader extends React.Component {
  renderSnippetDescription = () => {
    const {
      edit, tempSnippet, snippets, match, updateTempSnippet
    } = this.props;
    const snippet = get(match.params.id, snippets);
    return (
      <Input value={ `${get('description', tempSnippet)} ${get('tags', snippet)}` }
    );
  };
}
