import React from 'react';
import { render } from 'react-testing-library';

import NotFound from '../index';

describe('<NotFound />', () => {
  it('should render header', () => {
    const { queryByText } = render(<NotFound />);
    expect(queryByText('Trang không tồn tại')).not.toBeNull();
  });
});
