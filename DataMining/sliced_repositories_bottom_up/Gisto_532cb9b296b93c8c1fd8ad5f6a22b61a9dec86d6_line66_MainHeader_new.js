import styled from 'styled-components';
import Icon from 'components/common/Icon';
import UserArea from 'components/AppArea';
import Loading from 'components/common/Loading';
const HeaderWrapper = styled.div`
const Logo = styled(HeaderSection)`
const MiddleArea = styled(HeaderSection)``;
const LoadingIndicator = styled.span`
export const MainHeader = ({ loading, rateLimit, edit }) => (
  <HeaderWrapper>
    { !edit && (
      <Logo>
        <Link to="/" title={ `API Rate limit: ${get(['rate', 'remaining'], rateLimit)}/${get(['rate', 'limit'], rateLimit)}` }>{ logoText }</Link>
      </Logo>
    ) }
    <MiddleArea>
      <Icon color={ lightText } type="menu"/>
      { loading && (
        <LoadingIndicator>
          <Loading text="Loading..."/>
        </LoadingIndicator>
      ) }
      <div>{ /* placeholder */ }</div>
    </MiddleArea>
    <UserArea/>
  </HeaderWrapper>
);
