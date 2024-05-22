import { Avatar, Dropdown, MenuProps, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
    logOut,
    selectCurrentToken,
    selectCurrentUser,
} from '../../lib/redux/auth/authSlice';
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSendLogOutMutation } from '../../lib/redux/auth/authApiSlice';
import { useEffect } from 'react';

const items: MenuProps['items'] = [
    {
        label: 'Settings',
        key: 'setting',
        icon: <SettingOutlined />,
    },

    {
        label: 'Logout',
        key: '3',
        icon: <LogoutOutlined />,
        danger: true,
    },
];

function MenuItemAdmin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const tokens = useAppSelector(selectCurrentToken);
    const userAuth = useAppSelector(selectCurrentUser);

    const [logout, statusLogout] = useSendLogOutMutation();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '3') {
            // handle logout
            logout(tokens.access_token);
            dispatch(logOut());
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    useEffect(() => {
        if (statusLogout.isSuccess) {
            message.info('Logout Administrador success!');
            navigate('/admin/login');
        }
        if (statusLogout.error) {
            message.error('Logout Administrador failed!');
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
                        Administrador
                    </p>
                    <p className="text-gray-600 text-xs">{userAuth.email}</p>
                </div>
            </div>
        </Dropdown>
    );
}

export default MenuItemAdmin;
