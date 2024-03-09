<template>
  <div class="flex flex-wrap items-center gap-2 mx-2">
    <!-- Select Legend 1 -->
    <div class="select-container">

      <img :src="selectedLegend1 ? `./potraits/Portrait_${selectedLegend1}_square.webp` : `./dummy.png`" :width="imgWidth">

      <select :value="selectedLegend1" class="select"
        @input="this.$emit('update:selectedLegend1', $event.target.value)" @change="$emit('saved')">
        <option :value="''" disabled selected>Select legend</option>
        <option v-for="legend in legends" :value="legend">
          {{ legend }}
        </option>
      </select>
      <!-- Remove Button -->
      <ButtonRemove @click="clearInput('update:selectedLegend1')" :modelValue="selectedLegend1" />
    </div>

    <!-- Select Legend 2 -->
    <div :class="['select-container', {'opacity-60': !selectedLegend1}]">

      <img :src="selectedLegend2 ? `./potraits/Portrait_${selectedLegend2}_square.webp` : `./dummy.png`" :width="imgWidth">

      <select :value="selectedLegend2" class="select" :disabled="selectedLegend1 == null"
        @input="this.$emit('update:selectedLegend2', $event.target.value)" @change="$emit('saved')">
        <option :value="''" disabled selected>Select legend</option>
        <option v-for="legend in legends.filter(e => e !== selectedLegend1)" :value="legend">
          {{ legend }}
        </option>
      </select>
      <!-- Remove Button -->
      <ButtonRemove @click="clearInput('update:selectedLegend2')" :modelValue="selectedLegend2" />
    </div>

    <!-- Select Legend 3 -->
    <div :class="['select-container', {'opacity-60': !selectedLegend2}]">

      <img :src="selectedLegend3 ? `./potraits/Portrait_${selectedLegend3}_square.webp` : `./dummy.png`" :width="imgWidth">

      <select :value="selectedLegend3" class="select" :disabled="selectedLegend2 == null"
        @input="this.$emit('update:selectedLegend3', $event.target.value)" @change="$emit('saved')">
        <option :value="''" disabled selected>Select legend</option>
        <option v-for="legend in legends.filter(e => e !== selectedLegend1).filter(e => e !== selectedLegend2)" :value="legend">
          {{ legend }}
        </option>
      </select>
      <!-- Remove Button -->
      <ButtonRemove @click="clearInput('update:selectedLegend3')" :modelValue="selectedLegend3" />
    </div>

    <button @click="clearAllLegends()" class="select-container font-semibold">
      Clear All
    </button>
  </div>
</template>

<script>
import database from '../assets/database.json'
import ButtonRemove from './ButtonRemove.vue'

export default {
  data() {
    return {
      legends: database.legends,
      imgWidth: 22
    }
  },
  methods: {
    clearInput(update) {
      this.$emit(update, null);
      this.$emit('saved');
    },
    clearAllLegends() {
      this.$emit('update:selectedLegend1', null);
      this.$emit('update:selectedLegend3', null);
      this.$emit('update:selectedLegend2', null);
      this.$emit('saved');
    }
  },
  props: ['selectedLegend1', 'selectedLegend2', 'selectedLegend3'],
  components: { ButtonRemove }
}
</script>