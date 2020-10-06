/**
 *
 * Event Promotion
 *
 */

import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import _get from 'lodash/get';
import { isMobile } from 'react-device-detect';
import { PageHeader, Drawer, message } from 'antd';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
// import FilterData from './components/FilterData';
import { EventBossTheGioi, EventJackPot } from './components/EditData';
import {
  SOCKET_GET_EVENT_PROMOTION_LIST,
  SOCKET_UPDATE_EVENT_PROMOTION,
} from './constants';

const defaultFilter = {
  page: 0,
  size: 20,
};

export function EventPromotionList() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [currentEvent, setCurrentEvent] = useState();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [filter, setFilterData] = useState(defaultFilter);

  useEffect(() => {
    fetchData(filter);
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    await socket.emit(SOCKET_GET_EVENT_PROMOTION_LIST, { data: fiterData });
    await socket
      .off(SOCKET_GET_EVENT_PROMOTION_LIST)
      .on(SOCKET_GET_EVENT_PROMOTION_LIST, res => {
        setLoading(false);
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          console.log('SOCKET_GET_EVENT_PROMOTION_LIST', resParsed.data);
          setData(resParsed.data);
        } else {
          setData([]);
        }
      });
  };

  const updateData = async newData => {
    setLoading(true);
    await socket.emit(SOCKET_UPDATE_EVENT_PROMOTION, { data: newData });
    await socket
      .off(SOCKET_UPDATE_EVENT_PROMOTION)
      .on(SOCKET_UPDATE_EVENT_PROMOTION, res => {
        setLoading(false);
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          message.success('Cập nhật thành công');
          fetchData(filter);
        } else {
          message.error('Có lỗi xảy ra, xin vui lòng thử lại');
        }
      });
  };

  // const onSubmitFilter = values => {
  //   setLoading(true);
  //   const newFilter = {
  //     event: values?.roomKind,
  //     page: 0,
  //     size: 20,
  //   };
  //   setFilterData(newFilter);
  //   fetchData(newFilter);
  // };

  const handleTableChange = pagination => {
    setLoading(true);
    const newFilter = filter;
    newFilter.page = pagination.current - 1;
    newFilter.size = pagination.pageSize;
    setFilterData(newFilter);
    fetchData(newFilter);
  };

  const handleRowClick = record => {
    setCurrentEvent(record);
    toggleDrawer();
  };

  const handleEventChange = event => {
    setVisibleDrawer(!visibleDrawer);
    updateData(event);
  };

  const toggleDrawer = () => {
    setVisibleDrawer(!visibleDrawer);
  };

  return (
    <div>
      <Helmet>
        <title>Event Promotion List</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Event Promotion List"
        />
      </div>

      {/* <div style={{ marginTop: '20px' }}>
        <FilterData
          events={data.content || []}
          onSubmitFilter={onSubmitFilter}
        />
      </div> */}

      <div style={{ margin: '20px auto' }}>
        <TableData
          loading={loading}
          data={data.content}
          pagination={{
            current: _get(filter, 'page', 1) + 1,
            pageSize: _get(filter, 'size', 20),
            total: data.totalPages,
          }}
          onTableChange={handleTableChange}
          onRowClick={handleRowClick}
        />
      </div>
      {currentEvent && (
        <div>
          <Drawer
            title={currentEvent?.title}
            width={isMobile ? '100%' : '700'}
            onClose={toggleDrawer}
            visible={visibleDrawer}
          >
            {currentEvent.code === 'EventJackPot' && (
              <EventJackPot
                event={currentEvent}
                onSubmitEventChange={handleEventChange}
              />
            )}
            {currentEvent.code === 'EventBossTheGioi' && (
              <EventBossTheGioi
                event={currentEvent}
                onSubmitEventChange={event => handleEventChange(event)}
              />
            )}
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default EventPromotionList;
