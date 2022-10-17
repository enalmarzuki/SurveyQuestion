import React from 'react';
import { Row, Col, Typography } from 'antd';
import Styles from '../../Home.module.scss';

interface IHeaderProps {
  title: string;
}

const { Title } = Typography;

export const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <Row justify="center">
      <Col>
        <Title className={Styles['left-content-title']}>{title}</Title>
      </Col>
    </Row>
  );
};
