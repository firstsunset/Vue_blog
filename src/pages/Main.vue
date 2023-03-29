<template>
    <div class="posts__page">
        <div class="posts__page-header">
            <h1><span class="posts__page-header-red">Posts</span> Page</h1>
            <search-input
                :model-value="searchQuery"
                @update:model-value="setSearchQuery"
                placeholder="Search..."
                v-focus
            />
        </div>
        <div class="card">
            <div class="card__img" >
                <img class="img" src="../assets/main-img.avif">
            </div>
            <div class="card__main">
                <h1 class="card__title">Sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h1>
                <div class="card__description">Description: est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla</div>
            </div>        
        </div>     
        <post-list 
            :posts="sortAndSearchPost"
            @remove="removePost"
            v-if="!isPostLoading"
        />
        <div v-else>Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

    export default {
        components: {
    PostForm,
    PostList,
},
        data() {
            return {
                dialogVisible: false,
            }
        },
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            ...mapActions({
                fetchPosts: 'post/fetchPosts',
                loadMorePosts: 'post/loadMorePosts'

            }),
            createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog() {
                this.dialogVisible = true;
            },
            changePage(pageNumber) {
                this.page = pageNumber;
            },
                  
        },
        mounted() {
            this.fetchPosts();
        },
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                isPostLoading: state => state.post.isPostLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPage: state => state.post.totalPage,
                sortOptions: state => state.post.sortOptions
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortAndSearchPost: 'post/sortAndSearchPost'
            })
        }
}
</script>

<style scoped>
.posts__page {
    margin-top: 90px;
    margin-left: auto;
    margin-right: auto;
    width: 960px;
}
.posts__page-btns {
    display: flex;
    justify-content: space-between;
}
.posts__page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.posts__page-header-red {
    color: rgba(212,1,2,1);
}
.posts__page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.card {
    width: 940px;
    height: 425px;
    box-shadow: rgba(0,0,0,0.25) 0 3px 11px 0;
    display: flex;
    margin-bottom: 40px;
}

.img {
    width: 550px;
    height: 425px;
}

.card__main {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 15px 20px 15px 40px;
}

.card__title {
    color: rgba(212,1,2,1);
}
</style>