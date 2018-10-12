<template lang="pug">
div
    image.logo(:src="logo")
    text.greeting(@click="go('/h')") The environment is ready!
    text.message Now, let's use Vue.js to build your Weex app1212
</template>
