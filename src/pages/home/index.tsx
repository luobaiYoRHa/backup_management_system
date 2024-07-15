import React, {useEffect} from "react";
import { Col, Row, Card } from 'antd';
import './home.css'
import userImg from '../../assets/img/user.png'
import { getData } from "../../api";


const Home = () => {
    useEffect(() => {
        getData().then((res) => {
            console.log(res,'res')
        })
    }, [])
    return (
        <div>
            <Row className="home">
                <Col span={8}>
                    <Card hoverable>
                        <div className="user">
                            <img src={userImg} />
                            <div className="userinfo">
                                <p className="name">luobaiYoRHa</p>
                                <p className="access">Admin</p>
                            </div>
                        </div>
                        <div className="login-info">
                            <p>Last login time:<span>2024-07-19</span></p>
                            <p>Last login location:<span>Vancouver</span></p>
                        </div>
                    </Card>
                </Col>
                <Col span={16}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
            </Row>
        </div>
    )
}

export default Home