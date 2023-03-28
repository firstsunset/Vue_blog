<template>
    <div class="post">
        <div>
            <div>Header: <strong>{{ post.title }}</strong></div>
            <div>Description: <strong>{{ post.body }}</strong></div>
        </div>
        <div class="post__btns">
            <my-button
                @click="$router.push(`/posts/${post.id}`)"
            >
                Open
            </my-button>
            <my-button
                @click="$emit('remove', post)"
            >
                Delete
            </my-button>
        </div>
        
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true,
            }
        },
    }
</script>

<style scoped>
.post {
    margin-top: 15px;
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>