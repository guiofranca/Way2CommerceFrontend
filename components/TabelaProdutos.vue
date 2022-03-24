<template>
    <div>
        <h2>Produtos</h2>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="elevation-1"
        >
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn icon color="primary" :disabled="podeEditar" :to="`produto/${item.id}/editar`"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn icon color="red" :disabled="podeApagar" ><v-icon @click="apagarProduto(item.id)">mdi-delete</v-icon></v-btn>
            </template>
            <template v-slot:[`item.description`]="{ item }">
                <span :title="item.description">{{item.description.length > 40 ? `${item.description.substr(0,37)}...` : item.description}}</span>
            </template>
        </v-data-table>
    </div>
</template>
<script>
export default {
    props: ['produtos'],
    computed: {
        items: function() {
            return this.produtos.map(produto => {
                return {
                    id: produto.id,
                    name: produto.name,
                    code: produto.code,
                    description: produto.description,
                    price: produto.price,
                    categories: produto.categories
                        .map((cat) => cat.name)
                        .join(', '),
                }
            });
        },
        podeEditar: function() {
            return !(this.$auth.hasScope('Administrator') || this.$auth.hasScope('Moderator'))
        },
        podeApagar: function() {
            return !this.$auth.hasScope('Administrator')
        }
    },
    data () {
        return {
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Código', value: 'code' },
                { text: 'Nome', value: 'name' },
                { text: 'Descrição', value: 'description' },
                { text: 'Preço', value: 'price' },
                { text: 'Categoria', value: 'categories' },
                { text: 'Ações', value: 'actions' },
            ],
        }
    },
    methods: {
        async apagarProduto(id) {
            console.log(this.$auth.hasScope('Administrator'), this.$auth.hasScope('Moderator'))
            if(confirm("Tem certeza? Não da pra desfazer.")){
                await this.$axios.$delete(`Product/${id}`)
                    .then(r => {
                        this.$notifier.showMessage({ content: 'Produto excluído!', color: 'success' })
                        $nuxt.$emit('produtoApagado', id)
                    })
                    .catch(r => this.$notifier.showMessage({ content: r.response.data.message, color: 'error' }))
            }
        }
    }
}
</script>