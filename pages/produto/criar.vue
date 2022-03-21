<template>
    <v-row>
        <v-col lg="4">
            <v-card>
                <v-card-title>
                    Criar um produto
                </v-card-title>
                <v-card-text>
                    <v-text-field 
                        label="Código"
                        v-model="form.code"
                        :error-messages="errors.Code"
                    ></v-text-field>
                    <v-text-field 
                        label="Nome"
                        v-model="form.name"
                        :error-messages="errors.Name"
                    ></v-text-field>
                    <v-textarea
                        label="Descrição"
                        v-model="form.description"
                        rows="2"
                        :error-messages="errors.Description"
                        ></v-textarea>
                    <v-text-field
                        label="Preço"
                        v-model="form.price"
                        type="number"
                        :error-messages="errors.Price"
                    ></v-text-field>
                    <v-select
                        :items="categorias"
                        item-text="name"
                        item-value="id"
                        label="Categoria"
                        v-model="form.categoryIds"
                        :error-messages="errors.CategoriesIds"
                        multiple
                    ></v-select>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="criar()">Salvar</v-btn>
                <v-btn color="default" to="/produto">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            categorias: [],
            carregando: true,
            rules: [
                //value => !!value || 'Required.',
                //value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            form: {
                name: '',
                code: '',
                description: '',
                price: 0.00,
                categoryIds: [],
            },
            errors: {}
        }
    },
    async mounted() {
        await this.$axios.$get("/Category")
            .then((response) => {
                this.categorias = response
                this.carregando = false
            })
            .catch((response) => (console.log(response)))

    },
    methods: {
        async criar() {
            await this.$axios.$post("/Product", this.form)
                .then((response) => {
                    this.$notifier.showMessage({ content: "Produto criado com sucesso", color: 'success' })
                    this.$router.push('/produto')
                })
                .catch(error => {
                    this.$notifier.showMessage({ content: error.response.data.title, color: 'error' })
                    this.errors = error.response.data.errors
                })
        }
    }
}
</script>
