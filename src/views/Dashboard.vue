<template>
  <div class="shadow p-4 rounded-xl bg-white">
    <input type="text" v-model="searchText" placeholder="DNA Change or UUID">
    <button @click="search" class="bg-slate-400 px-4 py-1 rounded-xl mb-4 hover:shadow-lg">Search</button>
    <ul>
      <li v-for="result in results" :key="result.id">{{ result.name }}</li>
    </ul>
    <div v-if="exonData">
      <h2>Exons for gene {{ selectedGene }}:</h2>
      <ul>
        <li v-for="exon in exonData" :key="exon.id">{{ exon.id }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchText: '',
      results: [],
      selectedGene: '',
      exonData: null,
    };
  },
  methods: {
    search() {
      //TODO: change placeholder URL, replace with parsed URL containing users search criteria
      axios.get('', {
        params: {
          q: this.searchText,
        },
      })
        .then(response => {
          this.results = response.data.results;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getExonData(geneId, start, end) {
      // Define the Ensembl REST API endpoint and parameters
      const ensemblApiUrl = "https://rest.ensembl.org";
      const exonDataEndpoint = `/overlap/region/human/${start}-${end}?feature=exon;feature=gene;content-type=application/json;gene=${geneId}`;

      // Send the GET request to the Ensembl REST API
      axios.get(ensemblApiUrl + exonDataEndpoint)
        .then(response => {
          // Parse the JSON response and extract the exon data
          const exonData = response.data;
          const exons = exonData.filter(exon => exon.feature_type === "exon");
          // Set the exon data and selected gene in the component's data
          this.exonData = exons;
          this.selectedGene = geneId;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>
