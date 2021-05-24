import {selector} from 'recoil'
import { allOrdersState, productsState, 
    allOrdersSearchState, productsSearchState, distributionHistoryState, distributionHistorySearchState } from './atoms'
import { NUM_OF_ORDERS_EACH_PAGE, 
    NUM_OF_PRODUCTS_EACH_PAGE,
    NUM_OF_DISTRIBUTION_HISTORY_EACH_PAGE } from './../Constants'

//===============ALL ORDERS===========================
const filteredAllOrdersState = selector({
    key: 'filteredAllOrdersState',
    get: ({get}) => {
        const allOrders = get(allOrdersState);

        const currentSearchState = get(allOrdersSearchState);
        const { loginSearch, nameSearch, managerSearch, itemSearch } = currentSearchState;

        return allOrders
            .filter(item => item.user_name.toLowerCase().includes(loginSearch.toLowerCase()))
            .filter(item => item.user_first_name ? 
                item.user_first_name.toLowerCase().includes(nameSearch.toLowerCase()) : true)
            .filter(item => item.user_manager ? 
                item.user_manager.toLowerCase().includes(managerSearch.toLowerCase()) : true )
            .filter(item => item.swag_name && 
                item.swag_name.toLowerCase().includes(itemSearch.toLowerCase()));
       
    }
})

const numOfAllOrdersPagesState = selector({
    key: 'numOfAllOrdersPagesState',
    get: ({get}) => {
        const filteredOrders = get(filteredAllOrdersState);
        return Math.floor(filteredOrders.length/NUM_OF_ORDERS_EACH_PAGE);
    }
})
//============================================================


//==================PRDUCTS===================================
const filteredProductsState = selector({
    key: 'filteredProductsState',
    get: ({get}) => {
        const allProducts = get(productsState);
        const { swagIDSearch, swagNameSearch } = get(productsSearchState);

        return allProducts.filter(item => 
            item.swag_item_id.toLowerCase().includes(swagIDSearch.toLowerCase()))
            .filter(item => 
                item.swag_name.toLowerCase().includes(swagNameSearch.toLowerCase()))

    }
})

const numOfProductsPagesState = selector({
    key: 'numberOfProductsPageState',
    get: ({get}) => {
        const filteredProducts = get (filteredProductsState);
        return Math.floor(filteredProducts.length/NUM_OF_PRODUCTS_EACH_PAGE);
    }
})
//============================================================

//=========SWAG FULFILLMENT & BACKLOG==========================
const receivedOrdersState = selector({
    key: 'receivedOrdersState',
    get: ({get}) => {
        const allOrders = get(allOrdersState);
        if (allOrders)
           return allOrders.filter(item => item.status === 'RECEIVED');

        return [];
    }
})

const backedOrdersState = selector({
    key: 'backedOrdersState',
    get: ({get}) => {
        const allOrders = get(allOrdersState);
        if (allOrders)
           return allOrders.filter(item => item.status === 'BACKORDERED');

        return [];
    }
})
//=============================================================


//=============DISTRIBUTION HISTORY============================
const filteredDistributionHistoryState = selector({
    key: 'filteredDistributionHistoryState',
    get: ({get}) => {
        const distributionHistory = get(distributionHistoryState);

        const currentSearchState = get(distributionHistorySearchState);
        const { receiverSearch, nameSearch, distributorSearch, 
            amountSearch, reasonSearch, dateSearch } = currentSearchState;

        return distributionHistory
            .filter(item => item.user_name.toLowerCase()
                .includes(receiverSearch.toLowerCase()))
            .filter(item => item.user_first_name ? 
                item.user_first_name.toLowerCase()
                    .includes(nameSearch.toLowerCase()) : true)
            .filter(item => item.manager_user_name ? 
                item.manager_user_name.toLowerCase()
                    .includes(distributorSearch.toLowerCase()) : true)
            .filter(item => item.reason ? 
                item.date.toLowerCase()
                    .includes(dateSearch.toLowerCase()) : true)
            .filter(item => item.date ? 
                item.reason.toLowerCase()
                    .includes(reasonSearch.toLowerCase()) : true)
            .filter(item => item.swag_amt.toLowerCase()
                .includes(amountSearch.toLowerCase()));
       
    }
})

const numOfDistributionHistoryPagesState = selector({
    key: 'numberOfProductsPageState',
    get: ({get}) => {
        const filteredDistributionHistory = 
            get(filteredDistributionHistoryState);
        return Math.floor(filteredDistributionHistory.length/
            NUM_OF_DISTRIBUTION_HISTORY_EACH_PAGE);
    }
})
//=============================================================

//===============ADD DIALOG====================================
const lastIDState = selector({
    key: 'lastIDState',
    get: ({get}) => {
        const products = get(productsState);
        if (products && products.length >= 1) return products[products.length - 1].swag_item_id;
        return '';
    }
})
//=============================================================



export { receivedOrdersState, backedOrdersState, 
    lastIDState, filteredAllOrdersState,
    filteredProductsState,
    numOfProductsPagesState,
    numOfAllOrdersPagesState,
    filteredDistributionHistoryState,
    numOfDistributionHistoryPagesState }
