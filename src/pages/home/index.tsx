import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from 'antd';
import './home.css'
import userImg from '../../assets/img/user.png'
import { getData } from "../../api";
import Tab from "../../store/reducers/tab";
import { countData, columns } from "./mock";
import * as Icon from '@ant-design/icons';
import MyEcharts from '../../components/Echarts'

//obtain icon
const iconToElement = (name) => React.createElement(Icon[name])

const Home = () => {

    const[echartData, setEchartData] = useState({});

    useEffect(() => {
        getData().then(({ data }) => {
            //console.log(data.getStatisticalData.data,'res');
            const { tableData, orderData, userData, videoData } = data.getStatisticalData.data;
            setTableData(tableData)
            //for echarts
            const order = orderData;
            const xData = order.date;
            const keyArray = Object.keys(order.data[0])
            const series = []
            keyArray.forEach(key => {
                series.push({
                    name:key,
                    data: order.data.map(item => item[key]),
                    type: 'line'
                })
                setEchartData({
                    order: {
                        xData,
                        series
                    },
                    user: {
                        xData: userData.map(item => item.date),
                        series: [
                            {
                                name: '#New Users',
                                data: userData.map(item => item.new),
                                type: 'bar'
                            },
                            {
                                name: '#Active Users',
                                data: userData.map(item => item.active),
                                type: 'bar'
                            },
                        ]
                    },
                    video: {
                        series: [
                            {
                                data: videoData,
                                type: 'pie'
                            }
                        ]
                    }
                })
            })
        })
    }, [])



    const [tableData, setTableData] = useState([])

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
                    <Card>
                        <Table columns={columns} dataSource={tableData} rowKey={"name"} pagination={false} />
                    </Card>
                </Col>
                <Col span={16}>
                    <div className="num">
                        {
                            countData.map((item, index) => {
                                return (
                                    <Card key={index}>
                                        <div className="icon-box" style={{ background: item.color }}>
                                            {iconToElement(item.icon)}
                                        </div>
                                        <div className="detail">
                                            <p className="num">${item.value}</p>
                                            <p className="text">{item.name}</p>
                                        </div>
                                    </Card>
                                )
                            })
                        }
                    </div>
                    {echartData.order && <MyEcharts charData={echartData.order} style={{height:'280px'}} /> }
                    <div className="graph">
                        { echartData.user && <MyEcharts charData={echartData.user} style={{height:'240px', width:'50%'}} />}
                        { echartData.video && <MyEcharts charData={echartData.video} isAxisChart={false} style={{height:'260px', width:'50%'}} /> }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home