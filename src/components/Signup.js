
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Signup.css';

function Signup () {
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

   async function handleSubmit(value) {
        if(value.password !== value.passwordConfirm){
            return setError('Mật khẩu xác minh không trùng khớp!')
        } 
        try {
        setMessage('')
        setError('')    
        setLoading(true)
        await  signup(value.email, value.password)
        setMessage('Đăng kí thành công vui lòng đăng nhập!')
            
        } catch {
            setError('Đăng kí thất bại')
        }

        setLoading(false)
    }

    return (
        <div className="signup-form">
            <h2 className="signup-header"> Đăng ký</h2>
            {error && <h4 style={{color: 'red', marginLeft: "80px"}}>{error}</h4> }
            <Form
            onFinish = {handleSubmit}
            name="basic"
            labelCol={{
                span: 7,
            }}
            wrapperCol={{
                span: 15,
            }}
            initialValues={{
                remember: true,
            }}
            >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ Email!',
                },
                ]}
            >
                <Input  type="mail"/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="Password confirm"
                name="passwordConfirm"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu!',
                },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 6,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" disabled= {loading}>
                Đăng ký
                </Button>
                {message && <h4 style={{color: 'green'}}>{message}</h4> }
                <p style={{marginTop: 30}}>Bạn đã có tài khoản vui lòng: <Link to='/login'>Đăng nhập</Link></p>
            </Form.Item>
            </Form>

        </div>
    )
}

export default Signup