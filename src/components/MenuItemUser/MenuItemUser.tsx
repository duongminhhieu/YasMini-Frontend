import { Avatar, Dropdown, MenuProps, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
    logOut,
    selectCurrentToken,
    selectCurrentUser,
} from '../../lib/redux/auth/authSlice';
import {
    ContainerOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSendLogOutMutation } from '../../lib/redux/auth/authApiSlice';
import { useEffect } from 'react';

const items: MenuProps['items'] = [
    {
        label: 'My Purchase',
        key: 'purchase',
        icon: <ContainerOutlined />,
    },
    {
        label: 'Settings',
        key: 'setting',
        icon: <SettingOutlined />,
    },

    {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
        danger: true,
    },
];

function MenuItemUser() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const tokens = useAppSelector(selectCurrentToken);
    const userAuth = useAppSelector(selectCurrentUser);

    const [logout, statusLogout] = useSendLogOutMutation();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            // handle logout
            logout(tokens.access_token);
            dispatch(logOut());
        } else if (e.key === 'purchase') {
            navigate('/my-purchase');
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    useEffect(() => {
        if (statusLogout.isSuccess) {
            message.info('Logout success!');
            navigate('/login');
        }
        if (statusLogout.error) {
            message.error('Logout failed!');
        }
    }, [statusLogout.error, statusLogout.isSuccess]);

    return (
        <Dropdown
            menu={menuProps}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            placement="bottom"
            arrow={{ pointAtCenter: true }}
        >
            <div className="flex justify-center items-center">
                <Avatar className="bg-gray-400" icon={<UserOutlined />} />
                <div className="flex flex-col items-start justify-center ml-4">
                    <p className=" leading-normal font-semibold text-sm">
                        {userAuth.firstName} {userAuth.lastName}
                    </p>
                    <p className="text-gray-600 text-xs overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[180px]">
                        {userAuth.email}
                    </p>{' '}
                </div>
            </div>
        </Dropdown>
    );
}

export default MenuItemUser;
