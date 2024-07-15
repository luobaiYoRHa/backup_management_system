import React from "react";
import { MenuFoldOutlined } from '@ant-design/icons';
import { Button, Layout, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import userImg from '../../assets/img/user.png'
import './index.css'
import { useDispatch, UseDispatch } from "react-redux";
import { collaspseMenu } from "../../store/reducers/tab";

const { Header, Sider, Content } = Layout;

const CommonHeader = ({ collapsed }) => {
    const logout = () => {

    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" >
                    User Center
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => logout} target="_blank" rel="noopener noreferrer" >
                    Log Out
                </a>
            ),
        },
    ];

    //Create dispatch
    const dispatch = useDispatch()

    //Fold and unfold menu
    const setCollapsed = () => {
        //console.log(collapsed)
        dispatch(collaspseMenu())
    }

    return (
        <Header className="header-container">
            <Button
                type="text"
                icon={<MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: '#fff'
                }}
                onClick={() => setCollapsed()}
            />
            <Dropdown
                menu={{ items }}
            >
                <Avatar size={36} src={userImg} />
            </Dropdown>

        </Header>
    )
}

export default CommonHeader