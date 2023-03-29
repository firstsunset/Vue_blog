import Main from '@/pages/Main.vue';
import PostListPage from '@/pages/PostListPage.vue';
import PostSinglePage from '@/pages/PostSinglePage.vue';
import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostListPage
    },
    {
        path: '/posts/:id',
        component: PostSinglePage,
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;