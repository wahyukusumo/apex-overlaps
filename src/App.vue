<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-6 p-3 pb-20 lg:pb-0">

    <!-- Grid 1 -- Sidebar -->
    <div class="fixed lg:relative z-40 bg-stone-50 dark:bg-stone-950 px-4 pr-10 lg:pr-0 h-screen top-0 pt-10 lg:pt-0 lg:h-auto w-screen lg:w-auto"
    :class="[{ 'hidden lg:block': sidebarView }, { 'lg:block': !sidebarView }]">
      <!-- Sidebar Container -->
      <div>
        <!-- Overlaps Button -->
        <div class="my-2">
          <div @click="calculateOverlap" class="side-menu" :class="{'side-menu-selected': overlapView }">
            <p>Overlaps</p>
          </div>
        </div>
        <!-- Weeks Buttons -->
        <div v-for="i in 12" class="my-2">
          <input type="radio" :name="`WeekOption${i}`" :value="`Week ${i}`" :id="`week${i}`" class="peer hidden" v-model="currentWeek" v-on:change="fetchAndPopulateForm(currentWeek)" />
          <label @click="chooseWeek" :for="`week${i}`" class="side-menu" :class="{ 'peer-checked:side-menu-selected': !overlapView }">
          <p>Week {{ i }} <span class="font-normal">{{ challengesCount(`Week ${i}`) }}</span></p>
          </label>
        </div>
      </div>
      <ApexButton class="hidden lg:inline-block" @click="toggleTheme">Theme</ApexButton>
    </div>

    <!-- Grid 2 -- Main -->
    <div v-show="!overlapView" class="main-panel">
      <h1 class="lg:hidden text-stone-200 text-center font-semibold text-xl my-4">{{ currentWeek }}</h1>

      <!-- Challenge 1 -->
      <Card :isFill="currentWeekChallenges.values.challenge1.legend3">
        <span v-html="recolorString('Play 12 matches as', textPink)" />
        <!-- Select Legends -->
        <PickLegends @saved="saved"
        v-model:selectedLegend1="currentWeekChallenges.values.challenge1.legend1"
        v-model:selectedLegend2="currentWeekChallenges.values.challenge1.legend2"
        v-model:selectedLegend3="currentWeekChallenges.values.challenge1.legend3" />
      </Card>

      <!-- Challenge 2 -->
      <Card :isFill="currentWeekChallenges.values.challenge2">
        <template #slotBR>
          <span class="me-1" v-html="weaponChallengeString('damage', 'br')" />
          <!-- Select Weapons -->
          <InputSelect v-model="currentWeekChallenges.values.challenge2" :options="weapons.slice(0, 7)" v-on:change="saved" />
        </template>
        <template #slotNBR>
          <span v-html="weaponChallengeString('damage', 'nbr')" />
        </template>
      </Card>

      <!-- Challenge 3 -->
      <Card :isFill="currentWeekChallenges.values.challenge3.legend3">
        <template #slotBR>
          <span v-html="recolorString('Deal 5000 damage as', textPink)" />
          <PickLegends @saved="saved"
          v-model:selectedLegend1="currentWeekChallenges.values.challenge3.legend1"
          v-model:selectedLegend2="currentWeekChallenges.values.challenge3.legend2"
          v-model:selectedLegend3="currentWeekChallenges.values.challenge3.legend3" />
        </template>

        <template #slotNBR>
          <span v-html="recolorString(`Deal 10000 damage as ${showLegends(currentWeekChallenges.values.challenge3.legend1,
            currentWeekChallenges.values.challenge3.legend2,
            currentWeekChallenges.values.challenge3.legend3)}`, textCyan)" />
        </template>
      </Card>

      <!-- Challenge 4 -->
      <Card :isFill="currentWeekChallenges.values.challenge4">
        <template #slotBR>
          <span class="me-1" v-html="weaponChallengeString('knockdowns', 'br')" />
          <!-- Select Weapons -->
          <InputSelect v-model="currentWeekChallenges.values.challenge4" :options="weapons.slice(0, 7)" v-on:change="saved" />
        </template>
        <template #slotNBR>
          <span v-html="weaponChallengeString('knockdowns', 'nbr')" />
        </template>
      </Card>

      <!-- Challenge 5 -->
      <Card :isFill="currentWeekChallenges.values.challenge5.challenge">
        <template #slotBR>
          <InputSelect v-model="currentWeekChallenges.values.challenge5.challenge" :options="challengeGroups.group5" v-on:change="saved" />
          <!-- Select Legends -->
          <PickLegends v-if="currentWeekChallenges.values.challenge5.challenge == 'Get 15 kills as [legends]'"
          v-model:selectedLegend1="currentWeekChallenges.values.challenge5.legend1"
          v-model:selectedLegend2="currentWeekChallenges.values.challenge5.legend2"
          v-model:selectedLegend3="currentWeekChallenges.values.challenge5.legend3"
          @saved="saved" />
        </template>

        <template #slotNBR>
          <span v-if="currentWeekChallenges.values.challenge5.challenge" v-html="fifthChallengeNBR(
            challengeGroups.group5.filter((attr) => attr.br == currentWeekChallenges.values.challenge5.challenge)[0],
            currentWeekChallenges.values.challenge5.legend1, currentWeekChallenges.values.challenge5.legend2,
            currentWeekChallenges.values.challenge5.legend3)" />
        </template>
      </Card>

      <!-- Challenge 6 -->
      <Card :isFill="currentWeekChallenges.values.challenge6">
        <InputSelect :filter="true" v-model="currentWeekChallenges.values.challenge6" :options="challengeGroups.group67" v-on:change="saved" />
      </Card>

      <!-- Challenge 7 -->
      <Card :isFill="currentWeekChallenges.values.challenge7">
        <InputSelect :filter="true" v-model="currentWeekChallenges.values.challenge7" :options="challengeGroups.group67" v-on:change="saved" />
      </Card>

      <!-- Challenge 8 -->
      <Card :isFill="currentWeekChallenges.values.challenge8">
        <InputSelect :filter="true" v-model="currentWeekChallenges.values.challenge8" :options="challengeGroups.group811" v-on:change="saved" />
      </Card>

      <!-- Challenge 9 -->
      <Card :isFill="currentWeekChallenges.values.challenge9">
        <InputSelect :filter="true" v-model="currentWeekChallenges.values.challenge9" :options="challengeGroups.group811" v-on:change="saved" />
      </Card>

      <!-- Challenge 10 -->
      <Card :isFill="currentWeekChallenges.values.challenge10">
        <InputSelect :filter="true" v-model="currentWeekChallenges.values.challenge10" :options="challengeGroups.group811" v-on:change="saved" />
      </Card>

      <!-- Challenge 11 -->
      <Card :isFill="currentWeekChallenges.values.challenge11">
        <InputSelect :filter="true" v-model="currentWeekChallenges.values.challenge11" :options="challengeGroups.group811" v-on:change="saved" />
      </Card>

      <Modal :week="currentWeek" @some-event="removeCurrentWeek" />
    </div>

    <!-- Grid 3 -->
    <div v-show="overlapView" class="main-panel">
      <MainPanel :emitEvent="recolorString" :overlap="myOverlaps" />
    </div>

  </div>

  <BottomNav @toggle-theme="toggleTheme" @show-weeks="sidebarView = !sidebarView" />

</template>

<script>
import database from './assets/database.min.json'

import ApexButton from './components/ApexButton.vue'
import BottomNav from './components/BottomNav.vue'
import Card from './components/Card.vue'
import ChallengeCard from './components/ChallengeCard.vue'
import DataTable from './components/DataTable.vue'
import InputSelect from './components/InputSelect.vue'
import MainPanel from './components/MainPanel.vue'
import Modal from './components/Modal.vue'
import PickLegends from './components/PickLegends.vue'

export default {
  data() {
    return {
      overlapTitles: ['Dashboard', 'Legends Overlap', 'Weapons Overlap', 'Battle Royal Overlap', 'Unspecific Overlap'],
      sidebarView: false,
      overlapView: true,
      currentWeek: 'Week 1',

      currentWeekChallenges: null,

      challenges: database.challenges,
      challengeGroups: [],
      legends: database.legends,
      legendClasses: database.legendClasses,
      weapons: database.weapons,
      recolorWords: database.recolor,

      textCyan: 'font-bold text-cyan-600 dark:text-cyan-400',
      textPink: 'font-bold text-primary',

      dark: (localStorage.getItem('darkTheme') === 'true'),
    }
  },
  methods: {
    siteTheme() {
      if (localStorage.darkTheme === "true" || (!('darkTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkTheme', true)
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkTheme', false)
      }
    },
    toggleTheme() {
      this.dark = !this.dark
      if (this.dark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkTheme', true)
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkTheme', false)
      }
    },
    chooseWeek() {
      this.overlapView = false
      this.sidebarView = !this.sidebarView
    },
    // String formating for legends.
    showLegends(legend1, legend2, legend3) {
      let legend = 'legend'
      return `${legend1 ? legend1 : legend}, ${legend2 ? legend2 : legend}, or ${legend3 ? legend3 : legend}`
    },
    weaponChallengeString(type, mode) {
      const challengeValue = this.currentWeekChallenges.values
      const group2 = this.challengeGroups.group2[this.weapons.indexOf(challengeValue.challenge2)]
      const group4 = this.challengeGroups.group4[this.weapons.indexOf(challengeValue.challenge4)]

      let brString = ''

      switch(type) {
        case 'damage':
          switch(mode) {
            case 'br':
              if (challengeValue.challenge2) {
                let brChall = group2.br.replace(challengeValue.challenge2, '')
                return this.recolorString(brChall, this.textPink)
              } else {
                return this.recolorString('Deal (n) damage with', this.textPink)
              }
            case 'nbr':
              if (challengeValue.challenge2) {
                return this.recolorString(group2.nbr, this.textCyan)
              } else {
                return this.recolorString('Deal (n) damage with [weapon]', this.textCyan)
              }
        }
        case 'knockdowns':
          switch(mode) {
            case 'br':
              if (challengeValue.challenge4) {
                brString = group4.br.replace(challengeValue.challenge4, '')
                return this.recolorString(brString, this.textPink)
              } else {
                return this.recolorString('Get (n) knockdowns with', this.textPink)
              }
            case 'nbr':
              if (challengeValue.challenge4) {
                brString = group4.nbr
                return this.recolorString(brString, this.textCyan)
              } else {
                return this.recolorString('Get (n) knockdowns with [weapon]', this.textCyan)
              }
          }
      }
    },
    fifthChallengeNBR(challenge, legend1, legend2, legend3) {
      if (challenge.br == 'Get 15 kills as [legends]') {
        return this.recolorString(`Get 30 kills as ${this.showLegends(legend1, legend2, legend3)}`, this.textCyan)
      } else {
        return this.recolorString(challenge.nbr, this.textCyan)
      }
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
    initializeGroups() {
      this.challengeGroups.group1 = this.challenges[0]
      this.challengeGroups.group2 = this.challenges.slice(1, 8)
      this.challengeGroups.group3 = this.challenges[8]
      this.challengeGroups.group4 = this.challenges.slice(9, 16)
      this.challengeGroups.group5 = this.challenges.slice(16, 21)
      this.challengeGroups.group67 = this.challenges.slice(21, 35)
      this.challengeGroups.group811 = this.challenges.slice(35, 65)
    },
    removeCurrentWeek() {
      this.currentWeekChallenges.values = {
        challenge1: {legend1: null, legend2: null, legend3: null},
        challenge2: null,
        challenge3: {legend1: null, legend2: null, legend3: null},
        challenge4: null,
        challenge5: {challenge: null, legend1: null, legend2: null, legend3: null},
        challenge6: null,
        challenge7: null,
        challenge8: null,
        challenge9: null,
        challenge10: null,
        challenge11: null,
      }
      this.saved()
    },
    findChallenge(value) {
      return this.challenges.filter((challenge) => challenge.name == value)[0]
    },
    getChallenge(value, n) {
      const weeklyValues = this.currentWeekChallenges.values

      switch(n) {
        case 1:
          const challenge1 = this.challengeGroups.group1
          const legendsC1 = this.showLegends(weeklyValues.challenge1.legend1, weeklyValues.challenge1.legend2, weeklyValues.challenge1.legend3)
          challenge1.name = `Play 12 matches as ${legendsC1}`
          challenge1.week = this.currentWeek
          return challenge1
        case 2:
          const weaponC2 = this.weapons.indexOf(this.currentWeekChallenges.values.challenge2)
          const challenge2 = this.findChallenge(this.challengeGroups.group2[weaponC2].name)
          challenge2.week = this.currentWeek
          return challenge2
        case 3:
          const challenge3 = this.challengeGroups.group3
          const legendsC3 = this.showLegends(weeklyValues.challenge3.legend1, weeklyValues.challenge3.legend2, weeklyValues.challenge3.legend3)
          challenge3.name = `BR:Deal 5000 damage as ${legendsC3} -or- NBR:Deal 10000 damage as ${legendsC3}`
          challenge3.br = `Deal 5000 damage as ${legendsC3}`
          challenge3.nbr = `Deal 10000 damage as ${legendsC3}`
          challenge3.week = this.currentWeek
          return challenge3
        case 4:
          const weaponC4 = this.weapons.indexOf(this.currentWeekChallenges.values.challenge4)
          const challenge4 = this.findChallenge(this.challengeGroups.group4[weaponC4].name)
          challenge4.week = this.currentWeek
          return challenge4
        case 5:
          const challenge5 = this.challenges.filter((challenge) => challenge.br == weeklyValues.challenge5.challenge)[0]
          if (weeklyValues.challenge5.challenge == 'Get 15 kills as [legends]') {
            // Create clone because if I edited the original challenge5 it will clash with function this.fifthChallengeNBR
            const cloneChallenge5 = JSON.parse(JSON.stringify(challenge5))
            const legendsC5 = this.showLegends(weeklyValues.challenge5.legend1, weeklyValues.challenge5.legend2, weeklyValues.challenge5.legend3)
            cloneChallenge5.name = `BR:Get 15 kills as ${legendsC5} -or- NBR:Get 30 kills as ${legendsC5}`
            cloneChallenge5.br = `Get 15 kills as ${legendsC5}`
            cloneChallenge5.nbr = `Get 30 kills as ${legendsC5}`
            challenge5.week = this.currentWeek
            return cloneChallenge5
          } else {
            challenge5.week = this.currentWeek
            return challenge5
          }
        default:
          const challenge = this.challenges.filter((challenge) => challenge.name == value)[0]
          challenge.week = this.currentWeek
          return challenge
      }
    },
    saved() {
      console.log('Start saved...')
      const weeklyValues = this.currentWeekChallenges.values
      let challenges = [
        weeklyValues.challenge1.legend1 ? this.getChallenge(null, 1) : null,
        weeklyValues.challenge2 ? this.getChallenge(null, 2) : null,
        weeklyValues.challenge3.legend1 ? this.getChallenge(null, 3) : null,
        weeklyValues.challenge4 ? this.getChallenge(null, 4) : null,
        weeklyValues.challenge5.challenge ? this.getChallenge(null, 5) : null,
        weeklyValues.challenge6 ? this.getChallenge(weeklyValues.challenge6, null) : null,
        weeklyValues.challenge7 ? this.getChallenge(weeklyValues.challenge7, null) : null,
        weeklyValues.challenge8 ? this.getChallenge(weeklyValues.challenge8, null) : null,
        weeklyValues.challenge9 ? this.getChallenge(weeklyValues.challenge9, null) : null,
        weeklyValues.challenge10 ? this.getChallenge(weeklyValues.challenge10, null) : null,
        weeklyValues.challenge11 ? this.getChallenge(weeklyValues.challenge11, null) : null
      ]

      let myChallenges = JSON.parse(localStorage.getItem('myChallenges'))
      let weeklyInLocalStorage = myChallenges.find(i => i.week === this.currentWeek)
      weeklyInLocalStorage.values = weeklyValues
      weeklyInLocalStorage.challenges = challenges

      localStorage.setItem('myChallenges', JSON.stringify(myChallenges))
      console.log('Done saved...')
    },
    challengesCount(week) {
      let myChallenges = JSON.parse(localStorage.getItem('myChallenges'))
      let challengesArray = myChallenges.find(i => i.week === week).challenges

      let nonNullArray = challengesArray.filter(element => element !== null)
      let nonNullLength = nonNullArray.length

      return `(${nonNullLength}/11)`
    },
    // Setting up new saved file or start populating form
    setUpSavedFile() {
      // If theres no saved data, create one.
      if (localStorage.getItem('myChallenges') === null) {
        let myChallenges = []
        for (let i = 1; i < 13; i++) {
          let weeklyChallenges = {
            week: `Week ${i}`,
            // values: [[null, null, null], null, [null, null, null], null, [null, null, null], null, null, null, null, null, null],
            values: {
              challenge1: {legend1: null, legend2: null, legend3: null},
              challenge2: null,
              challenge3: {legend1: null, legend2: null, legend3: null},
              challenge4: null,
              challenge5: {challenge: null, legend1: null, legend2: null, legend3: null},
              challenge6: null,
              challenge7: null,
              challenge8: null,
              challenge9: null,
              challenge10: null,
              challenge11: null,
            },
            challenges: Array(12)
          }
          myChallenges.push(weeklyChallenges)
        }
        localStorage.setItem('myChallenges', JSON.stringify(myChallenges))

        this.fetchAndPopulateForm(this.currentWeek)
      } else {
        this.fetchAndPopulateForm(this.currentWeek)
      }

      let myOverlaps = localStorage.getItem('overlapChallenges')
      if (myOverlaps === null) {
        let overlaps = {
          legendChallenges: [],
          weaponChallenges: [],
          BRChallenges: [],
          unspecificChallenges: []
        }
        localStorage.setItem('overlapChallenges', JSON.stringify(overlaps))
      } else {
        this.myOverlaps = JSON.parse(myOverlaps)
      }

    },
    // Fetch only current week data from localStorage to populate the form
    fetchAndPopulateForm(week) {
      let myChallenges = JSON.parse(localStorage.getItem('myChallenges'))

      let findCurrentWeekChallenges = myChallenges.find(i => i.week === week)
      this.currentWeekChallenges = findCurrentWeekChallenges
    },
    // merge all weeks challenge to an array
    flattenChallenges() {
      const myChallenges = JSON.parse(localStorage.getItem('myChallenges'))
      const mergeChallenges = myChallenges.flatMap(obj => obj.challenges)
      return mergeChallenges.filter(challenge => challenge != null) // remove null item in array
    },
    getSetObjectArray(challengesArray, targetProp, value) {
      let targetIndex = challengesArray.findIndex(item => item[targetProp] === value)
      if (targetIndex === -1) {
        challengesArray.push({ [targetProp]: value, challenges: [], count: null })
        targetIndex = challengesArray.length - 1
      }
      return challengesArray[targetIndex]
    },
    sortArraybyLength(challengesArray) {
      return challengesArray.sort((a, b) => b.length - a.length)
    },
    // Remove duplicate and sorting them in alphabetical order
    removeDuplicatesInArray(challengesArray) {
      const uniqueChallenges = [...new Map(challengesArray.map(v => [`${v.id}-${v.week}`, v])).values()]
      // uniqueChallenges.sort((a, b) => a.name.localeCompare(b.name))
      return uniqueChallenges
    },
    // Grouping to find overlap challenge in br mode and any mode.
    groupArrayById(challengesArray) {
      const groupedById = challengesArray.reduce((acc, obj) => {
        const id = obj.id
        if (!acc[id]) {
          acc[id] = []
        }
        acc[id].push(obj)
        return acc
      }, {})
      // Remove challenge from overlaps if theres only one challenge
      // return Object.values(groupedById).filter(group => group.length > 1)
      return Object.values(groupedById)
    },
    calculateOverlap() {
      this.overlapView = true
      this.sidebarView = !this.sidebarView

      const allChallenges = this.flattenChallenges()
      let myOverlaps = JSON.parse(localStorage.getItem('overlapChallenges'))

      // Empty localstorage first, because if we edited the challenge, the old one still appear in overlaps
      myOverlaps.legendChallenges = []
      myOverlaps.weaponChallenges = []
      myOverlaps.BRChallenges = []
      myOverlaps.unspecificChallenges = []

      // Legend Challenges
      const allLegendsChallenges = allChallenges.filter(challenge => challenge.type === 'legend')
      for (let c in allLegendsChallenges) {
        let challenge = allLegendsChallenges[c]
        for (let i in this.legends) { // Looping each legend

          // Get set object array for this legend
          const legendObj = this.getSetObjectArray(myOverlaps.legendChallenges, 'legend', this.legends[i]);

          // If challenge include legend name
          if (challenge.name.includes(this.legends[i])) {
            legendObj.challenges.push(challenge)
          }

          // Loop through legend classes
          for (let j in this.legendClasses) {
            if (challenge.name.startsWith('Play 5 matches as a')) {
              // If legend class is in challenge AND if current legend in legend class
              if (challenge.name.includes(this.legendClasses[j].class) && this.legendClasses[j].legends.includes(this.legends[i])) {
                legendObj.challenges.push(challenge)
              }
            }
          }

          legendObj.challenges = this.removeDuplicatesInArray(legendObj.challenges)
        }
      }

      // Grouping challenges in legend challenges
      for (let i in this.legends) {
        const legendObj = this.getSetObjectArray(myOverlaps.legendChallenges, 'legend', this.legends[i]);
        legendObj.challenges = this.groupArrayById(legendObj.challenges)
        legendObj.challenges = this.sortArraybyLength(legendObj.challenges)
      }

      // Weapon Challenges
      const allWeaponsChallenges = allChallenges.filter(challenge => challenge.type === 'weapon')
      for (let c in allWeaponsChallenges) {
        let challenge = allWeaponsChallenges[c]
        for (let i in this.weapons) {

          // Get set object array for this weapon
          const weaponObj = this.getSetObjectArray(myOverlaps.weaponChallenges, 'weapon', this.weapons[i]);

          // If challenge include weapon name
          if (challenge.name.toLowerCase().includes(this.weapons[i].toLowerCase())) {
            weaponObj.challenges.push(challenge)
          }

          weaponObj.challenges = this.removeDuplicatesInArray(weaponObj.challenges)
        }
      }

      // Grouping challenges in weapon challenges
      for (let i in this.weapons) {
        const weaponObj = this.getSetObjectArray(myOverlaps.weaponChallenges, 'weapon', this.weapons[i]);
        weaponObj.challenges = this.groupArrayById(weaponObj.challenges)
        weaponObj.challenges = this.sortArraybyLength(weaponObj.challenges)
      }

      // BR Mode Challenges
      const allBRModeChallenges = allChallenges.filter(challenge => challenge.type === 'br')
      myOverlaps.BRChallenges = this.groupArrayById(allBRModeChallenges).filter(group => group.length > 1)

      // Any Mode Challenges
      const allAnyModeChallenges = allChallenges.filter(challenge => challenge.type === 'any')
      myOverlaps.unspecificChallenges = this.groupArrayById(allAnyModeChallenges).filter(group => group.length > 1)

      localStorage.setItem('overlapChallenges', JSON.stringify(myOverlaps))
      this.myOverlaps = myOverlaps
      console.log('Overlapping done.')
    }
  },
  beforeMount() {
    this.siteTheme(),
    this.setUpSavedFile(),
    this.initializeGroups()
  },
  components: {
    ApexButton,
    BottomNav,
    Card,
    ChallengeCard,
    DataTable,
    InputSelect,
    MainPanel,
    Modal,
    PickLegends,
  }
}
</script>
