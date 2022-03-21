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
    </v-card>
</template>