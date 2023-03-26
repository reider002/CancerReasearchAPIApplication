<template>
  <div class="shadow p-4 rounded-xl bg-white">
    Search by DNA Change or UUID:
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      test: 0
    }
  }
}

//TODO: add search function for API get - postman

/*import { ref } from "vue";
let input = ref("");
const searchID = ["placeholder"];
function filteredList() {
  return searchID.filter((searchID) =>
    searchID.toLowerCase().includes(input.value.toLowerCase())
  );
}*/
</script>
