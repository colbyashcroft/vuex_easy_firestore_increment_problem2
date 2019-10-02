<template>
  <div class="hello">
    <!-- <h1>Vuex Only Counter</h1>
    <h2> Count: {{counter}}</h2>
    <div><button @click="incrementCounter(1)">Increment</button></div> -->
    <h1>EasyFirestore Counter</h1>
    <h2> Count: {{currentCount}}</h2>
    <div>
      <button @click="incrementFirestoreCounter(1)">Increment</button>
      <button @click="setFirestoreCounterToZero">Reset</button>
    </div>
  <div>
    <button @click="doBatchActionWithFirestoreCommands">Batch Firestore</button>
  </div>
  <div>
    <button @click="easyFirestoreSetalueBatchSyncIncrement">EasyFirestore with batchSync</button>
  </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  name: 'HelloWorld',
  props: {},
  computed: {
    ...mapState(['counter']),
    ...mapGetters('firestoreCounter', ['currentCount'])
  },
  methods: {
    ...mapActions(['incrementCounter']),
    ...mapActions('firestoreCounter', ['incrementFirestoreCounter',
     'subscribeToCounter',
      'unsubscribeToCounter',
       'setFirestoreCounterToZero',
        'doBatchActionWithFirestoreCommands',
        'easyFirestoreSetalueBatchSyncIncrement'])
  },
  mounted(){
    console.log('this', this);
    this.subscribeToCounter();
  },
  destroyed(){
    this.unsubscribeToCounter();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
