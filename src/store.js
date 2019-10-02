import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
import { increment } from 'vuex-easy-firestore'

Vue.use(Vuex)


import { Firebase, initFirebase } from '../firebaseConfig'
console.log('firebase', Firebase);

const myModule = {
  firestorePath: 'counter',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'firestoreCounter',
  statePropName: 'data',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {
    currentCount(state) {
      let returnValue = null
      console.log('state', state);
      if(state.data){
        Object.values(state.data).forEach((element) =>{
          console.log('element', element);
          if(typeof element.value === 'number'){
            returnValue = element.value;
          }
        })
      }
      return returnValue;
    }
  },
  mutations: {},
  actions: {
    incrementFirestoreCounter({dispatch, state}, value) {
      dispatch('patch', {id: Object.keys(state.data)[0], value: increment(value)})
    },
    setFirestoreCounterToZero({dispatch, state}){
      dispatch('patch', {id: Object.keys(state.data)[0], value: 0})
    },
    subscribeToCounter({dispatch}) {
      console.log('subscribing');
      dispatch('openDBChannel').catch(console.error)
    },
    unsubscribeToCounter({dispatch}) {
      dispatch('closeDBChannel', {clearModule: true})
    },
    easyFirestoreSetalueBatchSyncIncrement({dispatch}){
      dispatch('setFirestoreCounterToZero');
      dispatch('batchSync');
      dispatch('incrementFirestoreCounter', 1);
    },
    doBatchActionWithFirestoreCommands({state}){
      const id = Object.keys(state.data)[0]
      const db = Firebase.firestore()
      const increment = Firebase.firestore.FieldValue.increment
      console.log('id', id)

      var batch = db.batch();
      const ref = db.collection("counter").doc(id);
      batch.update(ref, {value: 3});
      batch.update(ref, {value: increment(10)})
      // Commit the batch
      batch.commit()
        .then(function () {
          console.log('batch commited')
        })
        .catch((error) =>{
          console.log('error', error);
        })

    }
  },
}

const easyFirestore = VuexEasyFirestore(
  [myModule],
  {logging: true, FirebaseDependency: Firebase}
)

export default new Vuex.Store({
  plugins: [easyFirestore],
  state: {
    counter: 1
  },
  mutations: {
    incrementCounter(state, incrementAmount){
      state.counter += incrementAmount
    }
  },
  actions: {
    incrementCounter({commit}, value){
      if((typeof value === 'number')){
        commit('incrementCounter', value);
      }
    }
  }
})


initFirebase()
  .catch(error => {
    console.log('error', error);
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
  })
