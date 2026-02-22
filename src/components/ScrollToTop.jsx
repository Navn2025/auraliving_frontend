import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const ScrollToTop=() =>
{
    const {pathname}=useLocation();

    useEffect(() =>
    {
        // Ensuring scroll to top happens after potential layouts or late renders
        const timer=setTimeout(() =>
        {
            window.scrollTo(0, 0);
        }, 10);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
