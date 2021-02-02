<template>
  <div class="wrapper">
    <div class="search">
      <div
      class="search__back iconfont"
      @click="handleBackCLick"
      >&#xe601;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe600;</span>
        <input
        type="text"
        placeholder="请输入商品名称搜索"
        class="search__content__input" />
      </div>
    </div>
    <Shopinfo :item="data.item" :hideBorder="true" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
import Shopinfo from '../../components/Shopinfo'
const useBack = () => {
  const rouster = useRouter()
  const handleBackCLick = () => {
    rouster.back()
  }
  return { handleBackCLick }
}
const useGetMsg = () => {
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get('/api/shop/1')
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  return { getItemData, data }
}
export default {
  name: 'Shop',
  components: { Shopinfo },
  setup () {
    const { handleBackCLick } = useBack()
    const { getItemData, data } = useGetMsg()
    getItemData()

    return { data, handleBackCLick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/vinilables.scss';
.wrapper {
  padding: 0 .18rem;
}
.search {
  margin: .14rem 0 .04rem 0;
  display: flex;
  line-height: .32rem;
  &__back {
    width: .32rem;
    font-size: .24rem;
    color: #B6B6B6;
  }
  &__content {
    display: flex;
    flex: 1;
    line-height: .32rem;
    border-radius: .16rem;
    background-color:$search-bgColor;
    &__icon {
      width: 0.44rem;
      height: 0.32rem;
      text-align: center;
      color:$search-fontColor ;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      height: 0.32rem;
      border: none;
      outline: none;
      background: none;
      font-size: .14rem;
        color:$content-fontcolor;
      &::placeholder {
        color:$content-fontcolor;
      }
    }
  }
}
</style>
