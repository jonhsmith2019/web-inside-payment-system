/**
 *
 * SideNavigation
 *
 */

import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import _filter from 'lodash/filter';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { isBrowser } from 'react-device-detect';
import { makeSelectLocation } from 'containers/App/selectors';

import { ICONS } from './const';
import './style.css';
const { SubMenu } = Menu;
const { Sider } = Layout;
export function SideNavigation({ menu, location, theme, collapsedMenu }) {
  const indexCut = location.hash.indexOf('?');
  const pathCurrent = location.hash.slice(
    2,
    indexCut > 0 ? indexCut : location.length,
  );

  const currentSubMenu = _filter(menu, ['menuPath', pathCurrent]);
  const indexParentTab =
    currentSubMenu.length > 0 && currentSubMenu[0].parentId;

  const openKeys = `menu_${indexParentTab}`;

  const [pageCurrent, setPageCurrent] = useState(
    location.hash.slice(2, indexCut > 0 ? indexCut : location.length),
  );

  useEffect(() => {
    const newPageCurrent = location.hash.slice(
      2,
      indexCut > 0 ? indexCut : location.length,
    );
    setPageCurrent(newPageCurrent);
  }, [location.hash]);

  const currentTheme =
    [
      'dark',
      'plum-plate',
      'night-sky',
      'royal',
      'asteroid',
      'sunny-morning',
      'midnight-bloom',
      'blue',
    ].indexOf(theme) >= 0
      ? 'dark'
      : 'light';

  return (
    <Sider
      style={{
        minHeight: '100%',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        color: '#038fdd',
        boxShadow: '7px 0 60px rgba(0,0,0,.05)',
      }}
      width={260}
      theme={currentTheme}
      collapsible
      collapsed={collapsedMenu}
      trigger={null}
    >
      {isBrowser && (
        <div
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link to="/">
            <h1
              style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}
            >
              <span>Payment</span> Inside
            </h1>
          </Link>
        </div>
      )}

      <Menu
        selectedKeys={[pageCurrent]}
        defaultOpenKeys={[openKeys]}
        mode="inline"
        theme={currentTheme}
        style={{ marginTop: '24px' }}
      >
        {menu.map(item => {
          const subMenu = _filter(menu, ['parent.id', item.id]);
          if (!item.parent && item.enabled === 1) {
            console.log(item);
            return (
              <SubMenu
                key={`menu_${item.id}`}
                title={
                  <span>
                    <span>
                      {ICONS[item.menuCmd]}
                      {item.menuName}
                    </span>
                  </span>
                }
                className="sidebar__sub-menu"
              >
                {subMenu.length > 0 &&
                  subMenu.map(subItem => (
                    <Menu.Item key={subItem.menuPath}>
                      <Link to={`/${subItem.menuPath}`}>
                        {subItem.menuName}
                      </Link>
                    </Menu.Item>
                  ))}
              </SubMenu>
            );
          }
          return <span key={item.id} />;
        })}
      </Menu>
    </Sider>
  );
}

SideNavigation.propTypes = {
  location: PropTypes.object,
  menu: PropTypes.array,
  theme: PropTypes.string,
  collapsedMenu: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(SideNavigation);
