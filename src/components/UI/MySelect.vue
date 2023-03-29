<template>
    <select class="select" :value="modelValue" @change="changeOption">
        <option disabled value="">Select from posts</option>
        <option 
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name: 'my-select',
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            changeOption(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
.select {
    border: none;
    color: rgba(212,1,2,1);
    font-size: 16px;
}
.select:focus {
    outline: none;
}

</style>