import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as snippetActions from 'actions/snippets';
const Tag = styled.span`
  border: 1px solid ${baseAppColor};
export const Sidebar = ({
  snippets, filterText, filterTags, filterLanguage, clearFilters, removeTag, filterStatus
}) => {
  const searchType = () => {
    if (!isEmpty(filterTags)) {
      return (
          { 'tags ' } { map((tag) => (
            <Tag key={ tag }>
          ), filterTags) }
      );
    }
  };
};
