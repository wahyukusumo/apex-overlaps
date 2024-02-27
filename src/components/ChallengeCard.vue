<template>
  <div class="flex flex-col gap-2 m-2 border standard-box" v-if="totalChallenges(item.challenges) > 1">

    <div class="flex items-center justify-between 2xl:px-20 bg-stone-200 dark:bg-stone-800">

      <div class="flex flex-row items-center basis-1/2 lg:basis-1/5 gap-3 mx-2">
        <img v-if="type == 'legends'" v-bind:src="`./potraits/Portrait_${item.legend}_square.webp`" :width="50">
        <h2 class="font-semibold text-base">{{ item.legend }}</h2>
        <h2 class="font-semibold text-base">{{ item.weapon }}</h2>
      </div>

      <h1 class="hidden lg:block font-semibold text-base cursor-pointer" @click="showChallenges = !showChallenges">Challenges</h1>

      <div class="basis-1/5 mx-2">
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
          </svg>
          <span class="hidden lg:block">Total Challenge: </span>
          {{ totalChallenges(item.challenges) }}
        </div>

        <p class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
          </svg>
          <span class="hidden lg:block">Total Reward: </span>
          {{ starsAndLevel(item) }}
        </p>
      </div>
    </div>

    <!-- Challenges list -->
    <div v-show="showChallenges" class="mx-2 xl:mx-20 py-2">
      <div v-for="chall in item.challenges">

        <Accordion v-if="chall.length > 1" :header="accordionHeader(chall[0])" :challenges="chall" />

        <ol v-else>
          <li class="flex items-center m-1 text-sm lg:text-base">
            <p>
              <span class="week-badge">{{ chall[0].week }}</span>
              <span v-html="recolorAndAddBadge(chall[0].name, 'text-amber')" />
            </p>
          </li>
        </ol>

      </div>
    </div>
  </div>
</template>

<script>
import Accordion from './Accordion.vue'
import database from '../assets/database.min.json'

export default {
  data() {
    return {
      showChallenges: true,
      challenges: database.challenges,
      recolorWords: database.recolor
    }
  },
  props: ['item', 'type'],
  components: { Accordion },
  methods: {
    totalChallenges(challenges) {
      return challenges.flat(Infinity).length
    },
    recolorString(inputString, classColor){
      // const legendClasses = this.legendClasses.map(obj => obj.class)
      // const wordsToHighlight = ['\\(n\\)', '\\[weapon\\]', '\\[legends\\]', 'legend'].concat(this.legends, this.weapons, legendClasses)
      const wordsToHighlight = this.recolorWords
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
      const stars = item.challenges.flat(Infinity).reduce((accumulator, currentValue) => accumulator + currentValue.stars, 0)
      const levels = stars/10
      const reward = `+${stars}☆`
      return reward
    },
    accordionHeader(challenge) {
      return this.challenges.find(c => c.id === challenge.id).name
    }
  },
  computed: {
  }
}
</script>
