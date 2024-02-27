<template>
  <div class="group m-1 relative inline-block cursor-pointer focus:outline-none focus:ring my-4">
    <span class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-pink-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span class="relative inline-block border-2 border-stone-800 dark:border-stone-100 border-current px-2 py-1 text-sm font-extrabold uppercase tracking-widest text-stone-200 group-active:text-opacity-75">
      <slot></slot>
    </span>
  </div>
</template>