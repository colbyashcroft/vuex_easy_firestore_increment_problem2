<template>
  <div class="hello">
    <!-- <h1>Vuex Only Counter</h1>
    <h2> Count: {{counter}}</h2>
    <div><button @click="incrementCounter(1)">Increment</button></div> -->
    <h1>EasyFirestore Books List</h1>
    <table style="margin: 0px auto;" class="zui-table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Book Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in currentBooks" :key="book.id">
          <th>{{book.order}}</th>
          <th>{{book.title}}</th>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="resetBooksList">Reset</button>
    </div>
  <div>
    <button @click="addBookOrder1">Add Book Order 1</button>
  </div>
  <div>
    <button @click="editTitleOrder0">Edit Title Order 0</button>
  </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  name: 'HelloWorld',
  props: {},
  computed: {
    ...mapGetters('booksList', ['currentBooks'])
  },
  methods: {
    ...mapActions('booksList', ['subscribeToBooksList',
      'unsubscribeToBooksList',
      'resetBooksList',
      'addBookOrder1',
      'editTitleOrder0'])
  },
  mounted(){
    console.log('this', this);
    this.subscribeToBooksList();
  },
  destroyed(){
    this.unsubscribeToBooksList();
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

.zui-table {
    border: solid 1px #DDEEEE;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
}
.zui-table thead th {
    background-color: #DDEFEF;
    border: solid 1px #DDEEEE;
    color: #336B6B;
    padding: 10px;
    text-align: left;
    text-shadow: 1px 1px 1px #fff;
}
.zui-table tbody td {
    border: solid 1px #DDEEEE;
    color: #333;
    padding: 10px;
    text-shadow: 1px 1px 1px #fff;
}
</style>
