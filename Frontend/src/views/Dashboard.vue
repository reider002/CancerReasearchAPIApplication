<template>
  <div>
    <h1>Data from HTML</h1>
    <div v-html="htmlData"></div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      htmlData: '',
      error: null,
    };
  },
  mounted() {
    // Make an HTTP GET request to the HTML URL
    axios.get('http://nov2020.archive.ensembl.org/Homo_sapiens/Export/Output/Gene?db=core;flank3_display=0;flank5_display=0;g=ENSG00000163898;output=csv;r=3:185506262-185552588;strand=feature;param=similarity;param=repeat;param=genscan;param=variation;param=gene;miscset_encode=yes;miscset_encode_excluded=yes;miscset_ABC=yes;miscset_tilepath=yes;miscset_CHORI-17=yes;miscset_WIBR-2=yes;miscset_RPCI-11=yes;_format=HTML')
      .then(response => {
        // Set the response HTML to the htmlData data property
        this.htmlData = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.error = 'Failed to fetch data. Please check the URL or try again later.';
      });
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
