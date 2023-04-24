<template>
  <!--HTML-->
  <div class="shadow p-4 rounded-xl bg-white">
    <button @click="exportExonData" class="bg-slate-400 px-4 py-1 rounded-xl mb-4 hover:shadow-lg">Export Exon Data</button>
    <div v-if="exonData">
      <h2>Exons for gene {{ selectedGene }}:</h2>
      <ul>
        <li v-for="exon in exonData" :key="exon.id">{{ exon.id }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
//Javascrpt
import axios from 'axios';
//import XLSX from 'xlsx'; - causes crash?

export default {
  name: 'ExonData',
  data() {
    return {
      exonData: null,
      selectedGene: 'TP53',
    };
  },
  methods: {
    async exportExonData() {
      try {
        const response = await axios.get(`https://rest.ensembl.org/overlap/id/a9671ce1-921e-5f6e-ab41-a4ce9d2f4343?feature=exon;content-type=application/json`);
        const exons = response.data.map((exon) => ({
          id: exon.id,
          start: exon.start,
          end: exon.end,
        }));
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exons);
        XLSX.utils.book_append_sheet(wb, ws, 'Exon Data');
        XLSX.writeFile(wb, 'exon_data.xlsx');
        alert('Exon data exported successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to export exon data.');
      }
      console.log('Getting exon data from server...');
      const response = await axios.get(`https://rest.ensembl.org/overlap/id/a9671ce1-921e-5f6e-ab41-a4ce9d2f4343?feature=exon;content-type=application/json`);
    console.log('Exon data retrieved:', response.data);

    },
  },
};
</script>

<style>
/*CSS*/
</style>