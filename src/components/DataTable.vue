<template>
  <div class="overflow-x-auto p-4">

    <select v-model="tableSort" class="select sort-select my-2">
      <option value="name">Challenge Name (A-Z)</option>
      <option value="challenges">Total Challenges</option>
      <option value="rewards">Highest Rewards</option>
    </select>

    <table class="min-w-full divide-y-2 divide-stone-800 bg-stone-200 dark:divide-stone-200 dark:bg-stone-800 text-base">
      <thead>
        <tr>
          <th v-for="field, index in fields" class="whitespace-nowrap px-4 py-2 font-semibold text-stone-800 dark:text-stone-200 text-left">
            {{ field }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-stone-800 dark:divide-stone-200">
        <tr v-if="type != 'legend'" v-for="item, index in tableSorting()" :key="item">
          <td class="w-10">{{ index + 1 }}</td>
          <td class="max-w-96 2xl:whitespace-nowrap" v-html="recolorAndAddBadge(item[0].name, 'text-amber')" />
          <td class="flex flex-col gap-1 lg:flex-row lg:gap-0"><span v-for="week in item.map(obj => obj.week)" class="week-badge">{{ week }}</span></td>
          <td>{{ starsAndLevel(item) }}</td>
        </tr>

        <tr v-if="type == 'legend' && items.length > 0" v-for="item, index in items">
          <td class="w-10">{{ index }}</td>
          <td class="">
            <img v-bind:src="`./potraits/Portrait_${item.legend}_square.webp`" :width="50">
            {{ item.legend }}
          </td>
          <td><p v-for="challenge in item.challenges">{{ challenge.name }}</p></td>
          <td class="flex flex-col gap-1 lg:flex-row lg:gap-0"><span v-for="week in item.map(obj => obj.week)" class="week-badge">{{ week }}</span></td>
          <td></td>
        </tr>

        <tr v-if="items.length === 0">
          <td :colspan="fields.length" class="text-center">- No overlaps found - </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import Accordion from './Accordion.vue'
import database from '../assets/database.min.json'

export default {
  data() {
    return {
      recolorWords: database.recolor,
      tableSort: 'rewards',
    }
  },
  props: ['fields', 'items', 'type'],
  components: { Accordion },
  methods: {
    recolorString(inputString, classColor){
      // const legendClasses = this.legendClasses.map(obj => obj.class)
      // const wordsToHighlight = ['\\(n\\)', '\\[weapon\\]', '\\[legends\\]', 'legend'].concat(this.legends, this.weapons, legendClasses)
      const wordsToHighlight = this.recolorWords.map(word => '\\b' + word + '\\b') // Word boundaries
      const wordRegex = new RegExp(wordsToHighlight.join('|'), 'gi');
      const numberRegex = /\b\d+\b/g // Matches whole numbers

      let highlightNumber = inputString.replace(numberRegex, match => `<span class="${classColor}">${match}</span>`) // Highlight number
      let highlightWords = highlightNumber.replace(wordRegex, match => `<span class="${classColor}">${match}</span>`) // Highlight words

      return highlightWords
    },
    recolorAndAddBadge(inputString, classColor) {
      const regex = /\b(BR:|NBR:)\b/gi;

      const badgeBR = `<span class="br-badge">BR</span>`
      const badgeNBR = `<span class="nbr-badge">NBR</span>`

      let newString = this.recolorString(inputString, classColor)

      return newString.replace(regex, (match) => match === 'BR:' ? badgeBR : badgeNBR)
    },
    starsAndLevel(item) {
      const stars = item.reduce((accumulator, currentValue) => accumulator + currentValue.stars, 0)
      const levels = stars/10
      const reward = `+${stars}☆`
      return reward
    },
    highlightBadge(event) {
      const badges = document.querySelectorAll('span')
      const targetText = event.target.textContent
      badges.forEach(p => {
        if (p.textContent === targetText) {
          p.style.backgroundColor = 'green'; // Highlight the element
        }
      })
    },
    tableSorting() {
      switch(this.tableSort) {
        case 'name':
          return this.items.sort((a, b) => a[0].name.localeCompare(b[0].name))
        case 'challenges':
          return this.items.sort((a, b) => b.length - a.length)
        case 'rewards':
          return this.items.sort((a, b) => b.reduce((accumulator, currentValue) => accumulator + currentValue.stars, 0) - a.reduce((accumulator, currentValue) => accumulator + currentValue.stars, 0))
      }
    }
  },
  computed: {
  }
}
</script>

<style>
td {
  @apply px-4 py-2 text-stone-800 dark:text-stone-200
}

tbody tr {
  @apply odd:bg-stone-300 dark:odd:bg-stone-900
}
</style>