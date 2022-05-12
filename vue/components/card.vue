<script>
/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary A Vue&Tailwind card component.
 */
export default {
    name: "Card",
    props: {
        // Show a hover effect
        hoverable: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<template>
    <div :class="`
        group
        transition-all
        w-full h-auto
        rounded-md
        backdrop-blur-sm
        bg-background/70 dark:bg-background-dark/70
        ${hoverable ? 'hover:bg-background/80 dark:hover:bg-background-dark/80 hover:shadow-md cursor-pointer' : ''}
    `">
        <slot></slot>
    </div>
</template>