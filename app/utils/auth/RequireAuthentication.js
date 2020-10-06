import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';

export function checkLoggedIn(token) {
  if (typeof token === 'string' && token.length > 0) {
    return true;
  }
  return false;
}

const RequiredAuthentication = ({ children, location, checkLogout }) => {
  const isLogin = checkLoggedIn(localStorage.getItem('token'));

  if (!isLogin && location.hash !== '#/login') {
    window.location = '#/login';
  }

  if (!isLogin && checkLogout) {
    return null;
  }

  if (!isLogin) {
    return null;
  }

  return children;
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(RequiredAuthentication);
