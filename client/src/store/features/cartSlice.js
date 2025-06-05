import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchGraphQL} from "../../graphql/fetchGraphQL";
import {CREATE_ORDER} from "../../graphql/mutation";

const calculateTotalItems = (state) => {
    let total = 0;
    for (let i = 0; i < state.items.length; i++) {
        total += state.items[i].quantity;
    }
    state.totalItems = total;
};

const calculateTotalPrice = (state) => {
    let totalPrice = 0;
    state.items.forEach(item => {
        totalPrice += item.quantity * item.price;
    });
    state.totalPrice = totalPrice;
};

function checkForIdenticalProducts(state) {
    const uniqueItems = [];
    state.items.forEach(item => {
        const existingItem = uniqueItems.find(existingItem =>
            existingItem.productId === item.productId &&
            JSON.stringify(existingItem.attributes) === JSON.stringify(item.attributes)
        );
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            uniqueItems.push(item);
        }
    });
    state.items = uniqueItems;
}

function handleChanges(state){
    calculateTotalItems(state);
    calculateTotalPrice(state);
    saveToLocalStorage(state)
}

function saveToLocalStorage(state){
    localStorage.setItem('cart', JSON.stringify(state));
}

const itemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    loading: false,
    error: false,
    totalPrice: 0,
    totalItems: 0,
    cartOpen: false
}

itemsFromLocalStorage.cartOpen = false

export const createOrder = createAsyncThunk('cart/createOrder', async (data) => {
    const response = await fetchGraphQL(CREATE_ORDER, {order:data});
    return response.createOrder;
});


const cartSlice = createSlice({
    name: 'cart',
    initialState: itemsFromLocalStorage,
    reducers: {
        openCloseCart: (state) => {
            state.cartOpen = !state.cartOpen;
            handleChanges(state)
        },
        addToCart: (state, action) => {
            state.items.push(action.payload);
            checkForIdenticalProducts(state);
            handleChanges(state)
        },
        increaseItemCount: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
            handleChanges(state)
        },
        decreaseItemCount: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
            }
            handleChanges(state)
        },
        // changeItemAttribute: (state, action) => {
        //     state.items.forEach((item, id) => {
        //         if (item.id === action.payload.itemId) {
        //             state.items[id].attributes[action.payload.attributeName] = action.payload.attributeValue;
        //         }
        //     });
        //     checkForIdenticalProducts(state);
        //     saveToLocalStorage(state.items)
        // },
        checkForUpdatedDatas: (state, action) => {
            const { product_id, name, price } = action.payload;
            state.items.forEach((item, id) => {
                if ((item.product_id===product_id)&&(item.name !== name)) {
                    state.items[id].name = name;
                }
                if ((item.product_id===product_id)&&(item.price !== price)) {
                    state.items[id].price = price;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                console.log(`order number: ${action.payload}`)
                state.items = []
                handleChanges(state)
            })
            .addCase(createOrder.rejected, () => {
                console.log('can\'t place order')
            });
    },
});

export const {
    addToCart,
    increaseItemCount,
    decreaseItemCount,
    changeItemAttribute,
    openCloseCart,
    checkForUpdatedDatas
} = cartSlice.actions;
export default cartSlice.reducer;
