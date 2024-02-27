<!-- class="grid grid-cols-1 md:grid-cols-12 gap-2 overflow-hidden text-white font-medium m-1 border border-stone-700 bg-stone-900 p-2 shadow-sm"> -->
<template>
  <div :class="{ 'border-stone-950 dark:border-stone-50': isFill }"
    class="flex items-center gap-2 p-2 shadow-sm overflow-hidden font-medium m-1 border standard-box">

    <div class="flex flex-col gap-1">
      <div class="flex basis-full flex-wrap items-center gap-1">
        <slot></slot>
      </div>

      <div v-if="this.$slots.slotBR" class="flex basis-full flex-wrap items-center gap-1">
        <BadgeBR/> <slot name="slotBR"></slot>
      </div>

      <div v-if="this.$slots.slotNBR" class="flex basis-full flex-wrap items-center gap-1">
        <div class="overflow-auto whitespace-normal">
          <BadgeNBR/>
          <slot name="slotNBR"></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BadgeBR from './BadgeBR.vue'
import BadgeNBR from './BadgeNBR.vue'

export default {
  props: ['isFill'],
  components: { BadgeBR, BadgeNBR }
}
</script>