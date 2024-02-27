<template>
  <div>

    <div class="flex items-center text-base cursor-pointer" @click="showChallenge = !showChallenge">
      <div>
        <!-- Caret Up -->
        <svg v-show="showChallenge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clip-rule="evenodd" />
        </svg>

        <!-- Caret Down -->
        <svg v-show="!showChallenge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
        </svg>
      </div>
      <p class="lg:flex lg:items-center">
        <h1 class="me-3 ms-1 text-sm lg:text-base" v-html="recolorAndAddBadge(header, 'text-amber')" />
        <span v-show="!showChallenge" v-for="week in challenges.map(obj => obj.week)" class="week-badge">{{ week }}</span>
      </p>
    </div>

    <ol v-show="showChallenge" class="ms-6">
      <li class="list-disc flex items-center m-1 text-sm lg:text-base" v-for="challenge in challenges">
        <p>
          <span class="week-badge">{{ challenge.week }}</span>
          <span v-html="recolorAndAddBadge(challenge.name,'text-amber')" />
        </p>
      </li>
    </ol>

  </div>
</template>

<script>
import database from '../assets/database.min.json'

export default {
  data() {
    return {
      showChallenge: false,
      recolorWords: database.recolor
    }
  },
  props: ['header', 'challenges'],
  methods: {
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
    }
  },
  computed: {
  }
}
</script>
