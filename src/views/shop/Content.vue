<template>
<div class="content">
    <div class="category">
        <div
        :class="{'category__item':true, 'category__item--active': currentTab === item.tab}"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
        >{{item.name}}</div>
    </div>
    <div class="product">
        <div
        class="product__item"
        v-for="(item) in list"
        :key="item._id">
            <img class="product__item__img" :src="item.imgUrl">
            <div class="product__item__detail">
                <h4 class="product__item__title">{{item.name}}</h4>
                <p class="product__item__sales"> {{item.sales}} </p>
                <p class="product__item__price">
                    <span class="product__item__yen">&yen;{{item.price}}</span>
                    <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                </p>
            </div>
            <div class="product__number">
                <span
                class="product__number__minus"
                @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }"
                >-</span>
                {{cartList?.[shopId]?.productList?.[item._id]?.count || 0}}
                <span
                class="product__number__plus"
                @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) } "
                >+</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useCommonCartEffect } from './commonCatEffect'
const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]
// tab切换相关
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}
// 列表内容相关
const useCUrrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContent = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContent() })
  const { list } = toRefs(content)
  return { list }
}
// 购物车

export default {
  name: 'content',
  props: ['shopName'],
  setup () {
    const store = useStore()
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCUrrentListEffect(currentTab, shopId)
    const { changeItemInfo, cartList } = useCommonCartEffect()
    const changeShopName = (shopId, shopName) => {
      store.commit('changeShopName', { shopId, shopName })
    }
    const changeCartItem = (shopId, priductId, item, num, shopName) => {
      changeItemInfo(shopId, priductId, item, num)
      changeShopName(shopId, shopName)
    }
    return { handleTabClick, categories, currentTab, list, shopId, changeCartItem, cartList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/vinilables.scss';
@import '../../style/mixins.scss';
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: 0.5rem;
}
.category {
    overflow-y: scroll;
    height: 100%;
    width: .76rem;
    background-color:$search-bgColor;
    &__item {
      line-height: .4rem;
      text-align: center;
      font-size: .14rem;
      color: #333;
      &--active {
        background-color:$bgColor;
      }
    }
}
.product {
    overflow-y: scroll;
    flex: 1;
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: 1px solid $content-bgcolor;
        &__detail{
            overflow: hidden;
        }
        &__img {
            width: 0.68rem;
            height: 0.68rem;
            margin-right: .16rem;
        }
        &__title {
            line-height: .2rem;
            font-size: .14rem;
            color: #333;
            margin: 0;
            @include ellipsis
        }
        &__sales {
            margin: .06rem 0;
            line-height: .16rem;
            font-size: .12rem;
            color: #333;
        }
        &__price {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color:$hightlight-fontColor;
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
        bottom: 0.12rem;
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
            color:$medium-fontColor;
            margin-right: .05rem;
        }
        &__plus {
            background-color:$btnColor;
            color: $bgColor;
            margin-left: .05rem;
        }
    }
}
</style>
