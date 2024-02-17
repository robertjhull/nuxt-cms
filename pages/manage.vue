<script setup lang="ts"></script>

<template>
  <v-row class="d-flex justify-center mb-6">
    <v-col
      class="d-flex flex-column main-content ga-10"
      cols="8">
      <client-only placeholder="loading...">
        <tiptap />
      </client-only>
    </v-col>
  </v-row>
</template>
