import { BellOutlined } from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Dropdown,
    Image,
    List,
    Menu,
    MenuProps,
    Popover,
} from 'antd';
import { useAppSelector } from '../../hooks/useRedux';
import { convertDate } from '../../utils/convert';

function BellNotification() {
    const notifications = useAppSelector(
        (state) => state.notification.notifications,
    );
    const totalUnread = useAppSelector(
        (state) => state.notification.totalUnread,
    );

    const content = (
        <List
            itemLayout="horizontal"
            dataSource={notifications.slice(0, 5)}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Image src={item.thumbnail || ''} width={80} />}
                        title={<a href={item.link || ''}>{item.title}</a>}
                        description={
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-600">
                                    {item.content}
                                </span>
                                <span>{convertDate(item.createdDate)}</span>
                            </div>
                        }
                        className="w-fit"
                    />
                </List.Item>
            )}
        />
    );
    return (
        <Popover
            title="Recently, Received Notifications"
            content={content}
            overlayClassName="w-96"
        >
            <Badge count={totalUnread} showZero offset={[-2, 2]}>
                <div>
                    <BellOutlined className="text-3xl" />
                </div>
            </Badge>
        </Popover>
    );
}

export default BellNotification;
