<template>
  <div>
    <div
      class="row">
      <div class="col col-md-2">{{ date }}</div>
      <div
        v-for="(version, index) in versions"
        :key="index"
        class="col col-md pl-0 pr-0 pl-md-5 pr-md-5 d-none d-md-block">
        <template v-if="files[index]">
          <a
            v-if="files[index]"
            :href="files[index].link"
            :title="'Download ' + index"
            itemprop="downloadUrl">
            <strong>
              <i class="far fa-arrow-alt-circle-down"/>
              {{ files[index].modifiedDate }}
            </strong>
          </a>
          <template v-if="files[index].buildUrl">
            <a
              v-if="files[index].buildNumber"
              :href="files[index].buildUrl"
              :title="'Build number  ' + files[index].buildNumber">
              <strong>
                (#{{ files[index].buildNumber }})
              </strong>
            </a>
          </template>
          <template v-else>
            <span
              v-if="files[index].buildNumber"
              :title="'Build number  ' + files[index].buildNumber">
              <strong>
                (#{{ files[index].buildNumber }})
              </strong>
            </span>
          </template>
        </template>
      </div>
    </div>
    <div
      v-for="(version, index) in versions"
      v-if="files[index]"
      :key="index"
      class="row d-block d-md-none darkbg">
      <div class="col-5 d-inline-block">{{ version.os }}</div>
      <div
        class="col-6 d-inline-block">
        <template v-if="files[index]">

          <a
            v-if="files[index]"
            :href="files[index].link"
            :title="'Download ' + index"
            itemprop="downloadUrl">
            <strong>
              <i class="far fa-arrow-alt-circle-down"/>
              {{ files[index].modifiedDate }}
            </strong>
          </a>
          <template v-if="files[index].buildUrl">
            <a
              v-if="files[index].buildNumber"
              :href="files[index].buildUrl"
              :title="'Build number  ' + files[index].buildNumber">
              <strong>
                (#{{ files[index].buildNumber }})
              </strong>
            </a>
          </template>
          <template v-else>
            <span
              v-if="files[index].buildNumber"
              :title="'Build number  ' + files[index].buildNumber">
              <strong>
                (#{{ files[index].buildNumber }})
              </strong>
            </span>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		versions: {
			type: Object,
			default: null
		},
		files: {
			type: Object,
			default: null
		},
		date: {
			type: String,
			default: ''
		},
		test: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
