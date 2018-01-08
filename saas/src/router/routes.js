import HelloWorld from '@/components/HelloWorld'
const signIn = r => require.ensure([], () => r(require('@/components/signIn')), 'signIn');

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }
]

var config = {

}

export default routes