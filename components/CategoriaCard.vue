<template>
    <v-card>
        <v-card-title primary-title>
            {{categoria.nome}}
        </v-card-title>
    </v-card>
</template>
<script >
export default {
    props: ['categoria']
}
</script>