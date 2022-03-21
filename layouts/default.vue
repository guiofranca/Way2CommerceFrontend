<template>
  <v-app dark>
    <Snackbar />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append v-if="this.$auth.loggedIn">
        <v-list>
          <v-list-item
            to="user"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{$auth.user.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-btn block color="primary" dark v-on:click="logout">Sair</v-btn>
        </v-list>
      </template>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-tag',
          title: 'Categoria',
          to: '/categoria'
        },
        {
          icon: 'mdi-package-variant',
          title: 'Produto',
          to: '/produto'
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Way2 Commerce'
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
