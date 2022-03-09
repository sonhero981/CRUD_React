import { Button, Checkbox, Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth} from '../context/AuthContext'
import '../style/Login.css'


function Login(){
    const {login, currentUser} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(value) {
      try {
      setError('')    
      setLoading(true)
      await login(value.email, value.password)
      navigate('/')
      } catch {
          setError('Tài khoản hoặc mật khẩu không chính xác')
      }
      setLoading(false)
  } 

  useEffect(() => {
    if(currentUser) {
        navigate('/')
    } 
},[currentUser])

  return(
    <div className='login-form'>
      <h1 className='login-header'>Đăng nhập</h1>
      <Form
      onFinish = {handleSubmit}
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
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
        <Input/>
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu của bạn',
          },
        ]}
      >
        <Input.Password/>
      </Form.Item>

       <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Checkbox>Lưu mật khẩu</Checkbox>
      </Form.Item>

      {error && <h4 style={{color: 'red', marginLeft: "80px"}}>{error}</h4> }
      
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" disabled = {loading}>
          Đăng nhập
        </Button>
      </Form.Item>
      <p style={{marginTop: 30}}>Bạn chưa có tài khoản? <Link to='/signup'> Đăng ký</Link></p>
      <Link to='/forgotpassword'>Quên mật khẩu</Link>
    </Form>
  </div>
    )
}
export default Login