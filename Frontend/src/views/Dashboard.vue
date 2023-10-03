<template>
  <div>
    <!-- Your existing content here -->
    <input type="text" v-model="inputValue" placeholder="Enter text..." />
    <!-- Button to navigate to TargetComponent -->
    <button @click="navigateToTarget" style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Search</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToTarget() {
      // Use this.$router.push to navigate to the 'target' route
      this.$router.push({ name: 'alleleData' });
    }
  }
}
</script>