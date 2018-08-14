import Vue from 'vue'
import Login from '@/pages/Login'

describe('Login.vue', () => {
   // Test goes here
   it('should be able to login', () => {
      // build component
      const Constructor = Vue.extend(Login)
      const LoginComponent = new Constructor().$mount()

      // set input value
      LoginComponent.loginDetails.email = 'komang.arinanda@gmail.com'
      LoginComponent.loginDetails.password = 'scm123'

      // simulate click event
      const button = LoginComponent.$el.querySelector('button')
      const clickEvent = new window.Event('click')
      button.dispatchEvent(clickEvent)
      LoginComponent._watcher.run()

      // assert result
      expect(LoginComponent.$el.querySelector('.alert').textContent)
         .toEqual('Login success!')
      expect(LoginComponent)
   })
})