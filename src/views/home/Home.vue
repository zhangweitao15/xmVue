<template>
  <div>
    <div class="wrapper">
    <StaticPart />
    <Nearby />
    </div>
  <Docker />
  </div>
</template>

<script>
import StaticPart from '../home/StaticPart'
import Nearby from '../home/Nearby'
import Docker from '../home/Docker'
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y:auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  padding: 0 .18rem .1rem;
}
</style>
