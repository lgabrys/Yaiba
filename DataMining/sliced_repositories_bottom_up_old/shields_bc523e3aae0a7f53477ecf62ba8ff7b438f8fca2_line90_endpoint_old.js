import PropTypes from 'prop-types'
import styled from 'styled-components'
const JsonExampleBlock = styled.code`
const JsonExample = ({ data }) => (
  <JsonExampleBlock>{JSON.stringify(data, undefined, 2)}</JsonExampleBlock>
)
JsonExample.propTypes = {
  data: PropTypes.object.isRequired,
}

const Schema = styled.dl`
  display: inline-block;
const EndpointPage = () => (
    <H3 id="static-badge">Endpoint (Beta)</H3>
)
