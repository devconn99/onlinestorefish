import axios from "axios";

const state = {
    orders: [{
            id: 1,
            product_name: "koi first",
            user_email: "user1@gmail.com",
            quantity: 23,
            address: "somewhere I belong",
            is_delivered: 0,
            created_at: "2019-11-07 19:52:17",
            updated_at: "2019-11-07 19:52:17"
        },
        {
            id: 2,
            product_name: "koi Second",
            user_email: "user2@gmail.com",
            quantity: 13,
            address: "somewhere I belong",
            is_delivered: 1,
            created_at: "2019-11-07 19:52:17",
            updated_at: "2019-11-07 19:52:17"
        },
        {
            id: 3,
            product_name: "koi first",
            user_email: "user2@gmail.com",
            quantity: 10,
            address: "somewhere I belong",
            is_delivered: 0,
            created_at: "2019-11-07 19:52:17",
            updated_at: "2019-11-07 19:52:17"
        }
    ]
}

const getters = {
    orders: state => state.orders
}

const mutations = {
    insertOrder: (state, new_order) => state.orders = [new_order, ...state.orders],
    setOrders: (state, orders) => state.orders = orders 
}

const actions = {
    newOrder: async ({ commit }, order) => {

        return axios.post('/order', {
            token: order.token,
            items: order.items,
            email: order.email,
            phone: order.phone,
            address: order.address,
            country: order.country,
            city: order.city,
            state: order.state,
            postal_code: order.postal_code,
            last4: order.last4,
            payment_method: order.payment_method

        }).then((res) => {
            commit("insertOrder", res);
            return res

        }).catch(err => {
            // return err.response;
            alert(err);
        })
    },
    getOrders: async ({ commit, rootState }) => {
        axios.get('/order', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.auth.myToken}`
            }
        }).then(res => {
            commit("setOrders", res.data);
        }).catch(err => {
            alert(err);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}