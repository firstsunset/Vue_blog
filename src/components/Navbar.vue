<template>
    <div class="navbar">
        <div @click="$router.push('/')">
            <img src="../assets/lettes-s-logo-icon_125964-651.avif" class="navbar__logo">
        </div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/')">Main</my-button>
            <my-button @click="$router.push('/posts')">Posts</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: black;
    box-shadow: 2px 2px 4px grey;
    display: flex;
    align-items: center;
    padding: 0 15px;
    z-index: 10;
}

.navbar__logo {
    width: 70px;
    height: 70px;
    cursor: pointer;
}
.navbar__btns {
    margin-left: auto;
}

</style>