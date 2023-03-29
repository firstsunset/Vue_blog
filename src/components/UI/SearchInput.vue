<template>
    <input
        class="search"
        type="text"
        :value="modelValue"
        @input="updateInput"
    >
</template>

<script>
    export default {
        name: 'search-input',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
.search {
    width: 300px;
    height: 50px;
    border: 1px solid rgba(224,224,224,1);
    border-radius: 25px;
    padding: 10px 15px;
    margin-top: 15px;
}

input:focus {
    outline: none;
}

</style>