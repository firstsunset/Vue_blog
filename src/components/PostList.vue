<template>
    <div v-if="posts.length > 0" >
        <div class="post__list">
            <post-item
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            /> 
        </div>       
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
.post__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 30px;
    row-gap: 20px;
}
.post-list-item {
  margin-right: 10px;
}
</style>