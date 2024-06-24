import React from 'react';
import PropTypes from 'prop-types';
import * as snippetActions from 'actions/snippets';
export class SnippetHeader extends React.Component {
  renderTitle = () => {
    const {
      snippets, match, searchByLanguages, searchByTags, edit
    } = this.props;
    const snippet = get(match.params.id, snippets);
    return (
        { !edit && map((tag) => (
            { tag }
        ), get('tags', snippet)) }
    );
  };
}
