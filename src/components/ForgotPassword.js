import { Form, Input, Button } from 'antd';
import '../style/ForgotPassword.css'
import {ArrowLeftOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import React, { useState } from 'react';

function ForgotPassword() {

    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (value) => {
        console.log(value.email)
        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(value.email)
            setMessage('Vui lòng check Email của bạn!')
     
        } catch {
            setError('Không thể lấy lại mật khẩu')
        }
        setLoading(false)
    }
    return (
        <div className="forgot-form">
            <Link to = '/login'><ArrowLeftOutlined /> Quay lại</Link>
            <h1 className='forgot-header'>Lấy lại mật khẩu</h1>
            <Form
                onFinish={handleSubmit}
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
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
                        message: 'Vui lòng nhập địa chỉ email!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                wrapperCol={{
                offset: 6,
                span: 16,
                }}
                >
                {error && <h4 style={{color: 'red'}}>{error}</h4> }
                {message && <h4 style={{color: 'green'}}>{message}</h4> }
                <Button type="primary" htmlType="submit" disabled = {loading}>
                Lấy lại mật khẩu
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPassword