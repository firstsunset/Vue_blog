<template>
    <div class="post">
        <div class="post__img" @click="$router.push(`/posts/${post.id}`)">
            <img class="img" src="../assets/post-img.jpg" alt="">
        </div>
        <h1 class="post__title">{{ post.title }}</h1>
        <div class="post__main">
            <div class="post__description">{{ post.body }}</div>
            <div class="post__btns">
                <my-button
                    @click="$router.push(`/posts/${post.id}`)"
                >
                    Read more
                </my-button>
                <my-button
                    @click="$emit('remove', post)"
                >
                    Delete
                </my-button>
            </div>
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
    width: 295px;
    box-shadow: rgba(0,0,0,0.25) 0 3px 11px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.post__img {
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
}

.img {
    width: 295px;
    height: 200px;
}
.post__img img {
    transition: 1s;
    display: block;
   }
.post:hover img {
    transform: scale(1.2);
}
.post__main {
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
}

.post__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 15px;
}

.post__description {
    color: #747474;
}
.post__btns {
   display: flex;
   justify-content: space-between;
   align-items: center;
}
</style>