<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="mb-4">
        <v-card-title>
          Way2 Commerce!
        </v-card-title>
        <v-card-text class="logo py-4 d-flex justify-center">
          <Way2CommerceLogo />
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline">
          Bem-vindo ao Way2 Commerce!
        </v-card-title>
        <v-card-text>
          <p>Olá! Eu sou o Guilherme França, desenvolvedor .NET em treinamento na Way2</p>
          <p>Way2 Commerce é uma forma de aprendizagem estilo Bootcamp do Time PIM</p>
          <p>Backend em .NET 6 Web API.</p>
          <p>Banco de dados SQL Server Express</p>
          <p>Front-end em NuxtJS</p>
          <p class="text-decoration-line-through">Backend hospedado na minha casa 😬</p>
          <p class="text-decoration-line-through">Frontend estaticamente hospedado via Github Pages</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/produto"
          >
            Produtos
          </v-btn>
          <v-btn
            color="primary"
            nuxt
            to="/categoria"
          >
            Categorias
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  auth: false
}
</script>
