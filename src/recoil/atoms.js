import { atom } from 'recoil';


//cart atom will store the values of a cart item. Price and units given by lionr?
export const cart = atom({
    key: "cart",
    default: []
});

export const selected = atom({
    key: "selected",
    default: {}
});

export const selectedSearch = atom({
    key: "selectedSearch",
    default: {}
});

export const search = atom({
    key: "search",
    default: {}
});

export const selectedCompartment = atom({
    key: "selectedCompartment",
    default: {}
});


// Atom for the storage to be viewed or altered.
export const storage = atom({
    key: "storage",
    default: {}
});

// Atom for the new selected storage, when moving an article to a new storage (view 13.2.1)
export const newStorage = atom({
    key: "newStorage",
    default: {}
});

// Atom for all orders in database
export const orders = atom({
    key: "orders",
    default: []
})
// Atom for the order to be viewed or altered.
export const selectedOrder = atom({
    key: "selectedOrder",
    default: []
})
// Atom for the article to be assigned to a new storage. (View S10.1->13->13.4)
export const articleNewStorage = atom({
    key: "articleNewStorage",
    default: {}
})

//Atom for all storages in database
export const allStorages = atom({
    key: "allStorages",
    default: []
});

// Atom for the article to be assigned to a new storage. (View S10.1->13->13.4)
export const articlesToUnpack = atom({
    key: "articlesToUnpack",
    default: []
})

export const articles = atom({
    key: "articles",
    default: []
});