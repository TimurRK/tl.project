<template>
  <div class="row" v-if="current_breadcrumbs">
    <div class="col">
      <nav aria-label="breadcrumb" class="mt-2 p-0">
        <ol class="breadcrumb mb-0">
          <li
            v-for="(breadcrumb, index) of current_breadcrumbs"
            :key="'breadcrumb_' + index"
            class="breadcrumb-item"
            :class="[breadcrumb.is_current ? 'active' : '']"
            :ariaCurrent="[breadcrumb.is_current ? 'page' : '']"
          >
            <template v-if="breadcrumb.is_current">
              {{ breadcrumb.is_i18n ? $t(breadcrumb.name) : breadcrumb.name }}
            </template>
            <template v-else>
              <router-link
                :to="{ name: breadcrumb.to, params: breadcrumb.params }"
              >
                {{ breadcrumb.is_i18n ? $t(breadcrumb.name) : breadcrumb.name }}
              </router-link>
            </template>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breadcrumbsStore, type IBreadcrumb } from "@/stores/breadcrumb";
import { ref, type Ref } from "vue";

const current_breadcrumbs_store = breadcrumbsStore();

const current_breadcrumbs: Ref<IBreadcrumb[] | null> = ref(null);
current_breadcrumbs.value = current_breadcrumbs_store.breadcrumbs;

current_breadcrumbs_store.$subscribe((_mutation, state) => {
  current_breadcrumbs.value = state._breadcrumbs;
});
</script>

<style lang="scss">
@import "@/assets/main.css";

.breadcrumb-item {
  font-size: 12px;
  line-height: 1.65;
  cursor: pointer;
  text-decoration: none;
  font-family:
    Helvetica Neue,
    Arial,
    Verdana,
    sans-serif;
}
</style>
