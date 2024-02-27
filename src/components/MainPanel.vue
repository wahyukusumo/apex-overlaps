<template>

  <div class="grid grid-cols-4 bg-stone-200 dark:bg-stone-800 mb-4">
    <button :class="{'bg-pink-600 text-white dark:text-white': currentPanel === title}"
    class="uppercase lg:p-4 text-stone-600 dark:text-stone-400 dark:hover:text-stone-200 text-center font-semibold hover:bg-pink-400"
    @click="chooseTab(title)" v-for="title in overlapTitles">
      {{ title }}
    </button>
  </div>

  <div v-if="currentPanel == 'Home'" class="flex justify-end">
    <div class="text-stone-500 flex flex-col xl:flex-row items-center">
      <div class="mx-10">
        <h1 class="text-[2rem] xl:text-[3.5rem] 2xl:text-[6rem] uppercase font-semibold">Apex Overlaps</h1>
        <p class="xl:text-lg 2xl:text-xl">
          Apex Overlaps is a free tool that will help you find overlaps in your Apex Legends weekly challenges.
          This tool will find and separate challenge overlaps based on
          <span class="underline decoration-pink-600 font-semibold">legends</span>,
          <span class="underline decoration-pink-600 font-semibold">weapons</span>,
          <span class="underline decoration-pink-600 font-semibold">battle royale mode</span>, and
          <span class="underline decoration-pink-600 font-semibold">challenges that can be completed in any mode</span>.
        </p>
      </div>
      <img src="../assets/hound.png" class="opacity-50 ml-auto xl:w-[600px] 2xl:w-[800px] mt-10 xl:mt-0" alt="">
    </div>
  </div>

  <!-- Legends Overlap Tab -->
  <div v-if="currentPanel == 'Legends Overlap'">
    <select v-model="legendsSort" class="select sort-select">
      <option value="legends">Legends Name (A-Z)</option>
      <option value="challenges">Total Challenges</option>
      <option value="rewards">Highest Rewards</option>
    </select>
    <ChallengeCard v-for="legend in sortLegendChallenges(overlap.legendChallenges)" :item="legend" type="legends" />
  </div>

  <!-- Weapons Overlap Tab -->
  <div v-if="currentPanel == 'Weapons Overlap'">
    <select v-model="weaponsSort" class="select sort-select">
      <option value="weapons">Weapons Type (A-Z)</option>
      <option value="challenges">Total Challenges</option>
      <option value="rewards">Highest Rewards</option>
    </select>
    <ChallengeCard v-for="weapon in sortWeaponChallenges(overlap.weaponChallenges)" :item="weapon" type="weapons" />
  </div>

  <div v-if="currentPanel == 'Others Overlap'">
    <DataTable :fields="['#', 'Battle Royal Only Challenge', 'Weeks', 'Total Reward']" :items="overlap.BRChallenges"></DataTable>
    <DataTable :fields="['#', 'Any Mode Challenge', 'Weeks', 'Total Reward']" :items="overlap.unspecificChallenges"></DataTable>
  </div>
</template>

<script>
import Accordion from './Accordion.vue'
import ChallengeCard from './ChallengeCard.vue'
import DataTable from './DataTable.vue'
import OverlapTab from './OverlapTab.vue'

export default {
  data() {
    return {
      currentPanel: 'Home',
      overlapTitles: ['Home', 'Legends Overlap', 'Weapons Overlap', 'Others Overlap'],
      legendsSort: 'rewards',
      weaponsSort: 'rewards'
    }
  },
  props: ['overlap', 'emitEvent'],
  components: { Accordion, ChallengeCard, OverlapTab, DataTable },
  methods: {
    chooseTab(title) {
      this.currentPanel = title
    },
    sortTotalChallenges(challengesArray) {
      return challengesArray.sort((a, b) => b.challenges.flat(Infinity).length - a.challenges.flat(Infinity).length)
    },
    sortTotalRewards(challengesArray) {
      return challengesArray.sort((a, b) => b.challenges.flat(Infinity).reduce((accumulator, currentValue) => accumulator + currentValue.stars, 0) - a.challenges.flat(Infinity).reduce((accumulator, currentValue) => accumulator + currentValue.stars, 0))
    },
    sortLegendChallenges(challengesArray) {
      switch(this.legendsSort) {
        case 'legends':
          return challengesArray.sort((a, b) => a.legend.localeCompare(b.legend))
        case 'challenges':
          return this.sortTotalChallenges(challengesArray)
        case 'rewards':
          return this.sortTotalRewards(challengesArray)
      }
    },
    sortWeaponChallenges(challengesArray) {
      switch(this.weaponsSort) {
        case 'weapons':
          return challengesArray.sort((a, b) => a.weapon.localeCompare(b.weapon))
        case 'challenges':
          return this.sortTotalChallenges(challengesArray)
        case 'rewards':
          return this.sortTotalRewards(challengesArray)
      }
    }
  },
  computed: {
  },
}
</script>

<style>
.sort-select {
  @apply text-stone-800 dark:text-stone-200 border border-stone-600 p-2 mx-2
}
</style>