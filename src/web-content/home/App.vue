<script setup lang="ts">
import {ref} from 'vue'

const title = ref<string>("home + Vue");
</script>

<template>
	<div>
    home {{title}}
  </div>
</template>

<style scoped>

</style>
