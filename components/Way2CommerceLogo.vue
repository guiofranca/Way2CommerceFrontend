<template>
    <img
        class="Way2CommerceLogo"
        alt="Way2Commerce Logo"
        src="/Way2CommerceLogo.png"
    />
</template>

<style scoped>
    .Way2CommerceLogo {
        max-height: 300px;
        z-index: 4;
        overflow: hidden;
        animation-name: run;
        animation-duration: 2s;
    }
    @keyframes run {
        0% {
            left: 0;
            transform: translateX(100%);
        }
        50% {
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
