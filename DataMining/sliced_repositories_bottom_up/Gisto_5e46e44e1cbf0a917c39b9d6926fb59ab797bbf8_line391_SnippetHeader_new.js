import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as snippetActions from 'actions/snippets';
import UtilityIcon from 'components/common/UtilityIcon';
import Input from 'components/common/controls/Input';
import Anchor from 'components/common/Anchor';
import ExternalLink from 'components/common/ExternalLink';
const SnippetHeaderWrapper = styled.div`
  display: flex;
const History = styled.span`
  div {
    color: ${baseAppColor};
  }
const Additions = styled.span`
  background: ${colorSuccess};
const Deletions = styled.span`
  background: ${colorDanger};
const Title = styled.div`
    flex: 1;
const Description = styled.span`
  color: ${textColor};
const Languages = styled.span`
  color: ${baseAppColor};
const StyledInput = styled(Input)`
  width: 100%;
const mapStateToProps = (state, { match }) => ({
  snippets: get(['snippets', 'snippets'], state),
  comments: get(['snippets', 'comments', match.params.id], state),
  edit: get(['ui', 'snippets', 'edit'], state),
  tempSnippet: get(['snippets', 'edit'], state)
});
SnippetHeader.propTypes = {
  snippets: PropTypes.object,
  match: PropTypes.object,
  searchByLanguages: PropTypes.func,
  searchByTags: PropTypes.func,
  setStar: PropTypes.func,
  unsetStar: PropTypes.func,
  deleteSnippet: PropTypes.func,
  editSnippet: PropTypes.func,
  cancelEditSnippet: PropTypes.func,
  updateTempSnippet: PropTypes.func,
  updateSnippet: PropTypes.func,
  addTempFile: PropTypes.func,
  toggleSnippetComments: PropTypes.func,
  edit: PropTypes.bool,
  tempSnippet: PropTypes.object,
  comments: PropTypes.array
};
