<template>
  <topology-layout :is-callback="true"/>
</template>

<script>
  import TopologyLayout from './index'

  export default {
    name: 'TopologyView',
    components: {
      TopologyLayout
    }
  };
</script>
<style lang="scss" scoped>

</style>
