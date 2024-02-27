<template>
<!-- Button Dropdown -->
  <div @click="this.visible = !this.visible" class="cursor-pointer border border-stone-700 bg-stone-800">
    <div class="flex items-center">
      <input type="text" v-model="searchQuery" :placeholder="modelValue"
      class="w-[70vw] border-gray-200 bg-transparent shadow-sm font-semibold px-2 text-sm lg:text-base focus:outline-none" />
      <!-- Caret Down -->
      <span class="ml-auto px-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </span>
    </div>

    <div @click.self="visible = false" v-show="visible" class="max-h-52 overflow-y-auto">
      <ul class="overflow-y-auto truncate">
        <li v-for="(option, index) in filteredOptions" class="flex flex-row">
          <input class="peer hidden" name="option" type="radio" :value="option" v-model="modelValue" :name="`select-${index}`"
          :id="`select-${index}`">
          <label :for="`select-${index}`" @click="resetQuery"
            class="flex w-full p-1 hover:bg-stone-600 cursor-pointer peer-checked:bg-pink-200">
            <!-- <img v-bind:src="`./potraits/Portrait_${option}_square.webp`" alt="" width="25" class="mr-1"> -->
            <span class="pl-1">{{ option }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      visible: false,
      searchQuery: '',
      modelValue: null,
      options: [
        "Bloodhound",
        "Gibraltar",
        "Lifeline",
        "Pathfinder",
        "Wraith",
        "Bangalore",
        "Caustic",
        "Mirage",
        "Octane",
        "Wattson",
        "Crypto",
        "Revenant",
        "Loba",
        "Rampart",
        "Horizon",
        "Fuse",
        "Valkyrie",
        "Seer",
        "Ash",
        "Mad Maggie",
        "Newcastle",
        "Vantage",
        "Catalyst",
        "Ballistic",
        "Conduit"
      ],
      optionss: [
        'Deal 1000 damage with a Red-Tier weapon',
        'Deal 4000 damage from hipfire',
        'Deal 500 melee damage',
        'Finish in the top-3 3 times getting at least 3 kills, knockdowns or assists',
        'Get 25 headshots',
        'Get a Top 5 finish 10 times',
        'Perform 10 finishing moves',
        'Play 5 matches as a Assault in any game mode',
        'Play 5 matches as a Controller in any game mode',
        'Play 5 matches as a Recon in any game mode',
        'Play 5 matches as a Skirmisher in any game mode',
        'Play 5 matches as a Support in any game mode',
        'Revive Squadmates 50 times',
        'Survive 30 ring closings'
      ],
    }
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option =>
        option.toUpperCase().indexOf(this.searchQuery.toUpperCase()) > -1
      );
    }
  },
  methods: {
    resetQuery() {
      this.visible = false
      this.searchQuery = ''
    },
    colored(sentence) {
      const regex = /\d+/g
      // Replace each found number with the same number wrapped in a span with a red color style
      const highlightedString = sentence.replace(regex, '<span class="text-pink-600 font-bold">$&</span>')
      return highlightedString;
    },
    showDropDown() {
      this.visible = true
    }
  }
}
</script>