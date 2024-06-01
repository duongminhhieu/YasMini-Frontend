import { Result } from 'antd';
import { Link } from 'react-router-dom';

function ForbiddenPage() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <Link to={'/'} type="primary">
                    Back Home
                </Link>
            }
        />
    );
}

export default ForbiddenPage;
