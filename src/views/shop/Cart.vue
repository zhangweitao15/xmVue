<template>
  <div
  class="mask"
  v-if="showCart"
  @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span
          class="product__header__icon iconfont"
          v-html="allChecked ? '&#xe63a;' : '&#xe667;'"></span>
          全选
        </div>
        <div
        class="product__header__clear"
        ><span @click="() => { cleanCartProducts(shopId) }">清空购物车</span></div>
      </div>
      <template
      class="product__item"
      v-for="(item) in productList"
      :key="item._id"
      >
        <div class="product__item" v-if="item.count > 0">
          <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe63a;' : '&#xe667;'"
          @click="() => { changeCartItemChecked(shopId, item._id) }"
          >
          </div>
          <img class="product__item__img" :src="item.imgUrl">
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;{{item.price}}</span>
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus" @click="() => { changeItemInfo(shopId, item._id, item, -1) }">-</span>
            {{item.count || 0}}
            <span class="product__number__plus" @click="() => { changeItemInfo(shopId, item._id, item, 1) } ">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
        src="http://www.dell-lee.com/imgs/vue3/basket.png"
        class="check__icon__img"
        @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{price}}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ name: 'Home' }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCatEffect'

// 获取购物车信息
const useCartEffect = (shopId) => {
  const { changeItemInfo } = useCommonCartEffect()
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }
  const total = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })
  const price = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) { count += (product.count * product.price) }
      }
    }
    return count.toFixed(2)
  })
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  const allChecked = computed(() => {
    const productList = cartList[shopId]?.productList
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.check) { result = false }
      }
    }
    return result
  })

  return { total, price, productList, changeItemInfo, changeCartItemChecked, cleanCartProducts, allChecked, setCartItemsChecked }
}

// 购物车展示隐藏
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { handleCartShowChange, showCart }
}
export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { handleCartShowChange, showCart } = toggleCartEffect()

    const {
      total, price, productList, changeItemInfo, changeCartItemChecked,
      cleanCartProducts, allChecked, setCartItemsChecked
    } = useCartEffect(shopId)
    return {
      handleCartShowChange,
      total,
      price,
      productList,
      changeItemInfo,
      shopId,
      changeCartItemChecked,
      cleanCartProducts,
      allChecked,
      setCartItemsChecked,
      showCart
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/vinilables.scss';
  @import '../../style/mixins.scss';
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
  }
  .cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: $bgColor;
  }

  .check {
    display: flex;
    height: .51rem;
    line-height: .51rem;
    border-top: .01rem solid $content-bgcolor;
    box-sizing: border-box;

    &__icon {
      position: relative;
      width: 0.84rem;

      &__img {
        display: block;
        width: 0.28rem;
        height: 0.26rem;
        margin: .12rem auto;
      }

      &__tag {
        position: absolute;
        left: 0.46rem;
        top: .04rem;
        padding: 0 .04rem;
        min-width: .2rem;
        height: .2rem;
        line-height: .2rem;
        background-color: $hightlight-fontColor;
        border-radius: .1rem;
        font-size: .12rem;
        color: $bgColor;
        text-align: center;
        transform: scale(.5);
        transform-origin: left center;
      }
    }

    &__info {
      flex: 1;
      color: $content-fontcolor;
      font-size: .12rem;

      &__price {
        color: $hightlight-fontColor;
        font-size: .18rem;
        font-weight: 600;
      }
    }

    &__btn {
      width: .98rem;
      color: $bgColor;
      font-size: .14rem;
      text-align: center;
      background-color: $btnColor;
      a {
        color: $bgColor;
        text-decoration: none;
      }
    }
  }

  .product {
    overflow-y: scroll;
    background-color: $bgColor;
    flex: 1;
    &__header {
      display: flex;
      line-height: 0.52rem;
      border-bottom: .01rem solid $content-bgcolor;
      font-size: .14rem;
      color: $content-fontcolor;
      &__all {
        flex: 1;
        width: 0.64rem;
      }
      &__icon {
        display: inline-block;
        vertical-align: top;
        font-size: 0.2rem;
        color:$btnColor;
        margin-left: 0.16rem;
      }
      &__clear {
        flex: 1;
        text-align: right;
        margin-right: 0.16rem;
      }
    }
    &__item {
      position: relative;
      display: flex;
      padding: .12rem 0;
      margin: 0 .16rem;
      border-bottom: 1px solid $content-bgcolor;

      &__checked {
        color: $btnColor;
        font-size: 0.2rem;
        line-height: .5rem;
        margin-right: .2rem;
      }
      &__detail {
        overflow: hidden;
      }

      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: .16rem;
      }

      &__title {
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        margin: 0;
        @include ellipsis
      }

      &__price {
        margin: 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $hightlight-fontColor;
        margin: .06rem 0 0 0;
      }

      &__yen {
        font-size: .12rem;
      }

      &__origin {
        margin-left: .06rem;
        line-height: .2rem;
        font-size: .12rem;
        color: $light-fontColor;
        text-decoration: line-through;
      }
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.26rem;

      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: .16rem;
        border-radius: 50%;
        font-size: .2rem;
        text-align: center;
      }

      &__minus {
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }

      &__plus {
        background-color: $btnColor;
        color: $bgColor;
        margin-left: .05rem;
      }
    }
  }
</style>
