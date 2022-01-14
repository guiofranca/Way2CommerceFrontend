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
                <v-btn icon color="primary" :to="`produto/${item.id}/editar`"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn icon color="red"><v-icon @click="apagarProduto(item.id)">mdi-delete</v-icon></v-btn>
            </template>
            <template v-slot:[`item.descricao`]="{ item }">
                <span :title="item.descricao">{{item.descricao.length > 40 ? `${item.descricao.substr(0,37)}...` : item.descricao}}</span>
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
                    nome: produto.nome,
                    codigo: produto.codigo,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    dataCriacao: (new Date(produto.dataCriacao)).toLocaleString(),
                    categoria: produto.categoria.nome,
                }
            });
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
                { text: 'Código', value: 'codigo' },
                { text: 'Nome', value: 'nome' },
                { text: 'Descrição', value: 'descricao' },
                { text: 'Preço', value: 'preco' },
                { text: 'Data de cadastro', value: 'dataCriacao' },
                { text: 'Categoria', value: 'categoria' },
                { text: 'Ações', value: 'actions' },
            ],
        }
    },
    methods: {
        async apagarProduto(id) {
            if(confirm("Tem certeza? Não da pra desfazer.")){
                await this.$axios.$delete(`Produto/${id}`)
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