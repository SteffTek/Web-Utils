<script>
/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary A Vue&Tailwind divider.
 */
export default {
    name: "Divider",
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<template>
    <div v-if="vertical" class="w-[1px] h-full bg-black/20 dark:bg-white/20"></div>
    <div v-else class="h-[1px] w-full bg-black/20 dark:bg-white/20"></div>
</template>