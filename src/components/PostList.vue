<template>
    <div v-if="posts.length > 0" >
        <h3>Posts List</h3>
        <post-item
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        />        
    </div>
    <h2 v-else class="noposts__header">No posts</h2>
</template>

<script>
import PostItem from './PostItem.vue';
    export default {
        components: {PostItem},
        props: {
            posts: {
                type: Object,
                required: true,
            }
        }
    }

</script>

<style scoped>
.noposts__header {
    color: red;
}
</style>