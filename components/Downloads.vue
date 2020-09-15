<template>
  <div class="container downloads">
    <div class="row thead">
      <div class="col-4 col-md-2 th">{{ version_string }}</div>
      <div
        v-for="(version, index) in versions"
        :key="index"
        class="col col-md pl-0 pr-0 pl-md-5 pr-md-5 d-none d-md-block th">{{ version.ext }}</div>
    </div>
    <transition-group
      v-if="downloads"
      :css="false"
      name="staggered-fade"
      tag="div"

      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave">
      <Download
        v-for="(download, key) in dls"
        :key="download.date"
        :test="key"
        :data-index="key"
        :date="download.date"
        :files="download.files"
        :versions="versions"
      />
    </transition-group>
    <div
      v-if="maxPage > 1"
      class="row">
      <template
        v-if="currentPage === 1 && maxPage > 1">
        <button
          class="col-sm-12"
          @click.prevent="changePage(1)">
          Show older &raquo;
        </button>
      </template>
      <template
        v-else-if="currentPage > 1 && currentPage !== maxPage && maxPage > 1">
        <button
          class="col-sm-6"
          @click.prevent="changePage(-1)">
          &laquo; Show newer
        </button>
        <button
          class="col-sm-6"
          @click.prevent="changePage(1)">
          Show older &raquo;
        </button>
      </template>
      <template
        v-else-if="currentPage > 1 && currentPage === maxPage && maxPage > 1">
        <button
          class="col-sm-12"
          @click.prevent="changePage(-1)">
          &laquo; Show newer
        </button>
      </template>
      <template
        v-else-if="maxPage === 1">
        <span class="hide"/>
      </template>
    </div>
  </div>
</template>

<script>
import Download from '~/components/Download';

export default {
	components: {
		Download
	},
	props: {
		versions: {
			type: Object,
			default: null
		},
		downloads: {
			type: Array,
			default: null
		},
		version_string: {
			type: String,
			default: 'Date'
		}
	},
	data: () => ({
		dls: [],
		count: 0,
		countStep: 10,
		currentPage: 1,
		maxPage: 0
	}),
	watch: {
		count(val) {
			var min =
				this.count - this.countStep < 1 ? 0 : this.count - this.countStep;
			if (this.count > this.downloads.length) {
				this.dls = this.downloads.slice(min, this.downloads.length);
			} else {
				this.dls = this.downloads.slice(min, this.count);
				//console.log(min + ' ' + this.count);
			}
		},
		downloads: function(_downloads) {
			var min =
				this.count - this.countStep < 1 ? 0 : this.count - this.countStep;
			if (this.count > this.downloads.length) {
				this.dls = this.downloads.slice(min, this.downloads.length);
			} else {
				this.dls = this.downloads.slice(min, this.count);
				//console.log(min + ' ' + this.count);
			}
			this.updateList();
		}
	},
	mounted: function() {
		this.count = 10;
		this.maxPage = Math.ceil(this.downloads.length / this.countStep);
		this.updateList();
	},
	methods: {
		updateList: async function() {
			this.count = this.countStep * this.currentPage;
		},
		changePage: function(num) {
			this.currentPage += num;
			if (this.currentPage < 1) this.currentPage = 1;
			/*
			if (this.countStep * this.currentPage > this.downloads.length)
				this.currentPage--;

			console.log((this.countStep * this.currentPage) % this.downloads.length);
			*/

			this.updateList();
		},
		beforeEnter: function(el) {
			el.childNodes.forEach(function(x) {
				if (x.style !== undefined) {
					x.style.opacity = 0;
					x.style.height = 0;
				}
			});
		},
		enter: function(el, done) {
			let index = el.dataset.index;
			let delay =
				(index >= this.countStep
					? index - this.count - this.countStep
					: index) * 50;

			//console.log(this.maxPage);
			setTimeout(function() {
				if (!process.server) {
					el.childNodes.forEach(function(x) {
						if (x.style !== undefined) {
							Velocity(x, { opacity: 1, height: '30px' }, { complete: done });
						}
					});
				}
			}, delay);
		},
		leave: function(el, done) {
			let index = el.dataset.index;
			let delay =
				(index >= this.countStep
					? index - this.count - this.countStep
					: index) * 50;

			setTimeout(function() {
				if (!process.server) {
					el.childNodes.forEach(function(x) {
						if (x.style !== undefined) {
							Velocity(x, { opacity: 0, height: 0 }, { complete: done });
						}
					});
				}
			}, delay);
		},
		created: function() {
			this.count = 10;
			this.updateList();
		}
	}
};
</script>

<style lang="scss">
.container.downloads {
	border-spacing: 0px 0px;
	width: 100%;
	text-align: left;
	box-shadow: 0px 5px 7px 0px #00000080;
	.row {
		height: 30px;
		overflow: hidden;

		button {
			border: 1px solid #ffffff44;

			background-color: #202020;
		}

		&:nth-child(even) {
			background-color: rgba(74, 81, 104, 0.21);
		}
		&:nth-child(odd) {
			background-color: rgba(132, 145, 189, 0.21);
		}

		div[class^='col-'],
		div[class*=' col-'] {
			line-height: 30px;
			font-size: 0.9em;
			font-family: 'Lato';

			&:first-child {
				padding-left: 5px;
			}

			&:last-child {
				padding-right: 0px;
			}
		}

		&.thead {
			background-color: rgba(74, 81, 104, 0.21);
			border-bottom: 3px solid #6e799c;

			div[class^='col-'],
			div[class*=' col-'] {
				font-family: Oswald, sans-serif;
				line-height: 30px;
				font-size: 1em;
				margin-bottom: 10px;
			}
		}
	}
}
</style>
