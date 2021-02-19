import { useStore } from 'vuex'
export const useCommonCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeItemInfo', {
      shopId,
      productId,
      productInfo,
      num
    })
  }
  return { changeItemInfo, cartList }
}
