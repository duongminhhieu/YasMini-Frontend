
import { Menu } from "antd";


function AppHeader() {
    return (
        
        <div className="container-fluid">
            <div className="header">
                <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">About Us</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}
export default AppHeader;