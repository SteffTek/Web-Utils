<script>
/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary A Vue&Tailwind dropdown component for simple dropdowns.
 */
export default {
    name: "Textbox",
    props: {
        // Placeholder String
        placeholder: {
            type: String,
            default: '',
        },
        // Current Value
        value: {
            default: '',
        },
        // Label to Display
        label: {
            type: String,
            default: '',
        },
        // Input Type
        type: {
            type: String,
            default: 'text',
        },
        // If readonly, should text be selectable?
        select: {
            type: Boolean,
            default: false
        },
        // Read Only Mode
        readonly: {
            type: Boolean,
            default: false,
        },
        // Max Text Length/Number etc.
        max: {
            type: Number,
            default: null,
        },
        // Min Text Length/Number etc.
        min: {
            type: Number,
            default: null,
        },
        // Clear the text box on submit
        clearOnEnter: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['changed', 'submitted'],
    data() {
        return {
            currentValue: this.value,
        }
    },
    mounted() {
        this.currentValue = this.value;
    },
    watch: {
        currentValue(newVal) {
            this.currentValue = newVal;
            // Emit
            this.$emit('changed', this.currentValue);
        }
    },
    methods: {
        submit() {
            this.$emit('submitted', this.currentValue);

            // Reset Current Value
            if (this.clearOnEnter) {
                this.currentValue = '';
            }
        }
    }
}
</script>
<template>
    <label class="inline-flex items-center justify-between w-full">
        <span>{{ label }}</span>
        <input
            :class="`
                transition-all
                rounded-md
                w-full
                py-5 px-4 border-0
                font-bold text-lg
                placeholder-text-black placeholder-text-white placeholder-opacity-50
                bg-background/70 dark:bg-background-dark/70
                ${!readonly ? 'hover:bg-background/90 dark:hover:bg-background-dark/90 text-black/90 dark:text-white' : 'hover:cursor-not-allowed text-black/50 dark:text-white/50' + select ? 'select-text' : 'select-none'}
            `"
            :type="type"
            :placeholder="placeholder"
            :readonly="readonly"
            :maxlength="max"
            :max="max"
            :minlength="min || 0"
            :min="min || 0"
            v-model="currentValue"
            @keydown.enter="submit"
        />
    </label>
</template>