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
              Are you sure want to remove <span class="underline decoration-pink-600 font-semibold">{{ week }}</span> data? This action can't be undo
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Cancel
            </button>
            <button @click="$emit('someEvent')" class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Remove
            </button>
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