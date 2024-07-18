import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from "antd";
import './user.css'
import { getUser, addUser, editUser , deleteUser} from "../../api";
import dayjs from "dayjs";

const User = () => {
    const [listData, setListData] = useState({
        name: ''
    })
    const [tableData, setTableData] = useState([])
    //0->Add 1->Edit
    const [modalType, setModalType] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    //create form
    const [form] = Form.useForm();

    //Add and edit
    const handleClick = (type, rowData) => {
        setIsModalOpen(!modalType)
        if (type == 'add') {
            setModalType(0)
        } else {
            setModalType(1)
            const cloneData = JSON.parse(JSON.stringify(rowData))
            cloneData.birth = dayjs(cloneData.birth)
            console.log(cloneData)
            form.setFieldValue('addr', cloneData.addr)
            form.setFieldValue('age', cloneData.age)
            form.setFieldValue('birth', cloneData.birth)
            form.setFieldValue('name', cloneData.name)
            form.setFieldValue('sex', cloneData.sex)
            form.setFieldValue('id',cloneData.id)
        }
    }

    const handleDelete = ({id}) => {
        deleteUser({id}).then(() => {
            getTableData();
        })
    }

    //Submit
    const handleFinish = (e) => {
        setListData({
            name: e.keyword
        })
    }

    useEffect(() => {
        getTableData()
    },[listData])

    const getTableData = () => {
        getUser(listData).then(({ data }) => {
            setTableData(data.list)
        })
    }

    //popscreen confirm and cancel
    const handleOk = () => {
        //form check
        form.validateFields().then((val) => {
            //date parameter
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')

            if (modalType) {
                editUser(val).then(() => {
                    console.log(val)
                    handleCancel();
                    getTableData();
                })
            } else {
                addUser(val).then(() => {
                    handleCancel();
                    getTableData();
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'sex',
            dataIndex: 'sex',
            render: (val) => {
                return val ? 'F' : 'M'
            }
        },
        {
            title: 'Birth',
            dataIndex: 'birth'
        },
        {
            title: 'Address',
            dataIndex: 'addr'
        },
        {
            title: 'Action',
            render: (rowData) => {
                return (
                    <div className="flex-box">
                        <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>Edit</Button>
                        <Popconfirm
                            title='Alarm'
                            description='This action will delete the user, continue?'
                            okText='Confirm'
                            cancelText='Cancel'
                            onConfirm={() => handleDelete(rowData)}
                        >
                            <Button type="primary" danger>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        //get user list from mocked backend
        getTableData()
    }, [])

    return (
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>+Add</Button>
                <Form
                    layout="inline"
                    onFinish={handleFinish}
                >
                    <Form.Item name="keyword">
                        <Input placeholder="Please enter username" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Search</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table style={{marginTop:'10px'}} columns={columns} dataSource={tableData} rowKey={'id'} />
            <Modal
                open={isModalOpen}
                title={modalType ? 'Edit user' : 'Add user'}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 18
                    }}
                    labelAlign="left"
                >{
                        modalType == 1 && <Form.Item
                            name="id"
                            hidden><Input />
                        </Form.Item>
                    }

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name'
                            }
                        ]}
                    ><Input placeholder="Please enter your name" />
                    </Form.Item>
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your age'
                            },
                            {
                                type: 'number',
                                message: 'Age must be an integer'
                            }
                        ]}
                    ><InputNumber placeholder="Age" />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender'
                            }
                        ]}
                    ><Select
                            options={[
                                { value: 0, label: 'Male' },
                                { value: 1, label: 'Female' },
                            ]}
                            placeholder="Gender" />
                    </Form.Item>
                    <Form.Item
                        label="Date of Birth"
                        name="birth"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your date of birth'
                            }
                        ]}
                    ><DatePicker placeholder="Date of Birth" format="YYYY/MM/DD" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="addr"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your address'
                            }
                        ]}
                    ><Input placeholder="Please enter your address" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User