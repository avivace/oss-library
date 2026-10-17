<script setup lang="ts">
import { ref } from 'vue'

const repo = 'https://github.com/avivace/oss-library'

// Theme: starts from the saved choice (applied in index.html) or the system setting
type Theme = 'light' | 'dark'
const systemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const theme = ref<Theme>((document.documentElement.dataset.theme as Theme) || systemTheme())
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('theme', theme.value)
  } catch {}
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-6 py-12 sm:py-16">
    <div class="mb-14 flex items-center justify-between gap-4 border-t-2 border-ink pt-3">
      <nav class="label flex flex-wrap gap-x-5 gap-y-1" aria-label="Main">
        <RouterLink to="/" class="nav-link">Library</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/lists" class="nav-link">Lists</RouterLink>
        <a :href="`${repo}/blob/main/CONTRIBUTING.md`" target="_blank" rel="noopener" class="nav-link">
          Contribute ↗
        </a>
      </nav>
      <button
        class="label flex shrink-0 cursor-pointer items-center gap-2 hover:underline"
        :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        @click="toggleTheme"
      >
        <svg viewBox="0 0 16 16" class="size-3.5" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
        </svg>
        {{ theme === 'dark' ? 'Light' : 'Dark' }}
      </button>
    </div>

    <RouterView />

    <footer class="mt-24 grid gap-3 border-t-2 border-ink pt-6 text-sm leading-relaxed text-muted">
      <p>
        Maintained by
        <a href="https://github.com/avivace" target="_blank" rel="noopener" class="text-link">Antonio Vivace</a>.
        Contributions, source code and feedback on
        <a :href="repo" target="_blank" rel="noopener" class="text-link">GitHub</a>.
      </p>
      <p>
        OSS Library is Open Source Software released under
        <a :href="`${repo}/blob/main/LICENSE`" target="_blank" rel="noopener" class="text-link">GPLv3</a>.
        The dataset is released as open data under the
        <a href="https://opendatacommons.org/licenses/odbl/" target="_blank" rel="noopener" class="text-link">ODbL</a>.
      </p>
      <p class="text-xs">As an Amazon Associate I earn from qualifying purchases.</p>
    </footer>
  </main>
</template>

<style scoped>
@reference './style.css';

.nav-link {
  @apply text-muted underline-offset-4 transition-colors hover:text-ink;
}
.nav-link.router-link-exact-active {
  @apply text-ink underline decoration-2;
}
</style>
