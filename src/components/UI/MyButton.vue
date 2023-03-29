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
    border: none;
    font-size: 16px;
    font-weight: bold;
    background: none;
    color: rgba(212,1,2,1);
    height: 30px;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
}
</style>