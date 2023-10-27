<template>
  <CHr :color="'dark'" :title="$t('routers.translations.new')" />

  <CPreloader v-if="disable_upload" />

  <div class="row" v-else>
    <form @submit="onUploadFile" autocomplete="off" id="change-password-form">
      <div class="mb-3">
        <label for="ebook-file" class="form-label">{{
          $t("views.translations.books.new.labels.enter_file")
        }}</label>
        <input
          type="file"
          ref="file_input"
          :state="Boolean(file)"
          @change="changeFile"
          placeholder="Выберите или перенесите файл..."
          drop-placeholder="Перенесите файл..."
          accept="application/epub+zip"
          class="form-control"
          id="ebook-file"
          aria-describedby="ebook-file-help"
          :disabled="disable_upload"
        />
        <div id="ebook-file-help" class="form-text">
          {{ $t("views.translations.books.new.labels.file_format") }}
        </div>
      </div>

      <div class="mb-3">
        {{ $t("views.translations.books.new.labels.entered_file") }}:
        <b>{{ file ? file.name : "" }}</b>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="disable_upload">
        {{ $t("views.translations.books.new.buttons.upload") }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, onBeforeUnmount } from "vue";
import { useToast } from "vue-toastification";

import CHr from "@/components/CHr.vue";
import CPreloader from "@/components/CPreloader.vue";
import router from "@/router";

import { useApi } from "@/api/api";
import { breadcrumbsStore } from "@/stores/breadcrumb";

const api = useApi();
const toast = useToast();

const file_input: Ref<HTMLInputElement | null> = ref(null);
const file: Ref<File | null> = ref(null);
const disable_upload: Ref<boolean> = ref(false);
const breadcrumbs_store = breadcrumbsStore();

function changeFile() {
  if (file_input.value?.files) {
    file.value = file_input.value.files[0];
  } else {
    file.value = null;
  }
}

breadcrumbs_store.setBreadcrumbs([
  {
    name: "routers.translations.self",
    is_current: false,
    is_i18n: true,
    to: "VTranslationBookList",
  },
  {
    name: "routers.translations.new",
    is_current: true,
    is_i18n: true,
  },
]);

async function onUploadFile(event: Event) {
  event.preventDefault();

  if (file.value) {
    disable_upload.value = true;

    try {
      await api.upload(file.value);

      toast.success("UPLOAD_SUCCESS", {
        timeout: 2500,
      });

      router.push({ name: "VTranslationBookList" });
    } catch (error: any) {
      toast.error(error.message, {
        timeout: 2500,
      });
    }

    disable_upload.value = false;
  }
}

onBeforeUnmount(async () => {
  breadcrumbs_store.setBreadcrumbs(null);
});
</script>

<style></style>
