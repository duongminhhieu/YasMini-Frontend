import { ShoppingCartOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
    selectCurrentToken,
    selectCurrentUser,
} from '../../lib/redux/auth/authSlice';
import MenuItemUser from '../../components/MenuItemUser/MenuItemUser';
import { useGetAllCartsQuery } from '../../lib/redux/cart/cartApiSlice';
import { Badge, Image, Spin, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import BellNotification from '../../components/BellNotification';
import { useEffect, useState } from 'react';
import { APIConstants } from '../../constants/api.constant';
import { useGetAllNotificationsQuery } from '../../lib/redux/notification/notificationApiSlice';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { Notification } from '../../types/Notification';
import { addNotification } from '../../lib/redux/notification/notificationSlice';

function HeaderUser() {
    // state
    const userAuth = useAppSelector(selectCurrentUser);
    const carts = useAppSelector((state) => state.cart.carts);

    const [listening, setListening] = useState(false);
    const [notificationRealtime, setNotificationRealtime] =
        useState<Notification>();
    const tokens = useAppSelector(selectCurrentToken);
    let eventSource: any = undefined;

    // hooks
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();

    // query
    const { isLoading: isCartLoading } = useGetAllCartsQuery();
    const { isLoading: isNotificationLoading } = useGetAllNotificationsQuery();

    // effect

    useEffect(() => {
        if (!listening) {
            eventSource = new EventSource(
                APIConstants.NOTIFICATION.SUBSCRIBE(tokens.access_token),
            );

            eventSource.onopen = () => {
                console.log('connection opened');
            };

            eventSource.onmessage = (event: any) => {
                const data = JSON.parse(event.data) as Notification;
                setNotificationRealtime(data);
            };

            eventSource.onerror = (event: any) => {
                console.log(event.target.readyState);
                if (event.target.readyState === EventSource.CLOSED) {
                    console.log('SSE closed (' + event.target.readyState + ')');
                }
                eventSource.close();
            };

            setListening(true);
        }
        return () => {
            if (eventSource) {
                eventSource.close();
                console.log('event closed');
            }
        };
    }, []);

    useEffect(() => {
        if (notificationRealtime) {
            openNotification('topRight', notificationRealtime);
            dispatch(addNotification(notificationRealtime));
        }
    }, [notificationRealtime]);

    //handles
    const openNotification = (
        placement: NotificationPlacement,
        data: Notification,
    ) => {
        api.info({
            message: data.title,
            description: (
                <div className="flex gap-4 items-center">
                    <Image src={data.thumbnail} width={120} />
                    <div>{data.content}</div>
                </div>
            ),
            placement,
        });
    };

    return (
        <Header className="bg-white drop-shadow-md flex items-center lg:h-20 justify-center sticky top-0 left-0 z-10">
            {contextHolder}

            <div className="flex justify-between items-center w-full">
                <div
                    className="flex justify-center items-center cursor-pointer"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <img
                        src="/YasMiniLogo.png"
                        className="w-24 mr-2"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold text-dark font-serif">
                        YasMini
                    </h1>
                </div>

                <div className="flex justify-center items-center w-1/2">
                    <Search
                        placeholder="Search for products"
                        size="large"
                        enterButton
                        onSearch={(value) => {
                            window.location.href = `/search?keyword=${value}`;
                        }}
                    />
                </div>

                <div className="flex justify-center item-center align-bottom gap-4">
                    <button
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg w-fit flex justify-center items-center"
                        onClick={() => {
                            navigate('/cart');
                        }}
                    >
                        {isCartLoading ? (
                            <Spin />
                        ) : (
                            <Badge count={carts.length} showZero>
                                <div>
                                    <ShoppingCartOutlined className="text-3xl" />
                                </div>
                            </Badge>
                        )}
                    </button>

                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg w-fit flex justify-center items-center">
                        {isNotificationLoading ? (
                            <Spin />
                        ) : (
                            <BellNotification />
                        )}
                    </button>

                    {userAuth ? <MenuItemUser /> : null}
                </div>
            </div>
        </Header>
    );
}

export default HeaderUser;
