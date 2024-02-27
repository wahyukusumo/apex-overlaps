<template>
  <div
    class="lg:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-stone-50 border-t border-stone-200 dark:bg-stone-900 dark:border-stone-200">
    <div class="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
      <!-- Theme -->
      <button type="button" class="bottom-nav-button" @click="$emit('toggleTheme')">
        <svg class="bottom-nav-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
        </svg>
        <span class="bottom-nav-span">Theme</span>
      </button>
      <!-- Challenges -->
      <button type="button" class="bottom-nav-button" @click="$emit('showWeeks')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bottom-nav-svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <span class="bottom-nav-span">Menu</span>
      </button>
    </div>
  </div>
</template>

<style>
.bottom-nav-button {
  @apply inline-flex flex-col items-center justify-center px-5 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-pink-600
}

.bottom-nav-span {
  @apply text-sm text-stone-800 dark:text-stone-200 hover:text-pink-600 dark:group-hover:text-pink-500
}

.bottom-nav-svg {
  @apply w-5 h-5 mb-2 text-stone-800 dark:text-stone-200 hover:text-pink-600 dark:group-hover:text-pink-500
}
</style>