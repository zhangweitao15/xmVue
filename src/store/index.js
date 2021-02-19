import { createStore } from 'vuex'

export default createStore({
  state: {
    // cartList: {
    //   // 第一层级是商铺的id
    //   shopId: {
    //     // 第二层商铺名称
    //     shopName:'',
    //     // 第二层商品列表
    //     productList:{
    //       // 第三层是商品id
    //       productId: {
    //       // 商品信息
    //         _id: '1',
    //         name: '番茄250g/份',
    //         imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //         sales: 10,
    //         price: 33.6,
    //         oldPrice: 39.6,
    //         count: 2
    //       },
    //     }
    //   },
    // }
    cartList: {}
  },
  mutations: {
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
    },
    changeItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || { shopname: '', productList: {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
        product.check = 0
      }
      product.count = product.count + num;
      (num > 0) && (product.check = true);
      (product.count < 0) && (product.count = 0)
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopname: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
