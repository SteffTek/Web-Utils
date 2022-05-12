<script>
/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary A Vue&Tailwind component to show a counter with min & max lenght. Designed for text inputs.
 */
export default {
    name: "Counter",
    props: {
        // Minimum Length
        min: {
            type: Number,
            default: 0,
        },
        // Maximum Length
        max: {
            type: Number,
            default: null,
        },
        // Current Value
        value: {
            type: Number,
            default: 0,
        }
    }
}
</script>
<template>
    <p :class="`w-full flex justify-between flex-row-reverse items-center ${(max !== null && value > max) || value < min ? 'text-red-500' : 'passiveText'}`">{{ value }}/{{ max }}<span v-if="min" class="passiveText text-xs">(min. {{ min }})</span></p>
</template>