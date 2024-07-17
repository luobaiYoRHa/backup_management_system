import React from "react";
import { Button, Form, Input } from "antd";
import './user.css'

const User = () => {
    //Add
    const handleClick = () => {

    }

    //Submit
    const handleFinish = (e) => {
        console.log(e)
    }

    return (
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>+Add</Button>
                <Form
                    layout="inline"
                    onFinish={handleFinish}
                >
                    <Form.Item name="keyword">
                        <Input placeholder="Please enter username"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Search</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default User