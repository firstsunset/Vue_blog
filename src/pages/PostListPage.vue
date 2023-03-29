<template>
    <div class="posts__page">
        <div class="posts__page-btns">
            <my-button
                @click="showDialog"
            >
                Create Post
            </my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
            <search-input
                v-model="searchQuery"
                placeholder="Search..."
                v-focus
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
        <div class="page__wrapper">
            <page-number
                v-for="pageNumber in totalPage"
                :page="pageNumber"
                :key="pageNumber"
                :class="{
                    'current-page': (page === pageNumber)
                }"
                
                @click="changePage(pageNumber)"
            />
        </div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
    export default {
        components: {
    PostForm,
    PostList,
},
        data() {
            return {
                posts: [],
                dialogVisible: false,
                isPostLoading: false,
                selectedSort: '',
                searchQuery: '',
                page: 1,
                limit: 9,
                totalPage: 0,
                sortOptions: [
                    {value: 'title', name: 'Header'},
                    {value: 'body', name: 'Description'},
                ]
            }
        },
        methods: {
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
            async fetchPosts() {
                try {
                    this.isPostLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data;    
                    this.isPostLoading = false;
                    
                } catch (error) {
                    alert('error')
                } finally {
                }
            },
            async loadMorePosts() {
                try {
                    this.page +=1;
                    this.isPostLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...response.data];    
                    this.isPostLoading = false;
                    
                } catch (error) {
                    alert('error')
                } finally {
                }
            }      
        },
        mounted() {
            this.fetchPosts();
            console.log(this.$refs.observer);
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            },
            sortAndSearchPost() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
            }
        },
        watch: {
           page() {
            this.fetchPosts()
           }
        }

}
</script>

<style>
.posts__page {
    margin: 90px auto 40px;
    width: 960px;
}
.posts__page-btns {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.page__wrapper {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.current-page {
    background: rgba(212,1,2,1);
    color: white;
}

</style>