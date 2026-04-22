<script setup lang="ts"></script>

<template>
  <div
    class="w-full h-[202px] rounded-[8px] border-[0.6px] border-black/10 bg-white relative overflow-hidden animate-pulse"
  >
    <div class="p-4 flex flex-col justify-between h-full">
      <!-- badges -->
      <div class="flex gap-1">
        <div class="h-[28px] w-[70px] bg-gray-200 rounded-full" />
        <div class="h-[28px] w-[80px] bg-gray-200 rounded-full" />
      </div>
      <!-- name -->
      <div class="h-[24px] w-[150px] bg-gray-200 rounded" />
    </div>
    <!-- picture placeholder -->
    <div class="absolute -right-7.5 -top-7.5 w-[140px] h-[140px] bg-gray-200 rounded-[8px]" />
  </div>
</template>

<style scoped></style>
