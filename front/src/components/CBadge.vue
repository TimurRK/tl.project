<template>
  <span
    class="badge mlr-base c-badge c-badge-normal"
    :class="'color-' + props.color"
  >
    {{ props.title }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  color: { type: String, required: false, default: "dark" },
  title: { type: String, required: true },
});
</script>

<style lang="scss">
@import "@/assets/main.css";

.c-badge {
  text-align: center;
  vertical-align: middle;

  &-small {
    height: 17.84px;
  }

  &-normal {
    height: 20.38px;
  }
}

.color {
  &-dark {
    background-color: rgba(52, 58, 64, 0.25);
    color: rgba(52, 58, 64, 1);
  }

  &-red {
    background-color: rgba(220, 53, 69, 0.25);
    color: rgba(220, 53, 69, 1);
  }

  &-green {
    background-color: rgba(40, 167, 69, 0.25);
    color: rgba(40, 167, 69, 1);
  }

  &-blue {
    background-color: rgba(0, 123, 255, 0.25);
    color: rgba(0, 123, 255, 1);
  }

  &-yellow {
    background-color: rgba(255, 193, 7, 0.25);
    color: rgba(255, 193, 7, 1);
  }

  &-orange {
    background-color: rgba(253, 126, 20, 0.25);
    color: rgba(253, 126, 20, 1);
  }

  &-pink {
    background-color: rgba(232, 62, 140, 0.25);
    color: rgba(232, 62, 140, 1);
  }

  &-indigo {
    background-color: rgba(102, 16, 242, 0.25);
    color: rgba(102, 16, 242, 1);
  }
}
</style>
