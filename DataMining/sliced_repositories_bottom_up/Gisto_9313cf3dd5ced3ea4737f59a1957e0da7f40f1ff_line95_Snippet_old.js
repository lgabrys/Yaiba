import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as snippetActions from 'actions/snippets';
import Editor from 'components/common/controls/Editor';
import SnippetHeader from 'components/layout/content/snippet/snippetHeader';
import Comments from 'components/layout/content/snippet/Comments';
const SnippetWrapper = styled.div`
  background: #fff;
const mapStateToProps = (state, ownProps) => {
  const snippetId = ownProps.match.params.id;
};
Snippet.propTypes = {
  match: PropTypes.object,
  snippet: PropTypes.object,
  getSnippet: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  tempSnippet: PropTypes.object,
  updateTempSnippet: PropTypes.func,
  showComments: PropTypes.func
};
