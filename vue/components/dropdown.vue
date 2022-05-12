<script>
/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary A Vue&Tailwind dropdown component for simple dropdowns.
 */
export default {
    name: "Dropdown",
    props: {
        // Label infront of dropdown
        label: {
            type: String,
            default: ""
        },
        // Options as Array, with contents {value,name}
        options: {
            type: Array,
            required: true
        },
        // Selected value
        selected: {
            type: String,
            default: ""
        }
    },
    emits: ["changed"],
    data() {
        return {
            currentValue: this.selected || options[0].value,
            open: false
        }
    },
    methods: {
        changed($event) {
            this.currentValue = $event;
            this.$emit("changed", this.currentValue);
            this.$nextTick(() => {
                this.closeMenu();
            });
        },
        openMenu() {
            this.open = true;
        },
        closeMenu() {
            this.open = false;
        }
    }
}
</script>
<template>
    <label>
        {{ label }}
        <div class="relative transition-all rounded-md border-none w-auto bg-white/50 dark:bg-black/50 hover:bg-white/90 dark:hover:bg-black/90 hover:cursor-pointer text-2xl md:text-3xl font-bold m-0 p-2 select-none" @click.stop="$event.preventDefault(); open ? closeMenu() : openMenu()">
            <!-- CurrentValue & Drop Down Arrow -->
            <p class="flex justify-between items-center">{{ options.find(option => option.value === currentValue).name }}&nbsp;<span v-if="open" class="rotate-[-90deg]">❮</span><span v-else class="rotate-90">❮</span></p>
            <!-- Dropdown Render -->
            <div v-if="open" class="
                absolute top-12 right-0 p-4
                z-10
                w-32 h-auto
                rounded-md
                bg-background dark:bg-background-dark
                text-black dark:text-white
                text-lg
                flex flex-col space-y-1
                shadow-md
                select-none
            ">
                <a href="#" v-for="entry in options" :key="entry.value" class="passiveText font-bold text-xl hover:cursor-pointer hover:text-black hover:dark:text-white" @click.stop="$event.preventDefault(); changed(entry.value)">{{ entry.name }}</a>
            </div>
        </div>
    </label>
</template>