import { Button, Col, Layout, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Dashboard.css';
import User from './User';

const { Header, Content } = Layout
  
function Dashboard (){
  
    // Modal Logout
    const {logout} = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [isModalLogout, setIsModalLogout] = useState(false);

    //Log out
    const handleLogOut = () => {
      setIsModalLogout(true)
    }
  
    const handleLogOutOk = async () => {
      setIsModalLogout(false);
      setError('')
      try {
        await logout()
        navigate('./login')
      } catch {
        setError('Không thể đăng xuất')
        console.log(error)
      }
    };

    const handleCancelLogOut = () => {
      setIsModalLogout(false)
    }

    return(
    <Layout>
        <Header className="header-dashboard">
          <div>
            <h3 style = {{color: "#ffff"}}>DASHBOARD</h3>
          </div>
          <div className='logout'>
            <Button type='danger' onClick={handleLogOut}>Đăng xuất</Button>
          </div>
        </Header>
        <Content>
            <Row gutter={[10, 40]} style={{minHeight:"100vh"}}>
                <Col span={20} offset={2}>
                    <h1 style={{fontSize: 30, padding:30}}>Danh sách User</h1>
                    <Row>
                        <Col span={2}><h3>Stt</h3></Col>
                        <Col span={5}><h3>Họ và tên</h3></Col>
                        <Col span={4}><h3>Số điện thoại</h3></Col>
                        <Col span={5}><h3>Ngày tháng năm sinh</h3></Col>
                        <Col span={5}><h3>Email</h3></Col>
                        <Col span={3}><h3>Tùy chọn</h3></Col>
                    </Row>
                    <User/>
                </Col>
            </Row>
        </Content>
          <Modal title="Đăng xuất" visible={isModalLogout} onOk={handleLogOutOk} onCancel={handleCancelLogOut}>
          <h3>Bạn có chắc chắn đăng xuất? </h3>
        </Modal>
    </Layout>
    )
}

export default Dashboard