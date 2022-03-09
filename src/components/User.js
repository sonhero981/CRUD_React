import 'antd';
import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import moment from 'moment';
import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import { 
  delUserFailed, 
  delUserStart, 
  delUserSuccess, 
  editUserStart, 
  getUserFailed, 
  getUserStart,
  getUserSuccess, 
  addUserFailed, 
  addUserStart,
  addUserSuccess} from '../redux/features/UserSlice';


const config = {
  rules: [
      {
      type: 'object',
      required: true,
      message: 'Please select time!',
      },
  ],
  };

  
  const User = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const listUserData = useSelector((state) => state.users.listUser);
    
    //Get list user
    useEffect(() => {
      dispatch(getUserStart())
      api.get('/')
      .then(response =>  response.data  )
      .then( response => dispatch(getUserSuccess(response)))
      .catch(error => dispatch(getUserFailed(error)))
    },[listUserData])


    // Modal sửa thông tin user
    const [modalEdit, setModalEdit] = useState(false);
    //Edit user
    const [editUser, setEditUser] = useState()

    const [data, setData] = useState()

    const handleEditUser = (id, index) => {
      setModalEdit(true)
      setEditUser(id)
      setData(listUserData[index])
   
    }

    useEffect(() => {
      if(data){
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          phone: data.phone,
        })
      }
    },[data])

    const handleOkEdit = (values) => {
      setModalEdit(false)
      dispatch(editUserStart())
      api.patch(`/${editUser}`, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth
      })
    }
   
      // Modal Delete
      const [isModalDel, setIsModalDel] = useState(false);

      // Delete User 
      const [delUser, setDelUser] = useState('')
      const handleDelUser = (id) => {
        setIsModalDel(true)
        setDelUser(id)
      }

      const handleOkDel = () => {
        setIsModalDel(false)
        dispatch(delUserStart())
        console.log(delUser)
        api.delete(`/${delUser}`)
        .then(response => response.data)
        .then(response => dispatch(delUserSuccess(response)))
        .catch(error => delUserFailed(error))
      };

      const handleCancelDel = () => {
        setIsModalDel(false);
      };

      const [formadd] = Form.useForm()

      // Modal Thêm user
      const [visible, setVisible] = useState(false);
      
      //Add User 
      const onAddUser = (values) => {
        dispatch(addUserStart())
        setVisible(false)
        form.resetFields();
        api.post('/', {
          name: values.name,
          email: values.email,
          phone: values.phone,
          dateOfBirth: values.dateOfBirth
        })
        .then(response => response.data)
        .then(response => dispatch(addUserSuccess(response)))
        .catch(error => addUserFailed(error))
      }

    return (
        <div className="displayUsers">     
        {listUserData.map((user, index) => {
            return(   <div key={index}> 
                <Row style={{marginTop: 10}}>
                <Col span={2}>{index + 1}</Col>
                <Col span={5}>{user.name}</Col>
                <Col span={4}>{user.phone}</Col>
                <Col span={5}>{moment(user.dateOfBirth).format('L')}</Col>
                <Col span={5}>{user.email}</Col>
                <Col span={3}>           
                <Button 
                style={{marginRight:5}} 
                type='primary'
                onClick={() => handleEditUser(user.id, index)}

                >
                Sửa
                </Button>
                <Button 
                type='danger' 
                onClick={() => {handleDelUser(user.id)}}
                >Xóa</Button>
                </Col>
                </Row>
            </div>
               )
            })
        }
        <Modal
        title="Sửa thông tin user"
        centered
        visible={modalEdit}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleOkEdit(values);
              console.log(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
          }}
        onCancel={() => setModalEdit(false)}
        width={700}
        >
        <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        name='form_in_modal'
        >
            <Form.Item name='name' label="Họ và tên" rules={[{ required: true }]}>
                <Input name='name'/>
            </Form.Item>
            <Form.Item name='email' label="Email" rules={[{ type: 'email', required: true }]}>
                <Input name='email'/>
            </Form.Item>
            <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{message: 'Vui lòng nhập số điện thoại của bạn!', required: true }]}
            >
                <Input name='phone' style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Ngày sinh" {...config}>
                <DatePicker name='dateOfBirth'/> 
             </Form.Item>
        </Form>
        </Modal>
        <Modal title="Xóa user" visible={isModalDel} onOk={handleOkDel} onCancel={handleCancelDel}>
          <h3>Bạn có muốn xóa user này không? </h3>
        </Modal>
        <Modal
        title="Thêm user"
        centered
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onAddUser(values);
              setVisible(false)
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={() => setVisible(false)}
        width={700}

        >
          <Form
          form={formadd}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          name='form_in_modal'
          >
            <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{message: 'Vui lòng nhập số điện thoại của bạn!', required: true }]}
            >
                <Input  style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Ngày sinh" {...config}>
                <DatePicker />
             </Form.Item>
         </Form>
          </Modal>
        <Button size='large' type='primary' className = "add-user-btn" onClick={() => setVisible(true)}>Thêm user</Button> 
        </div>

    )
}

export default memo(User)