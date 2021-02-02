<template>
<div class="wrapper">
  <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
  <div class="wrapper__input">
    <input
    placeholder="请输入手机号"
    class="wrapper__input__content"
    type="text"
    v-model="username">
  </div>
  <div class="wrapper__input">
    <input
    placeholder="请输入密码"
    class="wrapper__input__content"
    type="password"
    v-model="password" />
  </div>
  <div class="wrapper__input">
    <input
    placeholder="确认密码"
    class="wrapper__input__content"
    type="password"
    v-model="ensurement"
    />
  </div>
  <div class="wrapper__regoster-button" @click="handleRegister">注册</div>
  <div class="wrapper__regoster-link" @click="handleLoginClick">已有账号去登录</div>
  <Toast v-if="show" :message='toactMessage' />
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        passwotd: data.password,
        ensurement: data.ensurement
      })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}
const useLoginClick = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'register',
  components: { Toast },
  setup () {
    const { show, toactMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginClick()
    return {
      handleLoginClick,
      username,
      password,
      ensurement,
      handleRegister,
      show,
      toactMessage
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../style/vinilables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    box-sizing: border-box;
    height: 0.48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background-color: #f9f9f9;
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: .06rem;
    &__content {
      line-height: .48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__regoster-button {
    margin: .32rem .4rem 0;
    line-height: .48rem;
    background-color: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0,145,255,0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
  }
  &__regoster-link {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: $content-notice-fontcolor;
    letter-spacing: 0;
    margin-top: .16rem;
    text-align: center;
  }
}
</style>
