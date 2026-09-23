<script setup lang="ts">
import { ArrowRight, Check, LoaderCircle } from "@lucide/vue";
import { AnimatePresence, motion } from "motion-v";
import { springs } from "~/utils/demo";

const props = withDefaults(defineProps<{ id: string; tone?: "light" | "dark" }>(), {
  tone: "light",
});

const { email, status, done, message, submit, clearError } = useWaitlist();

const inputId = computed(() => `${props.id}-email`);
const messageId = computed(() => `${props.id}-message`);
const hasError = computed(() => status.value === "invalid" || status.value === "error");
const dark = computed(() => props.tone === "dark");
</script>

<template>
  <div class="w-full max-w-md">
    <AnimatePresence mode="wait" :initial="false">
      <motion.div
        v-if="done"
        key="done"
        class="flex min-h-12 items-center gap-3 rounded-full py-2.5 pr-5 pl-2.5"
        :class="dark ? 'bg-ink-soft text-paper' : 'bg-surface text-ink ring-1 ring-line'"
        role="status"
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="springs.soft"
      >
        <span class="grid size-7 shrink-0 place-items-center rounded-full bg-orange-500 text-ink">
          <Check :size="16" :stroke-width="3" aria-hidden="true" />
        </span>
        <span class="text-[1rem] leading-snug">{{ message }}</span>
      </motion.div>

      <motion.form
        v-else
        key="form"
        class="flex flex-col gap-2 sm:flex-row"
        novalidate
        :exit="{ opacity: 0, y: -6 }"
        :transition="{ duration: 0.15 }"
        @submit.prevent="submit"
      >
        <label :for="inputId" class="sr-only">Email address</label>
        <input
          :id="inputId"
          v-model="email"
          type="email"
          name="email"
          inputmode="email"
          autocomplete="email"
          placeholder="you@email.com"
          required
          class="h-12 w-full min-w-0 rounded-full border px-5 text-[1.0625rem] transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-muted focus-visible:outline-none sm:flex-1"
          :class="[
            dark
              ? 'border-ink-soft bg-ink text-paper focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30'
              : 'border-line-strong bg-surface text-ink focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25',
            hasError && 'border-danger!',
          ]"
          :aria-invalid="hasError || undefined"
          :aria-describedby="message ? messageId : undefined"
          @input="clearError"
        />
        <button type="submit" class="btn btn-primary h-12" :disabled="status === 'loading'">
          <LoaderCircle
            v-if="status === 'loading'"
            :size="18"
            class="animate-spin"
            aria-hidden="true"
          />
          {{ status === "loading" ? "Joining" : "Save My Spot" }}
          <ArrowRight
            v-if="status !== 'loading'"
            :size="18"
            :stroke-width="2.25"
            aria-hidden="true"
          />
        </button>
      </motion.form>
    </AnimatePresence>

    <p
      v-if="hasError"
      :id="messageId"
      role="alert"
      class="mt-2 text-[0.9375rem]"
      :class="dark ? 'text-orange-100' : 'text-danger'"
    >
      {{ message }}
    </p>
  </div>
</template>
