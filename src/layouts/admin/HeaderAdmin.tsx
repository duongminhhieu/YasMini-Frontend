import { Flex } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/useRedux';
import { selectCurrentUser } from '../../lib/redux/auth/authSlice';
import MenuItemAdmin from '../../components/MenuItemAdmin';

function HeaderAdmin() {
    const userAuth = useAppSelector(selectCurrentUser);

    return (
        <Header className="bg-white drop-shadow-md flex items-center lg:h-18 justify-between sticky top-0 left-0 z-50">
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
