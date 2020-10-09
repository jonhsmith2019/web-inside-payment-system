import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { PropTypes } from 'prop-types';
import { isMobile } from 'react-device-detect';
import AvatarImg from '../../assets/img/user.png';
const WrapperHeader = styled.header`
  height: 64px;
  color: #fff;
  line-height: 64px;
  width: 100%;
  z-index: 9;
  position: fixed;
  box-shadow: 0 0.46875rem 2.1875rem rgba(8, 10, 37, 0.03),
    0 0.9375rem 1.40625rem rgba(8, 10, 37, 0.03),
    0 0.25rem 0.53125rem rgba(8, 10, 37, 0.05),
    0 0.125rem 0.1875rem rgba(8, 10, 37, 0.03);
`;
const WrapperHeaderContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 64px;
`;

const HeaderRight = styled.div`
  display: flex;
  float: right;
  height: 64px;
  margin-left: auto;
  overflow: hidden;
  padding-right: 24px;
`;

const HeaderTrigger = styled.div`
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s, padding 0s;
`;
function Header(props) {
  const user = localStorage.getItem('user');
  return (
    <WrapperHeader className="header-wrapper">
      <WrapperHeaderContent>
        {isMobile && (
          <>
            <HeaderTrigger
              onClick={() => props.onShowMenu()}
              style={{
                paddingLeft: '24px',
              }}
            >
              <MenuFoldOutlined />
            </HeaderTrigger>
            <div
              style={{
                height: '64px',
                flex: '1 1 0%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  margin: '0',
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: '#fff',
                  }}
                >
                  <span>Payment</span>
                </Link>
              </h1>
            </div>
          </>
        )}
        {!isMobile && (
          <div className="header-brand">
            <h1
              style={{
                fontWeight: '700',
                margin: '0',
              }}
            >
              <Link to="/">
                <span>Payment</span> Inside
              </Link>
            </h1>
          </div>
        )}

        <HeaderRight>
          {!isMobile && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                color: '#faad14',
              }}
            >
              {props.notify}
            </span>
          )}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  icon={<LogoutOutlined />}
                  onClick={() => props.onLogout()}
                >
                  Logout
                </Menu.Item>
              </Menu>
            }
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={AvatarImg} />
              <span style={{ marginLeft: '5px' }}>{user}</span>
            </span>
          </Dropdown>
        </HeaderRight>
      </WrapperHeaderContent>
    </WrapperHeader>
  );
}
Header.propTypes = {
  notify: PropTypes.string,
  onLogout: PropTypes.func,
  onShowMenu: PropTypes.func,
};
export default Header;
