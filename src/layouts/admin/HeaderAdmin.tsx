import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Flex, MenuProps, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/useRedux';
import { selectCurrentUser } from '../../lib/redux/auth/authSlice';
import MenuItemAdmin from '../../components/MenuItemAdmin';

function HeaderAdmin() {
    const userAuth = useAppSelector(selectCurrentUser);

    return (
        <Header className="bg-white drop-shadow-md flex items-center lg:h-18 z-0 justify-between">
            <Flex className="items-center">
                <img src="/YasMiniLogo.png" className="w-24 mr-2" alt="" />
                <h1 className="text-2xl font-semibold text-dark font-serif">
                    YasMini - Car Shop
                </h1>
            </Flex>

            {userAuth ? <MenuItemAdmin /> : null}
        </Header>
    );
}

export default HeaderAdmin;
