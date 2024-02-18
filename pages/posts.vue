<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch("/api/posts");

const { formatDate } = useFormattedDate();
const datePublished = (datetime: string): string => formatDate(datetime);
</script>

<template>
  <v-row class="d-flex justify-center mb-6">
    <v-col
      class="d-flex flex-column main-content ga-10"
      cols="8">
      <template v-if="pending">Loading...</template>
      <template v-else-if="error"> {{ error }}</template>
      <template
        v-else
        v-for="post in (data as Post[])"
        :key="post.id">
        <v-card style="width: 100%">
          <v-card-title class="headline pa-6 mt-2">{{
            post.title
          }}</v-card-title>
          <v-card-subtitle>
            <span>By {{ post.author.name.toUpperCase() }}</span>
            <v-icon icon="$divider" />
            <span>{{ datePublished(post.published) }}</span>
          </v-card-subtitle>
          <v-card-text v-html="post.content"></v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
