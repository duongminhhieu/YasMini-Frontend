import {
    ArrowUpOutlined,
    ProductFilled,
    ProductOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Spin, Statistic, Tag } from 'antd';
import { useGetStatisticQuery } from '../../../../lib/redux/statistic/statisticApiSlice';
import { TStatistic } from '../../../../types/TStatistic';
import { convertToDollar } from '../../../../utils/convert';
import TableLatestOrdersComponent from '../components/TableLatestOrders';
import TableTopProductComponent from '../components/TableTopProduct';

function Dashboard() {
    // state

    // query
    const { data, isLoading } = useGetStatisticQuery();
    const statisticData = data?.result as TStatistic;

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-full">
                <Spin></Spin>
            </div>
        );

    return (
        <Card size="default" bordered={true} className="h-full">
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold">Dashboard</p>
            </div>

            <div>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card bordered={true} size="small">
                            <Statistic
                                title="Total Categories"
                                value={statisticData?.totalCategories}
                                loading={isLoading}
                                suffix="categories"
                                prefix={
                                    <div className="mr-1">
                                        {' '}
                                        <ProductOutlined />{' '}
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={true} size="small">
                            <Statistic
                                title="Total Products"
                                value={statisticData?.totalProducts}
                                loading={isLoading}
                                suffix="products"
                                prefix={
                                    <div className="mr-1">
                                        {' '}
                                        <ProductFilled />{' '}
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={true} size="small">
                            <Statistic
                                title="Revenue"
                                value={convertToDollar(statisticData?.revenue)}
                                valueStyle={{ color: 'green' }}
                                suffix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} className="mt-4">
                    <Col span={12}>
                        <Card bordered={true} size="small">
                            <Statistic
                                title="Orders Statistic"
                                className="text-orange-400"
                                valueRender={() => {
                                    return (
                                        <>
                                            <div className="flex gap-2">
                                                <div>
                                                    <ShoppingCartOutlined />
                                                </div>
                                                <span>
                                                    {
                                                        statisticData
                                                            ?.orderStatistic
                                                            .totalOrders
                                                    }{' '}
                                                    orders
                                                </span>
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <Tag color="orange">
                                                    {
                                                        statisticData
                                                            ?.orderStatistic
                                                            .pendingOrders
                                                    }{' '}
                                                    Pending
                                                </Tag>
                                                <Tag color="green">
                                                    {
                                                        statisticData
                                                            ?.orderStatistic
                                                            .completedOrders
                                                    }{' '}
                                                    Completed
                                                </Tag>
                                                <Tag color="blue">
                                                    {
                                                        statisticData
                                                            ?.orderStatistic
                                                            .deliveringOrders
                                                    }{' '}
                                                    Delivering
                                                </Tag>
                                                <Tag color="red">
                                                    {
                                                        statisticData
                                                            ?.orderStatistic
                                                            .canceledOrders
                                                    }{' '}
                                                    Canceled
                                                </Tag>
                                            </div>
                                        </>
                                    );
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={true} size="small">
                            <Statistic
                                title="Customers Statistic"
                                valueRender={() => {
                                    return (
                                        <>
                                            <div className="flex gap-2">
                                                <div>
                                                    <UserOutlined />
                                                </div>
                                                <span>
                                                    {
                                                        statisticData
                                                            ?.customerStatistic
                                                            .totalCustomers
                                                    }{' '}
                                                    customers
                                                </span>
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <Tag color="green">
                                                    {
                                                        statisticData
                                                            ?.customerStatistic
                                                            .totalActiveCustomers
                                                    }{' '}
                                                    Active
                                                </Tag>
                                                <Tag color="red">
                                                    {
                                                        statisticData
                                                            ?.customerStatistic
                                                            .totalInactiveCustomers
                                                    }{' '}
                                                    Inactive
                                                </Tag>
                                            </div>
                                        </>
                                    );
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <div>
                <Row gutter={16} className="mt-4">
                    <Col span={18}>
                        <TableLatestOrdersComponent
                            lastestOrder={statisticData.latestOrders}
                        />
                    </Col>
                    <Col span={6}>
                        <TableTopProductComponent
                            topProducts={statisticData.topProducts}
                        />
                    </Col>
                </Row>
            </div>
        </Card>
    );
}

export default Dashboard;
