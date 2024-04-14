
import { Menu } from "antd";
import { Link } from "react-router-dom";


export default function AppHeader() {
    return (
        <div className="container-fluid">
            <div className="header">
                <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" ><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/about-me">About-me</Link></Menu.Item>
                </Menu>
            </div>
        </div>
    )
}
