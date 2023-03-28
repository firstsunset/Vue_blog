<template>
    <div>
        <h1>Post page {{ $route.params.id }}</h1>
        <h2>Title: {{ post.title }}</h2>
        <p>Description: {{  post.body }}</p>
        <my-button @click="$router.back()">Back</my-button>
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
                    console.log(this.post);
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

</style>