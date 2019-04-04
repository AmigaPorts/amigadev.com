<template>
  <table id="staggered-list-demo">
    <thead>
      <tr>
        <th>Date</th>
        <th
          v-for="(version, index) in versions"
          :key="index">{{ version.ext }}</th>
      </tr>
    </thead>
    <transition-group
      v-if="shorterList"
      id="files"
      :css="false"
      name="staggered-fade"

      tag="tbody"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave">
      <tr
        v-for="(download, key) in shorterList"
        :key="download.date"
        :data-index="key">
        <td>{{ download.date }}</td>
        <td
          v-for="(dl, index) in versions"
          :key="index">
          <div v-if="download.files[index]">
            <a
              v-if="download.files[index]"
              :href="download.files[index].link"
              :title="'Download ' + index"
              itemprop="downloadUrl">
              <strong>
                <i class="far fa-arrow-alt-circle-down"/>
                {{ download.files[index].modifiedDate }}
              </strong>
            </a>
            <a
              v-if="download.files[index].buildNumber"
              :href="download.files[index].buildUrl"
              :title="'Build number  ' + download.files[index].buildNumber">
              <strong>
                (#{{ download.files[index].buildNumber }})
              </strong>
            </a>
          </div>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
export default {
	props: {
		versions: {
			type: Object,
			default: null
		},
		downloads: {
			type: Array,
			default: null
		},
		count: {
			type: Number,
			default: 10
		}
	},
	computed: {
		shorterList: function() {
			if (this.downloads) return this.downloads.slice(0, this.count);
		}
	},
	methods: {
		dls: function() {
			return this.downloads.slice(0, 10);
		},
		beforeEnter: function(el) {
			el.style.opacity = 0;
			el.style.height = 0;
		},
		enter: function(el, done) {
			var delay = el.dataset.index * 150;
			setTimeout(function() {
				Velocity(el, { opacity: 1, height: '1.6em' }, { complete: done });
			}, delay);
		},
		leave: function(el, done) {
			var delay = el.dataset.index * 150;
			setTimeout(function() {
				Velocity(el, { opacity: 0, height: 0 }, { complete: done });
			}, delay);
		}
	}
};
</script>

<style lang="scss" scoped>
table {
	border-spacing: 0px 0px;
	width: 100%;
	text-align: left;
	box-shadow: 0px 5px 7px 0px #00000080;
	tr {
		height: 30px;

		&:nth-child(even) {
			background-color: rgba(109, 120, 156, 0.21);
		}
		td:first-child,
		th:first-child {
			padding-left: 5px;
		}
		td:last-child,
		th:last-child {
			padding-right: 0px;
		}
		th {
			border-bottom: 3px solid #6e799c;
			line-height: 2em;
			font-size: 1.2em;
			margin-bottom: 10px;
		}
		td {
			line-height: 1.5em;
			font-size: 0.9em;
			font-family: 'Lato' !important;

			a {
				color: #f0bc02;

				&:hover {
					color: #997800;
				}
			}
		}
	}
}
</style>
