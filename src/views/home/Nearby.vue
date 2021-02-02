<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div
      class="nearby__item"
      v-for="item in nearbyList"
      :key="item.id"
      >
      <img class="nearby__item__img" :src="item.imgUrl" alt="">
      <div class="nearby__content">
        <div class="nearby__content__title">这是一个标题</div>
        <div class="nearby__content__tags">
          <span
          class="nearby__content__tag"
          v-for="(innerItem,innerIndex) in item.tags"
          :key="innerIndex"
          >{{innerItem}}</span>
        </div>
        <p class="nearby__content__highlight">{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    const nearbyList = [
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['标签', '标签', '标签'],
        desc: '这是一个高亮的内容'
      },
      {
        id: 2,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['标签', '标签', '标签'],
        desc: '这是一个高亮的内容'
      }
    ]
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
  &__item {
    display: flex;
    padding-top: .12rem;
    &__img {
      width: .56rem;
      height: .56rem;
      margin-right: .16rem;
    }
  }
  &__content {
    flex: 1;
    padding-bottom: .12rem;
    border-bottom: 1px solid $content-bgcolor;
    &__title {
      line-height: .2rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: .08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: .16rem;
    }
    &__highlight {
      color:red;
      line-height: 0.18rem;
      font-size: 0.13rem;
      margin: 0.08rem 0 0;
    }
  }
}
</style>
