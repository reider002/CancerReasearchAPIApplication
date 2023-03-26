<template>
    <div class="shadow p-4 rounded-xl bg-white">
      TCGA Mutations from search:
    <table>
      <thead>
        <tr>
          <th>Consequence Type</th>
          <th>Gene Symbol</th>
          <th>Gene ID</th>
          <th>AA Change</th>
          <th>Annotation</th>
          <th>Mutation Subtype</th>
          <th>SSM ID</th>
          <th>Genomic DNA Change</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Json" :key="item.ssm_id">
          <td>{{ item.consequence.transcript.consequence_type }}</td>
          <td>{{ item.consequence.transcript.gene.symbol }}</td>
          <td>{{ item.consequence.transcript.gene.gene_id }}</td>
          <td>{{ item.consequence.transcript.aa_change }}</td>
          <td>{{ item.consequence.transcript.annotation }}</td>
          <td>{{ item.mutation_subtype }}</td>
          <td>{{ item.ssm_id }}</td>
          <td>{{ item.genomic_dna_change }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </template>

  
  <script>
  //import json from local
  import json from 'C:/Users/Ashley/Documents/PersonalProject/CancerReasearchAPIApplication/Json/mutations.2023-03-26.json'
  export default {
    name: 'AlleleData',
    data: function() {
      return {
        Json: json.Json, //passing array data into Vue
      };
    },
    mounted: function() {
        //checking it works
        console.log(this.Json);
    }
  }
  </script>
  