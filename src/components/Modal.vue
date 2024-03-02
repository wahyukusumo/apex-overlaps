<template>
  <div>
    <ApexButton type="button" v-on:click="toggleModal()">
      Clear {{ week }} Data
    </ApexButton>

    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-sm">

        <!--content-->
        <div class="standard-box relative flex flex-col w-full outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-lg font-semibold">Confirm delete</h3>

            <button @click="toggleModal" class="ml-auto p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!--body-->
          <div class="relative p-4 flex-auto">
            <p class="my-1 text-blueGray-500 text-base leading-relaxed">
              Are you sure you want to remove <span class="underline decoration-pink-600 font-semibold">{{ week }}</span> data? This action can't be undone.
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end px-4 border-t border-solid border-blueGray-200 rounded-b">
            <button @click="toggleModal()" class="border-2 border-stone-800 dark:border-stone-100 border-current px-2 py-1 text-sm font-extrabold uppercase tracking-widest dark:text-stone-200 text-stone-800">
              Cancel
            </button>
            <ApexButton @click="$emit('someEvent')" v-on:click="toggleModal()">Remove</ApexButton>
          </div>
        </div>

      </div>
    </div>
    <div v-if="showModal" class="opacity-40 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import ApexButton from './ApexButton.vue'

export default {
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal: function(){
      this.showModal = !this.showModal;
    }
  },
  props: ['week'],
  components: { ApexButton }
}
</script>