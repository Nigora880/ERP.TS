import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { API } from '../hooks';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { Logo } from '../assets/img';

const App: React.FC = () => { 
  const [, setCookies] = useCookies(["accessToken"])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onFinish = (values: any) => {
    setIsLoading(true)
    axios.post(`${API}/user/login`, values).then(res => {
     toast.success("Muvaffaqiyat kirdinggiz" , {
      onClose: () => {
         setIsLoading(false);
         setCookies("accessToken", res.data.accessToken)
         location.pathname = "/"
      },
      autoClose: 2000,
     })
    })
  };

  return (
    <div className='w-full'>
      <div className='flex items-center mb-[20px] text-[#bc8e5b] gap-[10px] justify-center'>
        <img src={Logo} alt="" width={50} height={60}/>
        <span className='font-normal text-black text-[20px]'>Admin paneli</span>
      </div>
    <Form autoComplete='off' className='!w-full' name="login" style={{ maxWidth: "100%" }} onFinish={onFinish}>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Iltimos, username kiriting' }]}
      > 
        <Input size='large' allowClear prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Iltimos, parol kiriting' }]}
      >
        <Input.Password size='large' allowClear prefix={<LockOutlined />} type="password" placeholder="Maxfiy so'z" />
      </Form.Item>

        <Button loading={isLoading} className='!bg-[#bc8e5b]' size='middle' block type="primary" htmlType="submit">
         Kirish
        </Button>
    </Form>
    </div>
  );
};

export default App;
