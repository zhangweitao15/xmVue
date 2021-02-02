<template>
<div class="docker">
  <span
    v-for="(item,index) in dockerList"
    :class="{'docker__item':true,'docker__item--active':index === 0}"
    class="docker__item"
    :key="index"
    >
    <div
      class="iconfont"
      v-html="item.icon" />
    <div
    class="docker__title">{{item.text}}</div>
  </span>
</div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe619;', text: '首页' },
      { icon: '&#xe603;', text: '购物车' },
      { icon: '&#xe61f;', text: '订单' },
      { icon: '&#xe640;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/vinilables.scss';
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: .01rem solid $content-bgcolor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: .18rem;
      margin: .07rem 0 .02rem 0;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: .2rem;
    transform: scale(.5, .5);
    transform-origin: center top;
  }
  color: $content-fontcolor;
}
</style>
