import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader, Drawer, message } from 'antd';
import { WebSocketContext } from 'containers/WebSocket';
import { isMobile } from 'react-device-detect';
import TableData from './components/TableData';
import SkillDetail from './components/SkillDetail';
import { SOCKET_GET_SKILL_LIST, SOCKET_SKILL_UPDATE } from './constants';

const defaultFilter = {
  page: 0,
  size: 20,
};

export function SkillList() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter] = useState(defaultFilter);
  const [currentSkill, setCurrentSkill] = useState();
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  useEffect(() => {
    fetchData(filter);
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    await socket.emit(SOCKET_GET_SKILL_LIST, { data: fiterData });
    await socket.on(SOCKET_GET_SKILL_LIST, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_SKILL_LIST', resParsed.data);
        setData(resParsed.data);
      } else {
        setData([]);
      }
    });
  };

  const updateData = async newData => {
    setLoading(true);
    await socket.emit(SOCKET_SKILL_UPDATE, { data: newData });
    await socket.off(SOCKET_SKILL_UPDATE).on(SOCKET_SKILL_UPDATE, res => {
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

  const handleSkillChange = skill => {
    setVisibleDrawer(!visibleDrawer);
    updateData(skill);
  };

  const handleRowClick = record => {
    setCurrentSkill(record);
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setVisibleDrawer(!visibleDrawer);
  };

  return (
    <div>
      <Helmet>
        <title>Skill List</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Skill List"
        />
      </div>

      <div style={{ margin: '20px auto' }}>
        <TableData loading={loading} data={data} onRowClick={handleRowClick} />
      </div>
      <div>
        {currentSkill && (
          <div>
            <Drawer
              title={currentSkill?.title}
              width={isMobile ? '100%' : '700'}
              onClose={toggleDrawer}
              visible={visibleDrawer}
            >
              <SkillDetail
                skill={currentSkill}
                onSubmitChange={event => handleSkillChange(event)}
              />
            </Drawer>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillList;
