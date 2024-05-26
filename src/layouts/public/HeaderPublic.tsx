import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';

function HeaderPublic() {
    return (
        <Header className="bg-white drop-shadow-md flex items-center lg:h-20 z-0 justify-center">
            <div className="flex justify-between items-center w-full">
                <div
                    className="flex justify-center items-center cursor-pointer"
                    onClick={() => {
                        window.location.href = '/';
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

                <div className="flex justify-center item-center align-bottom">
                    <ShoppingCartOutlined className="text-3xl" />
                    <Button className="ml-6">Login</Button>
                </div>
            </div>
        </Header>
    );
}

export default HeaderPublic;
