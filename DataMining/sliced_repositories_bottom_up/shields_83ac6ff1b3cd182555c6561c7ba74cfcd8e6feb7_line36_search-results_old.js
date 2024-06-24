import React from 'react'
export default class SearchResults extends React.Component {
  renderCategoryHeadings() {
    return this.preparedExamples.map((category, i) => (
      <Link to={'/examples/' + category.category.id} key={category.category.id}>
    ))
  }
}
