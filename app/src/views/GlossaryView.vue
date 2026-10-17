<script setup lang="ts">
import glossary from '@library/glossary.json'

// Anchor ids, so a single term can be linked: /#/glossary#contributor-poker
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')
</script>

<template>
  <h1 class="mb-12 font-display text-6xl leading-none font-bold tracking-tight sm:text-7xl">
    Glossary
  </h1>

  <dl class="border-t-2 border-ink">
    <div
      v-for="t in glossary.terms"
      :id="slug(t.term)"
      :key="t.term"
      class="grid scroll-mt-8 gap-6 border-b border-rule py-10 last:border-b-0"
    >
      <dt class="font-display text-3xl leading-tight font-bold sm:text-4xl">{{ t.term }}</dt>
      <dd>
        <figure class="relative max-w-2xl pl-10 sm:pl-14">
          <span
            class="pointer-events-none absolute -top-3 left-0 font-display text-7xl leading-none font-bold text-muted select-none sm:-top-4 sm:text-8xl"
            aria-hidden="true"
            >“</span
          >
          <blockquote :cite="t.source.url" class="relative grid gap-4 font-serif text-lg leading-relaxed text-pretty italic">
            <p v-for="(p, i) in t.quote" :key="i">{{ p }}</p>
          </blockquote>
          <figcaption class="mt-5 font-sans text-sm text-muted">
            <span class="label mr-1.5">From</span>
            <a :href="t.source.url" target="_blank" rel="noopener" class="text-link">{{ t.source.title }}</a>
            <span>, {{ t.source.author }}</span>
          </figcaption>
        </figure>
      </dd>
    </div>
  </dl>
</template>
