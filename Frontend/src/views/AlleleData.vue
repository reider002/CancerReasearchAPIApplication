<template>
  <div>
    <h1>Data Table</h1>
    <!-- Search input field -->
    <input type="text" v-model="searchQuery" placeholder="Search...">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredTableData" 
            :key="index" 
            class="table-row"
            @click="openLink(row)"
            style="cursor: pointer;">
            <td>{{ row.seqname }}</td>
            <td>{{ row.source }}</td>
            <td>{{ row.feature }}</td>
            <td>{{ row.start }}</td>
            <td>{{ row.end }}</td>
            <td>{{ row.score }}</td>
            <td>{{ row.strand }}</td>
            <td>{{ row.frame }}</td>
            <td>{{ row.hid }}</td>
            <td>{{ row.hstart }}</td>
            <td>{{ row.hend }}</td>
            <td>{{ row.genscan }}</td>
            <td>{{ row.gene_id }}</td>
            <td>{{ row.transcript_id }}</td>
            <td>{{ row.exon_id }}</td>
            <td>{{ row.gene_type }}</td>
            <td>{{ row.variation_name }}</td>
            <td>{{ row.probe_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        'seqname',
        'source',
        'feature',
        'start',
        'end',
        'score',
        'strand',
        'frame',
        'hid',
        'hstart',
        'hend',
        'genscan',
        'gene_id',
        'transcript_id',
        'exon_id',
        'gene_type',
        'variation_name',
        'probe_name',
      ],
      tableData: [],
      error: null,
      searchQuery: '', // Initialize the search query
    };
  },
  computed: {
    filteredTableData() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) {
        // If the query is empty, return all table data
        return this.tableData;
      }

      // Filter the table data based on the search query
      return this.tableData.filter(row => {
        return Object.values(row).some(value => {
          return String(value).toLowerCase().includes(query);
        });
      });
    },
  },
  mounted() {
    // Read the local text file
    this.readLocalTextFile('data.txt');
  },
  methods: {
    readLocalTextFile(filename) {
      // Use an XMLHttpRequest to read the local file
      const xhr = new XMLHttpRequest();
      xhr.open('GET', filename, true);

      xhr.onload = () => {
        if (xhr.status === 200) {
          const fileContent = xhr.responseText;
          // Parse the text content into rows
          const rows = fileContent.trim().split('\n');
          const tableData = [];

          // Parse each row into an object with the specified columns
          for (const row of rows) {
            const columns = row.split(',');
            if (columns.length === 18) { // Ensure all columns are present
              const rowData = {
                seqname: columns[0],
                source: columns[1],
                feature: columns[2],
                start: columns[3],
                end: columns[4],
                score: columns[5],
                strand: columns[6],
                frame: columns[7],
                hid: columns[8],
                hstart: columns[9],
                hend: columns[10],
                genscan: columns[11],
                gene_id: columns[12],
                transcript_id: columns[13],
                exon_id: columns[14],
                gene_type: columns[15],
                variation_name: columns[16],
                probe_name: columns[17],
              };
              tableData.push(rowData);
            }
          }

          // Set the parsed data to the tableData property
          this.tableData = tableData;
        } else {
          console.error('Failed to fetch file:', xhr.statusText);
          this.error = 'Failed to fetch the local file. Please check the file path.';
        }
      };

      xhr.onerror = () => {
        console.error('Error reading file:', xhr.statusText);
        this.error = 'Error reading the local file. Please check the file path.';
      };

      // Send the XMLHttpRequest to fetch the file
      xhr.send();
    },
    openLink(row) {
      // Construct the link based on the provided URL and row data
      const link = `https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${row.gene_id}`;
      //`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${row.gene_id};r=${seqname}:${start}-${end}`;
      
      // Open the link in a new tab or window
      window.open(link, '_blank');
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}

.table-container {
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f5f5f5;
}

tr:hover {
  background-color: #e0e0e0;
  transition: background-color 0.2s;
}

input[type="text"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
