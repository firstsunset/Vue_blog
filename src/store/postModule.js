import api from '@/store/axios';

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortAndSearchPost(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLocaleLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, boolean) {
            state.isPostLoading = boolean
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPage(state, totalPage) {
            state.totalPage = totalPage
        },

    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await api.get('/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
            } catch (error) {
                alert('error')
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1);
                commit('setLoading', true);
                const response = await api.get('/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data]);
                commit('setLoading', false);
            } catch (error) {
                alert('error')
            } finally {
            }
        }
    },
    namespaced: true
}