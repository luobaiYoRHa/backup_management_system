import React, { useState } from 'react';
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

//obtain icon
const iconToElement = (name) => React.createElement(Icon[name])

//menu data
const items = MenuConfig.map((icon) => {
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label
    }
    if(icon.children) {
        child.children = icon.children.map(item => {
            return {
                key: item.path,
                label: item.label
            }
        })
    }
    return child;
})

const CommonAside = ({ collapsed }) => {
    const navigate = useNavigate();
    
    const selectMenu = (e) => {
        navigate(e.key)
    }

    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className='app-name'>{collapsed?'Backstage':'Management System'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                style={{
                    height: '100%'
                }}
                onClick={selectMenu}
            />
        </Sider>
    )
}

export default CommonAside;
