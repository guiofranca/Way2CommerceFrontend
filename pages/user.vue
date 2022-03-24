<template>
    <v-card>
        <v-card-title primary-title>
            Olá usuário
        </v-card-title>
        <v-card-text>
            <v-text-field
                name="name"
                label="Nome"
                id="id"
                :value="$auth.user.name"
                disabled
            ></v-text-field>
            <v-text-field
                name="name"
                label="Nome"
                id="id"
                :value="$auth.user.email"
                disabled
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn 
                v-for="(role, i) in ['User', 'Moderator', 'Administrator']" 
                :key="i" 
                :color="$auth.hasScope(role) ? 'success' : 'warning'" 
                v-on:click="toggleRole(role)" 
                :disabled="btnToggleRoleDisabled"
            >
                {{role}}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            btnToggleRoleDisabled: false,
        }
    },
    mounted() {
        console.log(this.$auth);
    },
    methods: {
        async toggleRole(role) {
            this.btnToggleRoleDisabled = true;
            if(this.$auth.hasScope(role)) {
                await this.$axios.$post("Auth/RemoveRole", {name: role})
                    .then((response) => {
                        this.$auth.setUserToken(response.token);
                        this.$auth.fetchUser();
                        this.$notifier.showMessage({ content: `Função ${role} removida`, color: 'success' })
                    })
                    .catch((error) => this.$notifier.showMessage({ content: `Houve um erro. A função já está removida?`, color: 'error' }))
            } else {
                await this.$axios.$post("Auth/AddRole", {name: role})
                    .then((response) => {
                        this.$auth.setUserToken(response.token);
                        this.$auth.fetchUser();
                        this.$notifier.showMessage({ content: `Função ${role} adicionada`, color: 'success' })
                    })
                    .catch((error) => this.$notifier.showMessage({ content: `Houve um erro. A função já está aplicada?`, color: 'error' }))
            }
            this.btnToggleRoleDisabled = false;
        }
    }
}
</script>