<script setup>
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";
import { Loader, Loader2 } from "lucide-vue-next";

const props = defineProps({
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false, default: "button" },
  loading: { type: Boolean, required: false },
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="
      cn(buttonVariants({ variant, size }), props.class, 'cursor-pointer')
    "
  >
    <slot v-if="!loading" />
    <div v-else class="flex items-center justify-center text-white">
      <Loader class="animate-spin text-white" />
    </div>
  </Primitive>
</template>
