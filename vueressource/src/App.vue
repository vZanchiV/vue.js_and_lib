<template>
  <div id="app">
    <div class="ui active dimmer" v-if="loading">
      <div class="ui loader"></div>
    </div>
    <div class="ui four column grid">
      <div class="column" v-for="user in users">
        <div class="ui card">
          <div class="content">
            <div class="header">
                <input type="text" v-model="user.name" style="with:100%">
            </div>
           <div class="meta">
             <a href="">Friends</a>
           </div>
           <div class="description">
             {{ user.address.street }} <br>
             {{ user.address.zipcode }} {{ user.address.city }} <br>
           </div>
          </div>
          <div class="extrat content">
            <div class="ui two buttons">
              <div class="ui basic green button" @click="save(user)">Modifier</div>
              <div class="ui basic red button" @click="destroy(user)">Supprimer</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  data () {
    return {
      users: [],
      sector: [],
      loading : false
    }
  },
  mounted () {

    this.$user = this.$resource('users{/id}')
    this.$user.query().then((response) => {

      this.users = response.data

    }, (response) => {console.log('erreur' , response)})


  },
  methods:  {
    save(user) {

      this.loading = true

       this.$user.update({id : user.id},{name: user.name}).then((response) => {

            
            }, (response) => {console.log('erreur' , response)
            }).then(() => {
                this.loading = false           
            })
    },
    destroy(user) {

      this.loading = true

       this.$user.remove({id : user.id}).then((response) => {
            this.users = this.users.filter(u => u !== user)

     
            }, (response) => {
              console.log('erreur' , response)
            }).then(() => {
                this.loading = false
              
            })
    }
  }
}
</script>

<style>

</style>
