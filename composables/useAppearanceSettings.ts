import { computed, reactive } from "vue";
import type { Settings } from "~/interfaces";

const fontOptions = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: '"Times New Roman", serif' },
  { name: "Courier New", value: '"Courier New", monospace' },
  { name: "Georgia", value: "Georgia, serif" },
];

export default function () {
  const saving = ref(false);
  const success = ref(false);
  const {
    data: appearanceSettings,
    pending,
    error,
  } = useAsyncData<Settings>("appearance-settings", () => {
    return $fetch(`/api/settings/`);
  });

  const defaultSettings = reactive<Settings>({
    pageTitle: "",
    pageColor: "#EEEEEE",
    textColor: "#000",
    fontFamily: fontOptions[0],
    fontSize: 16,
    headerImage: "",
  });

  const settings = computed(() => {
    return appearanceSettings.value || defaultSettings;
  });

  const saveAppearanceSettings = async () => {
    saving.value = true;
    try {
      await $fetch("/api/settings", {
        method: "PATCH",
        body: settings.value,
      });
      success.value = true;
    } catch (err) {
      console.log(err);
      success.value = false;
    } finally {
      saving.value = false;
    }
  };

  return {
    settings,
    fontOptions,
    saveAppearanceSettings,
    pending,
    saving,
    success,
    error,
  };
}
