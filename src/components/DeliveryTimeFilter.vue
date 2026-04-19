<script setup lang="ts">
const { layout = 'horizontal' } = defineProps<{
  layout?: 'horizontal' | 'vertical'
}>()
const deliveryTimes = ['0-10 min', '10-30 min', '30-60 min', '1 hour+']
</script>

<template>
  <div>
    <h3
      :class="layout === 'horizontal' ? 'mb-[10px]' : 'mb-[4]'"
      class="text-[12px] font-[590] leading-none tracking-[-0.5px] uppercase opacity-40"
    >
      Delivery time
    </h3>
    <div :class="layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col'" class="gap-2.5">
      <button
        v-for="time in deliveryTimes"
        :key="time"
        class="h-[31px] py-2 px-3 rounded-lg border-[0.6px] border-black/10 bg-white card-shadow cursor-pointer text-[12px] font-normal leading-[125%] tracking-[-0.5px]"
      >
        {{ time }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
