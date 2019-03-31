<template>
  <section>
    <div class="container-fluid px-0">
      <div class="w-100 amigadev-search-top-container">
        <div class="input-group px-5 mb-3">
          <div class="amigadev-search-input-container mx-md-auto">
            <input
              id="amigadev-search-input"
              v-model="searchPhrase"
              :placeholder="'Sök bland '+numProducts+' produkter och '+numProducers+' producenter'"
              :aria-label="'Sök bland '+numProducts+' produkter och '+numProducers+' producenter'"
              autocomplete="off"
              type="text"
              class="form-control text-center amigadev-search-input"
              aria-describedby="basic-addon2"
              @keyup="applyFiltersAndUpdateResults">
            <font-awesome-layers class="amigadev-search-icon">
              <font-awesome-icon :icon="['far', 'search']" />
            </font-awesome-layers>
          </div>

        </div>
        <div class="text-center">
          <BigFilterButton
            :button-text="'Producenter'"
            :primary-color="'bg-primary'"
            :checked="bigButtonToggleValues.producer"
            @click.native="toggleBigChecked('producer')"
          />
          <BigFilterButton
            :button-text="'Produkter'"
            :primary-color="'bg-primary'"
            :checked="bigButtonToggleValues.product"
            @click.native="toggleBigChecked('product')"
          />
        </div>
      </div>
    </div>
    <Loading 
      :text="'Hämtar produkter och producenter'"
      :show="loading" 
      class="pt-4"/>
    <div 
      v-show="!loading" 
      class="container pb-5 pt-4">
      
      <div class="text-center amigadev-filter-button-container mx-auto">
        <FilterButton
          v-for="(filter, index) in filters"
          :key="index"
          :filter-id="filter.filterId"
          :name="filter.name"
          :checked="filter.checked"
          class="mx-1 mx-md-2"
          @click.native="toggleChecked(index)"
          
        />
      </div>
      <div class="text-right">
        <font-awesome-icon
          :icon="['fas', 'th']" 
          :class="[listView ? 'text-dark' : 'text-primary'] + ' amigadev-view'" 
          @click="setListView(false)" />
        <font-awesome-icon 
          :icon="['fas', 'bars']"
          :class="[listView ? 'text-primary' : 'text-dark'] + ' amigadev-view'" 
          @click="setListView(true)" />
      </div>
      <hr>
      <div v-if="listView">
        <div class="row font-weight-bold mb-1">
          <div class="col-12 col-md-3 text-center text-md-left"/>
          <div class="col-4 col-md-3 text-center text-md-left">Producent</div>
          <div class="col-4 col-md-3 text-center text-md-left">Telefonnummer</div>
          <div class="col-4 col-md-3 text-center text-md-left">E-postadress</div>
        </div>
        <div 
          v-for="(searchResult, index) in searchResults"
          :key="index"
          class="row border-top mb-1">
          <div :class="[searchResult.type == 'producer' ? 'bg-secondary' : 'bg-primary'] + ' text-white text-center col-12 col-md-3'">{{ searchResult.type == 'producer' ? 'Producent' : searchResult.title }}</div>
          <div class="col-4 col-md-3 text-center text-md-left"><nuxt-link :to="'/' + [searchResult.type == 'producer' ? searchResult.slug : searchResult.parentSlug]">
            {{ searchResult.type == 'producer' ? searchResult.title : searchResult.parentTitle }}
          </nuxt-link></div>
          <div class="amigadev-table-view-word-break col-4 col-md-3 text-center text-md-left">
            <a 
              :href="'tel:' + searchResult.phone" 
              target="_top">
              {{ searchResult.phone }}
            </a>
          </div>
          <div class="amigadev-table-view-word-break col-4 col-md-3 text-center text-md-left">
            <a 
              :href="'mailto:' + searchResult.mail" 
              target="_top">
              {{ searchResult.mail }}
            </a>
          </div>
        </div>
      </div>
      
      <div 
        v-if="!listView" 
        class="row mt-3">
        <Downloads
          v-for="(searchResult, index) in searchResults"
          :key="index"
          :category="filters[searchResult.categories[0]].name"
          :title="searchResult.title"
          :image-url="searchResult.imageUrl"
          :producer-slug="searchResult.parentSlug"
          :slug="searchResult.slug"
          :type="searchResult.type"
        />
      </div>
    </div>
  </section>
</template>

<script>
import FilterButton from '~/components/FilterButton'
import BigFilterButton from '~/components/BigFilterButton'
import Downloads from '~/components/Downloads'
import Loading from '~/components/Loading'

export default {
  components: {
    FilterButton,
    BigFilterButton,
    Downloads,
    Loading
  },
  data() {
    return {
      listView: false,
      loading: true,
      searchPhrase: '',
      numProducers: 0,
      numProducts: 0,
      filters: [],
      items: [],
      bigButtonToggleValues: {
        producer: true,
        product: true
      },
      appliedFilters: [],
      searchResults: []
    }
  },
  mounted() {
    this.fetchSearchDataAndUpdateResults()
  },
  methods: {
    async fetchSearchDataAndUpdateResults() {
      this.filters = await this.$axios.$get('/v1/search/categories')
      this.items = await this.$axios.$get('/v1/search/items')

      this.applyFiltersAndUpdateResults()
    },
    applyFiltersAndUpdateResults() {
      this.updateAppliedFilters()
      this.updateResultBasedOnAppliedFilters()
    },
    updateAppliedFilters() {
      this.appliedFilters = []
      for (let filter in this.filters) {
        this.filters[filter].name = this.filters[filter].name.replace(
          '&amp;',
          '&'
        )
        if (this.filters[filter].checked) {
          this.appliedFilters.push(this.filters[filter].filterId)
        }
      }
    },
    updateResultBasedOnAppliedFilters() {
      this.searchResults = []
      this.numProducers = this.numProducts = 0
      for (let item in this.items) {
        //Compare two arrays and push to searchResult: []
        if (this.items[item].type == 'producer') {
          this.numProducers++
        } else if (this.items[item].type == 'product') {
          this.numProducts++
        }
        if (
          this.items[item].categories.some(
            r => this.appliedFilters.indexOf(r) >= 0
          ) ||
          this.appliedFilters.length == 0
        ) {
          if (
            (this.items[item].type == 'producer' &&
              this.bigButtonToggleValues.producer) ||
            (this.items[item].type == 'product' &&
              this.bigButtonToggleValues.product)
          ) {
            let title = this.items[item].title.toLowerCase()
            let searchPhrase = this.searchPhrase.toLowerCase()
            if (title.includes(searchPhrase)) {
              this.searchResults.push(this.items[item])
            }
          }
        }
      }

      this.loading = false
    },
    toggleChecked(index) {
      this.filters[index].checked = !this.filters[index].checked
      this.applyFiltersAndUpdateResults()
    },
    toggleBigChecked(type) {
      if (type == 'producer') {
        this.bigButtonToggleValues.producer = !this.bigButtonToggleValues
          .producer
      } else if (type == 'product') {
        this.bigButtonToggleValues.product = !this.bigButtonToggleValues.product
      }
      this.applyFiltersAndUpdateResults()
    },
    setListView(value) {
      this.listView = value
    }
  }
}
</script>

<style lang="scss" scoped>
td,
th {
  padding: 2px 8px;
}

th {
  border-top: none;
}

hr {
  margin-top: 0;
}

.amigadev-view {
  font-size: 24px;
  margin-left: 4px;
  cursor: pointer;
}

.amigadev-table-view-word-break {
  word-break: break-all;
}
</style>
