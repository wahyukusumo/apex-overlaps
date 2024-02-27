<!-- Select input, can be use anywhere -->

<template>
  <!-- <badgeBR v-if="filter" @click="brOnlyChallenge" :class="{'opacity-40': filtered }" class="cursor-pointer" /> -->

  <div class="select-container">
    <select :value="modelValue" @input="updateValue" :class="{'text-stone-700 dark:text-stone-300':this.filter}" class="select">
      <option :value="''" disabled selected>Select challenge</option>
      <!-- For 5th challenge -->
      <option v-if="options[0].br" v-for="option in currentOptions" :value="option.br">{{ option.br }}</option>
      <!-- For challenge 6-11 -->
      <option v-else-if="options[0].name" v-for="option in currentOptions" :value="option.name">{{ option.name.replace('BR:', '') }}</option>
      <!-- For weapon challenge -->
      <option v-else v-for="option in options" :value="option">{{ option }}</option>
    </select>
    <!-- Remove Button -->
    <ButtonRemove @click="clearInput" :modelValue="modelValue" />
  </div>
</template>

<script>
import BadgeBR from './BadgeBR.vue'
import ButtonRemove from './ButtonRemove.vue'

export default {
  data() {
    return {
      filtered: false,
      currentOptions: this.options
    }
  },
  props: ['options', 'modelValue', 'filter'],
  components: { ButtonRemove, BadgeBR },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('change');
    },
    clearInput() {
      this.$emit('update:modelValue', null);
      this.$emit('change');
    },
    brOnlyChallenge() {
      if (this.filtered == true) {
        this.filtered = false
        this.currentOptions = this.filteredOptions
      } else {
        this.filtered = true
        this.currentOptions = this.anyChallOptions
      }
    }
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) => option.mode == 'BR')
    },
    anyChallOptions() {
      return this.options.filter((option) => option.mode == 'Any')
    }
  }
}
</script>

<style>
option {
  @apply text-stone-700
}
</style>