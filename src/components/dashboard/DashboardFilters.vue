<template lang="pug">
  v-container(grid-list-xs text-xs-center)
    v-layout(row wrap)
        v-flex(xs2)
            v-select(
                v-model="emptyApp"
                :items="config.platforms"
                :label="this.$t('dashboard_view.app')"
                tags
                autocomplete
                clearable
                @change="checkIfApplyButtonAvailable"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    )
                        v-avatar(class="accent") {{ data.item.slice(0, 1).toUpperCase() }}
                        | {{ data.item }}
        v-flex(xs2)
            v-select(
                v-model="emptyCountry"
                :items="config.countries"
                item-text="name"
                item-value="name"
                :label="this.$t('dashboard_view.country')"
                tags
                autocomplete
                clearable
                @change="checkIfApplyButtonAvailable"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs2)
            v-select(
                v-model="emptyFormat"
                :items="config.formats"
                :label="this.$t('dashboard_view.format')"
                tags
                autocomplete
                clearable
                @change="checkIfApplyButtonAvailable"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs2)
            v-select(
                v-model="emptyNetwork"
                :items="config.networkIds"
                :label="this.$t('dashboard_view.network')"
                tags
                autocomplete
                clearable
                @change="checkIfApplyButtonAvailable"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs4 class="dau buttons-container")
            v-btn(
                :disabled="!valid"
                class="white--text"
                color="buttonColor"
                @click.native="resetFilters"
                ) {{ $t('dashboard_view.reset_filters')}}
            v-btn(
                class="white--text"
                color="buttonColor"
                @click.native="accountEventHandler"
                :disabled="!valid"
                ) {{ $t('dashboard_view.apply_filters')}}
            v-checkbox(
                class="dau__text"
                v-model="dau"
                label="Add DAU/AU data"
                color="indigo darken-3"
                value="indigo darken-3"
                hide-details)

        //- v-flex(xs4)
        //-     v-layout(column class="buttons-container")
        //-         v-flex(pb-0)
        //-             v-btn(
        //-                 :disabled="!valid"
        //-                 class="white--text"
        //-                 color="buttonColor"
        //-                 @click.native="resetFilters"
        //-                 ) {{ $t('dashboard_view.reset_filters')}}
        //-             v-btn(
        //-                 class="white--text"
        //-                 color="buttonColor"
        //-                 @click.native="accountEventHandler"
        //-                 :disabled="!valid"
        //-                 ) {{ $t('dashboard_view.apply_filters')}}
        //-         v-flex(class="dau" pt-0)
        //-             v-checkbox(
        //-                 v-model="dau"
        //-                 label="Add DAU/AU data"
        //-                 color="indigo darken-3"
        //-                 value="indigo darken-3"
        //-                 hide-details)


</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-filters',
  data () {
    return {
      emptyApp: [],
      emptyCountry: [],
      emptyFormat: [],
      emptyNetwork: [],
      dau: false,
      valid: false
    }
  },
  watch: {
    emptyApp (val) {
      this.checkIfApplyButtonAvailable()
    },
    emptyCountry (val) {
      this.checkIfApplyButtonAvailable()
    },
    emptyFormat (val) {
      this.checkIfApplyButtonAvailable()
    },
    emptyNetwork (val) {
      this.checkIfApplyButtonAvailable()
    }
  },
  computed: {
    ...mapGetters({
      config: 'dashboardFiltersGetter'
    })
  },
  methods: {
    resetFilters () {
      this.emptyApp = []
      this.emptyCountry = []
      this.emptyFormat = []
      this.emptyNetwork = []
      this.valid = false
    },
    checkIfApplyButtonAvailable () {
      if (this.emptyApp.length || this.emptyCountry.length || this.emptyFormat.length || this.emptyNetwork.length) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
        font-size: 11px;
    }
    .dau {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

</style>










