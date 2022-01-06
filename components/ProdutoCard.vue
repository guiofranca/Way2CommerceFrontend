<template>
    <v-card>
        <v-card-title primary-title>
            {{produto.nome}}
        </v-card-title>
        <v-card-subtitle>
            {{produto.descricao}}
        </v-card-subtitle>
        <v-card-text>
            <p>Categoria: {{produto.categoria.nome}}</p>
            <p>Código: {{produto.codigo}}</p>
            <p>Preço: {{produto.preco}}</p>
        </v-card-text>
    </v-card>
</template>
<script >
export default {
    props: ['produto']
}
</script>