<template>
<div class="wrapper">
  <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
  <div class="wrapper__input">
    <input
    placeholder="请输入手机号"
    class="wrapper__input__content"
    type="text"
    v-model.trim="username"
    />
  </div>
  <div class="wrapper__input">
    <input
    placeholder="请输入密码"
    class="wrapper__input__content"
    type="password"
    v-model.trim="password"
    />
  </div>
  <div class="wrapper__login-button" @click="handleLogin">登录</div>
  <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
  <Toast v-if="show" :message='toactMessage' />
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (!username) {
        showToast('账号不能为空')
        return false
      } else if (!password) {
        showToast('密码不能为空')
        return false
      }
      const result = await post('/api/user/login', {
        username: data.username,
        passwotd: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { show, toactMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()
    return {
      username,
      password,
      handleLogin,
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
  &__login-button {
    margin: .32rem .4rem 0;
    line-height: .48rem;
    background-color: $btnColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0,145,255,0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color:$bgColor;
    font-size: .16rem;
    text-align: center;
  }
  &__login-link {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: $content-notice-fontcolor;
    letter-spacing: 0;
    margin-top: .16rem;
    text-align: center;
  }
}
</style>
