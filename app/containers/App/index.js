/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useContext, memo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { Layout, Drawer, Alert } from 'antd';
import { BrowserView, MobileView, isBrowser } from 'react-device-detect';
import { WebSocketContext } from 'containers/WebSocket';
import SideNavigation from 'components/SideNavigation';
import routes from 'config/routes';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RequiredAuthentication from 'utils/auth/RequireAuthentication';
import Login from 'containers/LoginPage/Loadable';
import Dashboard from 'containers/Dashboard';

import AccountList from 'containers/AccountPage/Loadable';
import AddAccount from 'containers/AccountPage/AddAccount/Loadable';
import EditAccount from 'containers/AccountPage/EditAccount/Loadable';
import AccountServiceList from 'containers/AccountService/Loadable';
import EditAccountService from 'containers/AccountService/EditAccountService/Loadable';
import AddAccountService from 'containers/AccountService/AddAccountService/Loadable';
import AccountServiceInfo from 'containers/AccountService/AccountServiceInfo/Loadable';
import CardTransactionSession from 'containers/Card/CardTransactionSession/Loadable';

import ThemeConfig from 'components/ThemeConfig';
import Header from 'components/Header';
import ErrorBoundary from './ErrorBoundaries';
import saga from './saga';
import { makeSelectMenu, makeSelectLocation } from './selectors';
import { getMenu } from './actions';
import './style.css';

export const WrapperLoading = styled.div`
  text-align: center;
`;

const { Content } = Layout;

export function App(props) {
  useInjectSaga({ key: 'app', saga });
  const theme = localStorage.getItem('theme');
  const ws = useContext(WebSocketContext);
  const [visible, setVisible] = useState(false);
  const [notify, setDataNotify] = useState('');
  const [collapsedMenu] = useState(false);
  // const [menu, setMenu] = useState();

  const showDrawerMenu = () => {
    setVisible(true);
  };

  const onCloseDrawerMenu = () => {
    setVisible(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      props.getMenu(ws);
      ws.on('NOTIFICATION', res => {
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          setDataNotify(resParsed.data?.message || '');
        }
      });

      ws.on('LOGOUT', res => {
        const resParsed = JSON.parse(res);
        if (!resParsed.result) {
          logout();
        }
      });
    }
  }, []);

  useEffect(() => {
    setVisible(false);
    // eslint-disable-next-line no-restricted-globals
  }, [location.hash]);

  const logout = () => {
    ws.emit('LOGOUT');
    localStorage.removeItem('token');
    window.location = '#/login';
  };

  return (
    <HashRouter>
      <Route exact path={routes.login} component={Login} />

      <RequiredAuthentication onLogout={logout}>
        <Layout style={{ minHeight: '100vh' }} className={theme}>
          <Header
            className="header"
            theme={theme}
            notify={notify}
            onLogout={() => logout()}
            onShowMenu={showDrawerMenu}
          />
          <MobileView>
            <Drawer
              placement="left"
              closable={false}
              onClose={onCloseDrawerMenu}
              visible={visible}
              width="260"
              bodyStyle={{ padding: '0' }}
            >
              <SideNavigation menu={props.menu || []} />
            </Drawer>
          </MobileView>

          <Layout
            className="site-layout"
            style={{ marginLeft: isBrowser ? 260 : 0 }}
          >
            <BrowserView>
              <SideNavigation
                menu={props.menu || []}
                theme={theme}
                collapsedMenu={collapsedMenu}
              />
            </BrowserView>
            {/* <Header
              notify={notify}
              onLogout={logout}
              onShowMenu={showDrawerMenu}
            /> */}

            <Content
              className="site-layout-background"
              style={{
                padding: '84px 24px 24px 24px',
              }}
            >
              <MobileView>
                {notify && (
                  <Alert
                    message={notify}
                    type="warning"
                    banner
                    showIcon={false}
                    closable
                  />
                )}
              </MobileView>

              <ErrorBoundary>
                <Switch>
                  <Route
                    exact
                    path={routes.account.list}
                    component={AccountList}
                  />
                  <Route
                    exact
                    path={routes.account.add}
                    component={AddAccount}
                  />
                  <Route
                    exact
                    path={routes.account.edit}
                    component={EditAccount}
                  />
                  <Route
                    exact
                    path={routes.accountService.list}
                    component={AccountServiceList}
                  />
                  <Route
                    exact
                    path={routes.accountService.add}
                    component={AddAccountService}
                  />
                  <Route
                    exact
                    path={routes.accountService.edit}
                    component={EditAccountService}
                  />
                  <Route
                    exact
                    path={routes.accountService.info}
                    component={AccountServiceInfo}
                  />
                  <Route
                    exact
                    path={routes.card.transactionSession}
                    component={CardTransactionSession}
                  />

                  <Route exact path="/" component={Dashboard} />
                  <Route component={NotFoundPage} />
                </Switch>
              </ErrorBoundary>
            </Content>
          </Layout>
          <BrowserView>
            <ThemeConfig />
          </BrowserView>
        </Layout>
      </RequiredAuthentication>
    </HashRouter>
  );
}

App.propTypes = {
  getMenu: PropTypes.func,
  menu: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  menu: makeSelectMenu(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMenu,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
