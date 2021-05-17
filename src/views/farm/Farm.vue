<template>
  <div class="w1300 farm">
    farm
  </div>
</template>

<script lang="ts">
  import {ref, defineComponent} from 'vue'

  export default defineComponent({
    name: 'Farm',
    props: {},
    setup: () => {
      const count = ref(0);
      return {count}
    }
  })
</script>

<style lang="scss">
  .farm {
    min-height: 800px;
  }
</style>
