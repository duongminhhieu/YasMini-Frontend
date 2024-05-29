import { ShoppingCartOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/useRedux';
import { selectCurrentUser } from '../../lib/redux/auth/authSlice';
import MenuItemUser from '../../components/MenuItemUser/MenuItemUser';
import { useGetAllCartsQuery } from '../../lib/redux/cart/cartApiSlice';
import { Badge, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

function HeaderUser() {
    const userAuth = useAppSelector(selectCurrentUser);
    const carts = useAppSelector((state) => state.cart.carts);

    const navigate = useNavigate();

    // query
    const { isLoading: isCartLoading } = useGetAllCartsQuery();

    return (
        <Header className="bg-white drop-shadow-md flex items-center lg:h-20 justify-center sticky top-0 left-0 z-10">
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

                    {userAuth ? <MenuItemUser /> : null}
                </div>
            </div>
        </Header>
    );
}

export default HeaderUser;
