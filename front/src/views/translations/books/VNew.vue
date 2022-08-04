<template>
  <CHr
    :color="'dark'"
    :title="(route.meta!.name as string)"
  />

  <CPreloader v-if="disable_upload" />

  <div class="row justify-content-md-center" v-else>
    <form
      @submit="onUploadFile"
      autocomplete="off"
      id="change-password-form"
    >
      <div class="mb-3">
        <label for="ebook-file" class="form-label">eBook File</label>
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
        >
        <div id="ebook-file-help" class="form-text">Электронная книга формата ePub</div>
      </div>

      <div class="mb-3">Выбранный файл: <b>{{ file ? file.name : '' }}</b></div>

      <button type="submit" class="btn btn-primary" :disabled="disable_upload">Загрузить</button>
    </form>
  </div>

    
</template>

<script setup lang="ts">
import { type Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import CHr from "@/components/CHr.vue";
import CPreloader from "@/components/CPreloader.vue";
import router from '@/router'

import { useApi } from "@/api/api";

const route = useRoute();
const api = useApi();
const toast = useToast();

const file_input: Ref<HTMLInputElement | null> = ref(null);
const file: Ref<File | null> = ref(null);
const disable_upload: Ref<boolean> = ref(false);

function changeFile() {
  if (file_input.value?.files) {
    file.value = file_input.value.files[0]
  } else {
    file.value = null;
  }
}

async function onUploadFile(event: Event) {
  event.preventDefault();

  if (file.value) {
    disable_upload.value = true;

    try {
      await api.upload(file.value);

      toast.success("UPLOAD_SUCCESS", {
        timeout: 2500,
      });

      router.push({ name: 'VBookList' })
    } catch (error: any) {
      toast.error(error.message, {
        timeout: 2500,
      });
    }

    disable_upload.value = false;
  }
}
</script>

<style></style>
