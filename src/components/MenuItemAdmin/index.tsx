import { Avatar, Dropdown, MenuProps, message } from 'antd';
import { useAppDispatch } from '../../hooks/useRedux';
import { logOut } from '../../lib/redux/auth/authSlice';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSendLogOutMutation } from '../../lib/redux/auth/authApiSlice';
import { useEffect } from 'react';

const items: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
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
    const [logout, statusLogout] = useSendLogOutMutation();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '3') {
            message.info('Logout');

            // handle logout
            logout({});
            dispatch(logOut());
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    useEffect(() => {
        if (statusLogout.isSuccess) {
            message.success('Logout Administrador success!');
            navigate('/admin/login');
        }
        if (statusLogout.error) {
            message.error('Logout Administrador failed!');
        }
    }, [statusLogout.error, statusLogout.isSuccess]);

    return (
        <Dropdown
            menu={menuProps}
            className="cursor-pointer"
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
        >
            <Avatar className="bg-gray-400" icon={<UserOutlined />} />
        </Dropdown>
    );
}

export default MenuItemAdmin;
