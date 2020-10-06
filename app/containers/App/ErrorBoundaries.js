import React from 'react';
import { Alert, PageHeader, Empty } from 'antd';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <PageHeader
            className="site-page-header"
            onBack={() => {
              window.location.reload();
            }}
            title="Go back"
            subTitle=""
          />

          <Alert
            message="Lỗi sai dữ liệu trả về"
            style={{ height: 200 }}
            description={
              <Empty description="Dữ liệu trả về sai, vui lòng kiểm tra lại" />
            }
            type="error"
            showIcon
          />
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
