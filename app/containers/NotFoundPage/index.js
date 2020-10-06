/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Result, Button } from 'antd';
import { Helmet } from 'react-helmet';
import routes from 'config/routes';

export default function NotFound(props) {
  const redirectHome = () => {
    props.history.push(routes.index);
  };

  return (
    <>
      <Helmet>
        <title>NotFound Page</title>
        <meta name="description" content="NotFound Page" />
      </Helmet>
      <Result
        status="404"
        subTitle="Trang này không tồn tại!"
        extra={
          <Button type="primary" onClick={redirectHome}>
            Trở lại trang chủ
          </Button>
        }
      />
    </>
  );
}

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
