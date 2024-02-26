<script setup lang="ts">
interface MenuItemProps {
  type?: string | undefined;
  icon?: string | undefined;
  title?: string | undefined;
  action?: () => void;
  isActive?: () => boolean;
}

defineProps<MenuItemProps>();
</script>

<template>
  <button
    class="menu-item mx-2 pa-2"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click="action"
    :title="title">
    <v-icon :icon="icon" />
  </button>
</template>

<style lang="scss">
.menu-item {
  background: transparent;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;

  &.is-active,
  &:hover {
    background-color: rgba(var(--v-theme-primary));
  }
}
</style>
