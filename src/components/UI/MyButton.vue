<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
.btn {
    margin: 10px 15px;
    border: 1px solid teal;
    background: none;
    color: teal;
    height: 30px;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
}
</style>