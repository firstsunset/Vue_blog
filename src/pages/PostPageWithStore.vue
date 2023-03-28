<template>
    <div class="app">
        <h1>Posts Page</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search..."
            v-focus
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Create Post
            </my-button>
            <my-select 
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form
            @create="createPost"
            />
        </my-dialog>        
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
        },
        watch: {
        //    page() {
        //     this.fetchPosts()
        //    }
        }

}
</script>

<style>
.app__btns {
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.current-page {
    background: teal;
    color: white;
}

.observer {
    height: 30px;
    background: gold;
}
</style>