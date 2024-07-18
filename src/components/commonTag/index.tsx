import React from "react";
import { Tag, Space } from "antd";
import './index.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeTab, setCurrentMenu } from "../../store/reducers/tab";

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    //console.log(tabList)

    const handleClose = (tag, index) => {
        let length = tabList.length - 1
        dispatch(closeTab(tag))
        //closed tag is not current tag
        if(tag.path !== action.pathname) {
            return
        }
        //closed tag is current tag
        if(index === length) {
            const curData = tabList[index - 1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        } else{
            //if at least one tag, choose later tag
            if(tabList.length > 1) {
                const nextData = tabList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }

    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }

    const setTag = (flag, item, index) => {
        return (
            flag ?
            <Tag color='#55acee' closeIcon onClose = {() => handleClose(item, index)} key={item.name}>{item.label}</Tag>
            :
            <Tag onClick={() => handleChange(item)} key={item.name} > {item.label} </Tag>
        )
    }

    return (
        <Space className="common-tag" size={[0,8]} wrap>
            {
                currentMenu.name && tabList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
            }
        </Space>
    )
}

export default CommonTag;