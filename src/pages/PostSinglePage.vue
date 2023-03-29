<template>
    <div class="post">
        <div class="post__img">
            <div class="post__header">{{ post.title }}</div>
            <h3>Post page {{ $route.params.id }}</h3>
        </div>
        <div class="post__main">
            <p class="post__main-title">{{ post.title }}</p>
            <p class="post__main-description">Description: {{  post.body }}</p>
            <my-button @click="$router.back()">Back</my-button>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return {
                post: {},
            }
        },
        
        methods: {
            async getPostById() {
                const id = this.$route.params.id;
                try {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
                    this.post = response.data;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        mounted() {
            this.getPostById();
        }
        
    }
</script>

<style scoped>
.post__img {
    background: linear-gradient(rgba(17, 16, 16, 0.3),
    rgba(17, 16, 16, 0.3)), url('../assets/post-img.jpg');
    width: 100%;
    height: 600px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}

.post__main {
    margin: 40px 100px;
}

.post__main-title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 40px;
}
.post__header {
    z-index: 100;
    padding: 40px;
    font-size: 60px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
}

.post__main-description {
    font-size: 30px;
    color: #4c4c4c;;
}
</style>