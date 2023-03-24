<template>
    <div v-if="posts.length > 0" >
        <h3>Posts List</h3>
        <transition-group name="post-list">
            <post-item
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            /> 
        </transition-group>       
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

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, .post-list-leave-active {
  transition: all 0.4s;
}
.post-list-enter, .post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.4s ease;
}

</style>