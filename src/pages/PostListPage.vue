<template>
    <div class="app">
        <h1>Posts Page</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Search..."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Create Post
            </my-button>
            <my-select 
                v-model="selectedSort"
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
        <div ref="observer" class="observer"></div>
        <!-- <div class="page__wrapper">
            <page-number
                v-for="pageNumber in totalPage"
                :page="pageNumber"
                :key="pageNumber"
                :class="{
                    'current-page': (page === pageNumber)
                }"
                
                @click="changePage(pageNumber)"
            />
        </div> -->
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
                limit: 10,
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
            const options = {
            rootMargin: "0px",
            threshold: 1.0,
            };
            const callback = (entries, observer) => {
                if (entries[0].isIntersecting && this.page < this.totalPage) {
                    this.loadMorePosts()
                    
                }
            };

            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer);
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