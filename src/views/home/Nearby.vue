<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
    <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/Shopinfo'

const uesNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    } else {
      // showToast('登录失败')
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = uesNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/vinilables.scss';
.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color:$content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
