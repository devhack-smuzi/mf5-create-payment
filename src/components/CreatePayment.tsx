import React, { useState } from 'react';
import { Table } from 'antd';
import { Button, Radio } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const CreatePayment = () => {
  const [level, setLevelt] = useState(0);

  const setLevel = (value: number) => {
    window.postMessage({ type: 'SET_LEVEL', payload: value }, window.origin);
    setLevelt(value);
  };

  const handleNextLeve = () => {
    if (level === 3) return setLevel(0);
    setLevel(level + 1);
  };

  return (
    <div>
      <br />
      <br />
      <Button
        type="primary"
        shape="round"
        icon={<DoubleRightOutlined />}
        onClick={handleNextLeve}>
        Дальше
      </Button>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default CreatePayment;
