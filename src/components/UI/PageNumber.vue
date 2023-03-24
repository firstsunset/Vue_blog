<template>
    <div class="page">
        {{ page }}
    </div>
</template>

<script>
    export default {
        name: 'page-number',
        props: {
            page: {
                type: Number,
                default: 1,
            }
        }
        
    }
</script>

<style scoped>
.page {
    width: 30px;
    height: 30px;
    border: 1px solid teal;
    border-radius: 50%;
    text-align: center;
    padding-top: 5px;
    cursor: pointer;
}


</style>