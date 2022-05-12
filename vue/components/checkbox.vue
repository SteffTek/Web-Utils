<script>
/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary A Vue&Tailwind checkbox.
 * @required @tailwindcss/forms
 */
export default {
    name: 'Checkbox',
    props: {
        // Is the checkbox checked
        checked: {
            type: Boolean,
            default: false,
        },
        // Checkbox Label
        label: {
            type: String,
            default: '',
        }
    },
    emit: ['changed'],
    data() {
        return {
            isChecked: this.checked,
        }
    },
    watch: {
        isChecked(newVal) {
            this.isChecked = newVal;
            // Emit
            this.$emit('changed', this.isChecked);
        }
    },
}
</script>
<template>
    <label class="inline-flex items-center justify-between">
        <span>{{ label }}&nbsp;</span>
        <input type="checkbox" class="w-6 h-6 rounded-full form-checkbox text-primary hover:text-secondary dark:text-primary-dark dark:hover:text-secondary-dark" v-model="isChecked" />
      </label>
</template>