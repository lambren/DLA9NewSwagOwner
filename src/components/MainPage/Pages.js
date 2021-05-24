import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CommentIcon from '@material-ui/icons/Comment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import WidgetsIcon from '@material-ui/icons/WidgetsSharp';
import AllInclusiveIcon from '@material-ui/icons/AllInclusiveSharp';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import OrderFulfillment from './Orders/OrderFulfillmentPage/OrderFulfillment';
import BackOrders from './Orders/BackOrdersPage/BackOrders'
import AllOrders from './Orders/AllOrdersPage/AllOrders'
import ProductManagement from './Product/ProductManagmentPage/ProductManagement'
import SwagDistribution from './Client/SwagDistributionPage/SwagDistribution';
import AccountManagement from './Client/AccountManagementPage/AccountManagement';
import Comment from './Client/CommentsPage/Comments'

const Pages = [
    {
        path: '/home/order-fulfillment',
        main: OrderFulfillment,
        title: 'Order Fulfillment',
        icon: <LibraryAddCheckIcon/>,
    },
    {
        path: '/home/back-orders',
        main: BackOrders,
        title: 'Back Orders',
        icon: <LibraryBooksIcon/>,
    },
    {
        path: '/home/all-orders',
        main: AllOrders,
        title: 'All Orders',
        icon: <AllInclusiveIcon/>,
    },
    {
        path: '/home/product-management',
        main: ProductManagement,
        title: 'Product Managment',
        icon: <WidgetsIcon/>,
    },
    {
        path: '/home/swag-distribution',
        main: SwagDistribution,
        title: 'Swag Distribution',
        icon: <MonetizationOnIcon/>,
    },
    {
        path: '/home/account-management',
        main: AccountManagement,
        title: 'Account Management',
        icon: <SupervisorAccountIcon/>,
    },
    {
        path: '/home/comments/',
        main: Comment,
        title: 'Comments',
        icon: <CommentIcon/>,   
    }
]

export { Pages }