import { useLocation } from 'react-router-dom';
import Search from '../../features/public/Home/pages/Search';

function SearchPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('keyword') as string;

    return <Search search={searchTerm} />;
}

export default SearchPage;
