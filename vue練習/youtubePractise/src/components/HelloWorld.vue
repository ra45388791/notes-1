<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="plus">count is: {{ count }}</button>
  <button type="button" @click="plusCount(3)">count plus 3: {{ count }}</button>
  <p>取得A模組的count:{{ GETTER_COUNT }}</p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex"
export default {

  data() {
    return {
      msg: "Hello world",
      // count: this.$store.state.count
    }
  },
  mounted() {
    // console.log(this.oddComputed);
    // console.log(this.$store)
  },
  computed: {
    // count: function () {
    //   return this.$store.state.count;
    // }
    ...mapState({
      count: 'count',
      title: 'title',
      content: 'content',
    }),
    ...mapGetters({
      oddComputed: 'oddComputed',  //vuex 計算屬性
      GETTER_COUNT: 'GETTER_COUNT',
    })

  },
  methods: {
    plus: function () {
      // this.$store.commit('increment')
      this.$store.dispatch('SET_COUNT')
        .then(function (event) {
          // console.log(event);
        })
    },
    ...mapMutations([
      'increment',    //普通更新
      'plusCount'     //加入參數更新
    ])



  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
