/* eslint-disable react/prop-types */
/**
 *
 * FormWrapper
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Spin } from 'antd';

const Wrapper = styled.div`
  position: relative;
`;

const SpinWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 4;
  background: rgba(255, 255, 255, 0.8);
`;

const SpinIcon = styled.span`
  top: 50%;
  position: relative;
`;

function FormWrapper(props) {
  return (
    <>
      <Wrapper>
        {props.loading && (
          <SpinWrapper>
            <SpinIcon>
              <Spin />
            </SpinIcon>
          </SpinWrapper>
        )}

        <div>{props.children}</div>
      </Wrapper>
    </>
  );
}

FormWrapper.propTypes = {};

export default memo(FormWrapper);
