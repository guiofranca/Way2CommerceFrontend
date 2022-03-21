<template>
    <v-card>
        <v-card-title primary-title>
            {{produto.name}}
        </v-card-title>
        <v-card-subtitle>
            {{produto.description}}
        </v-card-subtitle>
        <v-card-text>
            <p>Categoria: {{produto.categories}}</p>
            <p>Código: {{produto.code}}</p>
            <p>Preço: {{produto.price}}</p>
        </v-card-text>
    </v-card>
</template>
<script >
export default {
    props: ['produto']
}
</script>