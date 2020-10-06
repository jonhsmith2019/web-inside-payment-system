import React from 'react';
import PropTypes from 'prop-types';
import { Statistic } from 'antd';
import { isMobile } from 'react-device-detect';
import './style.css';
export default function TableData(props) {
  return (
    <>
      {isMobile ? (
        <>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Tổng xu nạp vào"
              value={new Intl.NumberFormat().format(props.data?.tongNap)}
              precision={0}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Chuyển tiền vào game cá"
              value={new Intl.NumberFormat().format(props.data?.luotNap)}
              precision={0}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Tổng xu rút ra"
              value={new Intl.NumberFormat().format(props.data?.tongRut)}
              precision={0}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Rút tiền từ game cá"
              value={new Intl.NumberFormat().format(props.data?.luotRut)}
              precision={0}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Tổng xu hoàn giao dịch"
              value={new Intl.NumberFormat().format(props.data?.tongHoan)}
              precision={0}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Trả lại tiền khi cộng tiền thất bại"
              value={new Intl.NumberFormat().format(props.data?.luotHoan)}
              precision={0}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Doanh thu = Tổng xu nạp vào - (Tổng xu rút ra - Tổng xu hoàn
                giao dịch)"
              value={new Intl.NumberFormat().format(props.data?.doanhThu)}
              precision={0}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Tổng xu trong ví"
              value={new Intl.NumberFormat().format(props.data?.tongTon)}
              precision={0}
            />
          </div>
        </>
      ) : (
        <div className="ant-table table-stats">
          <div className="ant-table-container">
            <div className="ant-table-content">
              <table>
                <tbody className="ant-table-tbody">
                  <tr className="ant-table-row row-bold">
                    <td className="ant-table-cell">
                      <span>Tổng xu nạp vào</span>
                    </td>
                    <td className="ant-table-cell" />
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.tongNap)}
                    </td>
                  </tr>
                  <tr className="ant-table-row">
                    <td className="ant-table-cell">
                      <span>Chuyển tiền vào game cá</span>
                    </td>
                    <td className="ant-table-cell">
                      {new Intl.NumberFormat().format(props.data?.luotNap)}
                    </td>
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.tongNap)}
                    </td>
                  </tr>
                  <tr className="ant-table-row row-bold">
                    <td className="ant-table-cell">
                      <span>Tổng xu rút ra</span>
                    </td>
                    <td className="ant-table-cell" />
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.tongRut)}
                    </td>
                  </tr>
                  <tr className="ant-table-row">
                    <td className="ant-table-cell">
                      <span>Rút tiền từ game cá</span>
                    </td>
                    <td className="ant-table-cell">
                      {new Intl.NumberFormat().format(props.data?.luotRut)}
                    </td>
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.tongRut)}
                    </td>
                  </tr>
                  <tr className="ant-table-row row-bold">
                    <td className="ant-table-cell">
                      <span>Tổng xu hoàn giao dịch</span>
                    </td>
                    <td className="ant-table-cell" />
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.tongHoan)}
                    </td>
                  </tr>
                  <tr className="ant-table-row ">
                    <td className="ant-table-cell">
                      <span>Trả lại tiền khi cộng tiền thất bại</span>
                    </td>
                    <td className="ant-table-cell">
                      {new Intl.NumberFormat().format(props.data?.luotHoan)}
                    </td>
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.tongHoan)}
                    </td>
                  </tr>
                  <tr className="ant-table-row row-bold">
                    <td className="ant-table-cell">
                      <span>
                        Doanh thu = Tổng xu nạp vào - (Tổng xu rút ra - Tổng xu
                        hoàn giao dịch)
                      </span>
                    </td>
                    <td className="ant-table-cell" />
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.doanhThu)}
                    </td>
                  </tr>
                  <tr
                    className="ant-table-row row-bold"
                    style={{ color: '#f00' }}
                  >
                    <td className="ant-table-cell">
                      <span>Tổng xu trong ví</span>
                    </td>
                    <td className="ant-table-cell" />
                    <td className="ant-table-cell text-right">
                      {new Intl.NumberFormat().format(props.data?.tongTon)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

TableData.propTypes = {
  data: PropTypes.object,
};
