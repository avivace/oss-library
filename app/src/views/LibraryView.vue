<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import library from '@library/library.json'
import type { Resource, ResourceType } from '../types'
import BlueskyIcon from '../components/BlueskyIcon.vue'
import { amazonUrl } from '../config'

const resources = library.resources as Resource[]

const typeLabels: Record<ResourceType, string> = {
  book: 'Book',
  report: 'Report',
  paper: 'Paper',
  'conference-paper': 'Conference paper',
  preprint: 'Preprint',
}
const types = Object.keys(typeLabels) as ResourceType[]

const query = ref('')
const type = ref<ResourceType | null>(null)
const openAccessOnly = ref(false)

// The active tag lives in the URL (/#/?tag=ospo), so filtered views can be shared
const route = useRoute()
const router = useRouter()
const tag = computed(() => (typeof route.query.tag === 'string' ? route.query.tag : null))

const normalize = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

const results = computed(() => {
  const terms = normalize(query.value).split(/\s+/).filter(Boolean)
  return resources.filter((r) => {
    if (type.value && r.type !== type.value) return false
    if (openAccessOnly.value && !r.open_access) return false
    if (tag.value && !r.tags?.includes(tag.value)) return false
    const haystack = normalize([r.title, ...r.authors, ...(r.tags ?? []), r.license ?? ''].join(' '))
    return terms.every((t) => haystack.includes(t))
  })
})

const countOf = (t: ResourceType) => resources.filter((r) => r.type === t).length

const reset = () => {
  query.value = ''
  type.value = null
  openAccessOnly.value = false
  router.replace({ query: {} })
}

// "/" focuses the search field, Escape clears it
const search = useTemplateRef('search')
const onKey = (e: KeyboardEvent) => {
  if (e.key === '/' && document.activeElement !== search.value) {
    e.preventDefault()
    search.value?.focus()
  } else if (e.key === 'Escape' && document.activeElement === search.value) {
    query.value = ''
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="mb-12">
    <h1 class="font-display text-6xl leading-none font-bold tracking-tight sm:text-8xl">
      OSS Library
    </h1>
    <p class="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
      {{ library.description }}
      <span class="whitespace-nowrap"
        >Also on
        <a
          href="https://bsky.app/profile/ossradio.bsky.social"
          target="_blank"
          rel="noopener"
          aria-label="OSS Library on Bluesky"
          title="Also on Bluesky"
          class="inline-block align-[-0.1em] text-ink transition-opacity hover:opacity-60"
          ><BlueskyIcon class="size-[1em]" /></a
        >.</span
      >
    </p>
  </header>

  <div class="relative mb-6">
    <input
      ref="search"
      v-model="query"
      type="search"
      placeholder="Search titles, authors…"
      aria-label="Search"
      class="w-full border-b border-ink bg-transparent py-3 pr-10 font-serif text-xl italic placeholder:text-muted focus:border-b-2 focus:outline-none sm:text-2xl"
    />
    <kbd
      class="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 rounded-sm border border-rule px-1.5 font-sans text-xs text-muted not-italic"
      >/</kbd
    >
  </div>

  <nav class="mb-12 flex flex-wrap items-center gap-2" aria-label="Filters">
    <button
      class="chip"
      :class="{ 'chip-active': type === null }"
      :aria-pressed="type === null"
      @click="type = null"
    >
      All <span class="opacity-60">{{ resources.length }}</span>
    </button>
    <button
      v-for="t in types"
      :key="t"
      class="chip"
      :class="{ 'chip-active': type === t }"
      :aria-pressed="type === t"
      @click="type = type === t ? null : t"
    >
      {{ typeLabels[t] }}s <span class="opacity-60">{{ countOf(t) }}</span>
    </button>
    <span class="mx-1 h-6 w-px bg-rule" />
    <button
      class="chip"
      :class="{ 'chip-active': openAccessOnly }"
      :aria-pressed="openAccessOnly"
      @click="openAccessOnly = !openAccessOnly"
    >
      Open Access
    </button>
    <RouterLink
      v-if="tag"
      :to="{ query: {} }"
      class="chip chip-active"
      :aria-label="`Remove tag filter ${tag}`"
    >
      #{{ tag }} <span class="opacity-60">×</span>
    </RouterLink>
  </nav>

  <p class="label mb-3" aria-live="polite">
    {{ results.length }} {{ results.length === 1 ? 'resource' : 'resources' }}
  </p>

  <TransitionGroup tag="ol" name="list" class="relative border-t-2 border-ink">
    <li v-for="r in results" :key="r.title" class="group grid gap-2 border-b border-rule py-7">
      <p class="label flex flex-wrap gap-x-4 gap-y-1">
        <span>{{ typeLabels[r.type] }}</span>
        <span v-if="r.date" class="text-muted">{{ r.date.slice(0, 4) }}</span>
        <span v-if="r.open_access" class="text-open">Open Access</span>
        <RouterLink
          v-for="t in r.tags"
          :key="t"
          :to="{ query: { tag: t } }"
          class="text-muted underline-offset-4 hover:text-ink hover:underline"
          >#{{ t }}</RouterLink
        >
        <a
          v-if="r.asin"
          :href="amazonUrl(r.asin)"
          target="_blank"
          rel="sponsored noopener"
          class="underline-offset-4 hover:underline"
          >Amazon ↗</a
        >
      </p>
      <h2 class="font-display text-3xl leading-[1.05] font-bold text-balance sm:text-4xl">
        <a
          v-if="r.links[0]"
          :href="r.links[0]"
          target="_blank"
          rel="noopener"
          class="decoration-2 underline-offset-[6px] hover:underline"
        >
          {{ r.title }}<span class="ml-1.5 inline-block font-sans text-xl font-normal text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
        <template v-else>{{ r.title }}</template>
      </h2>
      <p class="text-lg text-muted">{{ r.authors.join(', ') }}</p>
    </li>
  </TransitionGroup>

  <div v-if="!results.length" class="py-16 text-center">
    <p class="mb-5 font-serif text-2xl text-muted italic">Nothing on these shelves.</p>
    <button class="chip" @click="reset">Clear filters</button>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
.list-leave-active {
  position: absolute;
  inset-inline: 0;
}
</style>
