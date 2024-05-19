import { Flex } from 'antd';
import { Header } from 'antd/es/layout/layout';

function HeaderAdmin() {
    return (
        <Header className="bg-white drop-shadow-md flex items-center lg:h-18 z-0">
            <Flex className="items-center">
                <img src="/YasMiniLogo.png" className="w-24 mr-2" alt="" />
                <h1 className="text-2xl font-semibold text-dark font-serif">
                    YasMini - Car Shop
                </h1>
            </Flex>
        </Header>
    );
}

export default HeaderAdmin;
