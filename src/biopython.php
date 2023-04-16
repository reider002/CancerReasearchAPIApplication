<template>
  <div>
    <button @click="runBiopython()">Run Biopython</button>
    <div v-if="biopythonResult">
      {{ biopythonResult }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      biopythonResult: null
    };
  },
  methods: {
    runBiopython() {
        //TODO: replace api call with correct endpoint from Flask Biopython connection
      axios.get('/api/biopython').then(response => {
        this.biopythonResult = response.data.result;
      }).catch(error => {
        console.error(error);
      });
    }
  }
};
</script>
