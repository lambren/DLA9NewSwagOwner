import { atom } from 'recoil'


//=========ALL ORDERS===========
const allOrdersState = atom({
    key: 'allOrdersState',
    defaut: [],
})

const allOrdersSearchState = atom({
    key: 'allOrdersSearchState',
    default: {
        loginSearch: '',
        nameSearch: '',
        managerSearch: '',
        itemSearch: '',
    }
})
//==============================

//=========PRODUCTS=============
const productsState = atom({
    key: 'productsState',
    default: [],
})

const productsSearchState = atom({
    key: 'productsSearchState',
    default: {
        swagIDSearch: '',
        swagNameSearch: '',
    }
})
//==============================

//===SWAG DISTRIBUTION HISTORY==
const distributionHistoryState = atom({
    key: 'distributionHistoryState',
    default: []
})

const distributionHistorySearchState = atom({
    key: 'distributionHistorySearchState',
    default: {
        receiverSearch: '',
        nameSearch: '',
        distributorSearch: '',
        amountSearch: '',
        reasonSearch: '',
        dateSearch: '',
    }
})

//=====BEING FULFILLED ORDERS===
const beingFulfilledOrdersState = atom({
    key: 'beingFulfilledOrdersState',
    default: [],
})
//==============================


//======DIALOGS OPEN STATE======
const addDialogState = atom({
    key: 'addDialogState',
    default: {
        open: false,
    }
})

const editPictureDialogState = atom({
    key: 'editPictureDialogState', 
    default: {
        open: false,
        swag_item_id: '',
        currentPictureLink: '',
        swag_name: '',
    },
})
//==============================



export { allOrdersState, beingFulfilledOrdersState, 
    productsState, allOrdersSearchState,
    editPictureDialogState, addDialogState,
    productsSearchState,
    distributionHistorySearchState,
    distributionHistoryState }