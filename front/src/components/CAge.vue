<template>
  <span>
    {{
      normalizedCount(
        calculateAge(),
        $t("age.year"),
        $t("age.of_the_year"),
        $t("age.years"),
      )
    }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  date: { type: Date, required: true },
});

function calculateAge() {
  const age_diff_ms = Date.now() - new Date(props.date).getTime();
  const age_date = new Date(age_diff_ms);

  return Math.abs(age_date.getUTCFullYear() - 1970);
}

function normalizedCount(
  count: number,
  value1: string,
  value2: string,
  value3: string,
) {
  if (!count) {
    return `0 ${value3}`;
  }

  const cases = [2, 0, 1, 1, 1, 2];

  if (count % 1 > 0) {
    return `0 ${value2}`;
  } else {
    return `${count} ${
      [value1, value2, value3][
        count % 100 > 4 && count % 100 < 20
          ? 2
          : cases[count % 10 < 5 ? count % 10 : 5]
      ]
    }`;
  }
}
</script>

<style>
@import "@/assets/main.css";
</style>
