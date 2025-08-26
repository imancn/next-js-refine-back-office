'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Select,
  Table,
  Form,
  Modal,
  message,
  Space,
  Divider,
  Tag,
  Progress,
  Statistic,
  Row,
  Col,
  Typography,
  Alert,
  Badge,
  Avatar,
  List,
  Tabs,
  Steps,
  Timeline,
  Calendar,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
  Checkbox,
  Slider,
  Rate,
  Upload,
  Tooltip,
  Popconfirm,
  Dropdown,
  Menu,
  Breadcrumb,
  Pagination,
  Result,
  Empty,
  Skeleton,
  Spin,
  Drawer,
  Collapse,
  Descriptions,
  Tree,
  Transfer,
  Cascader,
  Mentions,
  AutoComplete,
  InputNumber,
  ColorPicker,
  Segmented,
  QRCode,
  Tour,
  FloatButton,
  Affix,
  Anchor,
  BackTop,
  ConfigProvider,
} from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
  HeartOutlined,
  StarOutlined,
  LikeOutlined,
  DislikeOutlined,
  ShareAltOutlined,
  MoreOutlined,
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useTheme } from '@/contexts/ThemeContext';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Item } = List;
const { Panel } = Collapse;

export const AntdShowcase: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Sample data for table
  const tableData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['manager'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
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
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} size="small">
            Edit
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      message.success('Form submitted successfully!');
      console.log('Form values:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <Title level={1} className="!text-4xl !font-bold">
          Ant Design + Tailwind CSS Showcase
        </Title>
        <Paragraph className="text-lg text-muted-foreground">
          Demonstrating seamless integration of Ant Design components with Tailwind CSS utilities
        </Paragraph>
        <Alert
          message="Theme Integration"
          description={`Currently using ${isDarkMode ? 'dark' : 'light'} theme with custom design tokens`}
          type="info"
          showIcon
          className="max-w-2xl mx-auto"
        />
      </div>

      {/* Basic Components Grid */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={8}>
          <Card title="Form Controls" className="h-full">
            <Space direction="vertical" className="w-full" size="middle">
              <Input placeholder="Basic input" prefix={<UserOutlined />} />
              <Select placeholder="Select an option" className="w-full">
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
              <TextArea placeholder="Text area" rows={3} />
              <div className="flex gap-2">
                <Switch defaultChecked />
                <Radio.Group defaultValue="a">
                  <Radio.Button value="a">A</Radio.Button>
                  <Radio.Button value="b">B</Radio.Button>
                  <Radio.Button value="c">C</Radio.Button>
                </Radio.Group>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card title="Data Display" className="h-full">
            <Space direction="vertical" className="w-full" size="middle">
              <Statistic title="Active Users" value={112893} />
              <Progress percent={70} status="active" />
              <div className="flex gap-2">
                <Badge count={5}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
                <Tag color="green">Success</Tag>
                <Tag color="blue">Processing</Tag>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card title="Actions" className="h-full">
            <Space direction="vertical" className="w-full" size="middle">
              <Button type="primary" icon={<PlusOutlined />} block>
                Primary Action
              </Button>
              <Button icon={<DownloadOutlined />} block>
                Secondary Action
              </Button>
              <Button type="dashed" icon={<UploadOutlined />} block>
                Dashed Action
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Advanced Components */}
      <Card title="Data Table" className="mb-8">
        <div className="mb-4 flex justify-between items-center">
          <Space>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              className="w-64"
            />
            <Button type="primary" icon={<PlusOutlined />}>
              Add New
            </Button>
          </Space>
        </div>
        <Table
          columns={tableColumns}
          dataSource={tableData}
          pagination={{ pageSize: 10 }}
          className="ant-table-responsive"
        />
      </Card>

      {/* Form Modal */}
      <Card title="Interactive Form" className="mb-8">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Open Form Modal
        </Button>
      </Card>

      <Modal
        title="Create New Item"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name!' }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name!' }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email!' },
              { type: 'email', message: 'Please enter valid email!' },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select placeholder="Select role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Navigation Components */}
      <Card title="Navigation Elements" className="mb-8">
        <Space direction="vertical" className="w-full" size="large">
          <Breadcrumb
            items={[
              { title: <HomeOutlined /> },
              { title: 'Components' },
              { title: 'Navigation' },
            ]}
          />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              <Paragraph>Content for Tab 1</Paragraph>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <Paragraph>Content for Tab 2</Paragraph>
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              <Paragraph>Content for Tab 3</Paragraph>
            </TabPane>
          </Tabs>
          <Steps current={1}>
            <Step title="Step 1" description="First step" />
            <Step title="Step 2" description="Second step" />
            <Step title="Step 3" description="Third step" />
          </Steps>
        </Space>
      </Card>

      {/* Feedback Components */}
      <Card title="Feedback & Notifications" className="mb-8">
        <Space wrap>
          <Button
            onClick={() => message.success('Success message!')}
            type="primary"
          >
            Success Message
          </Button>
          <Button
            onClick={() => message.error('Error message!')}
            danger
          >
            Error Message
          </Button>
          <Button
            onClick={() => message.warning('Warning message!')}
          >
            Warning Message
          </Button>
          <Button
            onClick={() => message.info('Info message!')}
          >
            Info Message
          </Button>
        </Space>
      </Card>

      {/* Layout Components */}
      <Card title="Layout & Grid System" className="mb-8">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card size="small" className="text-center">
              <div className="p-4">
                <BarChartOutlined className="text-2xl text-primary mb-2" />
                <div className="font-semibold">Analytics</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card size="small" className="text-center">
              <div className="p-4">
                <TeamOutlined className="text-2xl text-primary mb-2" />
                <div className="font-semibold">Users</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card size="small" className="text-center">
              <div className="p-4">
                <FileTextOutlined className="text-2xl text-primary mb-2" />
                <div className="font-semibold">Reports</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card size="small" className="text-center">
              <div className="p-4">
                <SettingOutlined className="text-2xl text-primary mb-2" />
                <div className="font-semibold">Settings</div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Utility Components */}
      <Card title="Utility Components" className="mb-8">
        <Space direction="vertical" className="w-full" size="large">
          <Collapse>
            <Panel header="Collapsible Section" key="1">
              <Paragraph>
                This is a collapsible section that can contain any content.
                It's great for organizing information and reducing visual clutter.
              </Paragraph>
            </Panel>
          </Collapse>
          
          <Timeline
            items={[
              {
                color: 'green',
                children: 'Create a services site 2015-09-01',
              },
              {
                color: 'green',
                children: 'Solve initial network problems 2015-09-01',
              },
              {
                color: 'red',
                children: 'Network problems being solved 2015-09-01',
              },
              {
                children: 'Create a services site 2015-09-01',
              },
            ]}
          />
          
          <div className="flex gap-4">
            <FloatButton.BackTop />
            <FloatButton
              icon={<PlusOutlined />}
              tooltip="Add New"
              onClick={() => message.info('Float button clicked!')}
            />
          </div>
        </Space>
      </Card>

      {/* Footer */}
      <div className="text-center py-8 border-t border-border">
        <Paragraph className="text-muted-foreground">
          This showcase demonstrates the powerful combination of Ant Design's component library
          with Tailwind CSS's utility-first approach for building modern, responsive applications.
        </Paragraph>
        <Space className="mt-4">
          <Button type="link" icon={<HeartOutlined />}>
            Made with ❤️
          </Button>
          <Button type="link" icon={<StarOutlined />}>
            Star on GitHub
          </Button>
        </Space>
      </div>
    </div>
  );
};