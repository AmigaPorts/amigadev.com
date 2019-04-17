<template>
  <div class="container downloads">
    <div class="row thead">
      <div class="col-sm-2 th">{{ version_string }}</div>
      <div
        v-for="(version, index) in versions"
        :key="index"
        class="col-sm th">{{ version.ext }}</div>
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
        v-if="currentPage == 1 && maxPage > 1">
        <button
          class="col-sm-12"
          @click.prevent="changePage(1)">
          &laquo; Show more &raquo;
        </button>
      </template>
      <template
        v-else-if="currentPage > 1 && currentPage != maxPage && maxPage > 1">
        <button
          class="col-sm-6"
          @click.prevent="changePage(-1)">
          &laquo; Show less &raquo;
        </button>
        <button
          class="col-sm-6"
          @click.prevent="changePage(1)">
          &laquo; Show more &raquo;
        </button>
      </template>
      <template
        v-else-if="currentPage > 1 && currentPage == maxPage && maxPage > 1">
        <button
          class="col-sm-12"
          @click.prevent="changePage(-1)">
          &laquo; Show less &raquo;
        </button>
      </template>
      <template
        v-else-if="maxPage == 1"/>
    </div>
  </div>
</template>

<script>
import Download from '~/components/Download';
import Velocity from 'velocity-animate';

export default {
	components: {
		Download,
		Velocity
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
			if (this.dls.length !== val) {
				if (this.count > this.downloads.length)
					this.dls = this.downloads.slice(0, this.downloads.length);
				else this.dls = this.downloads.slice(0, this.count);
			}
		},
		downloads: function(_downloads) {
			this.updateList();
		}
	},
	mounted() {
		this.count = 10;
		this.maxPage = Math.ceil(this.downloads.length / this.countStep);
		this.updateList();
	},
	methods: {
		async updateList() {
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
			el.style.opacity = 0;
			el.style.height = 0;
		},
		enter: function(el, done) {
			var index = el.dataset.index;
			var delay =
				(index >= this.count - this.countStep
					? index - this.count - this.countStep
					: index) * 150;

			console.log(this.maxPage);
			setTimeout(function() {
				Velocity(el, { opacity: 1, height: '30px' }, { complete: done });
			}, delay);
		},
		leave: function(el, done) {
			var index = el.dataset.index;
			var delay =
				(index >= this.count - this.countStep
					? index - this.count - this.countStep
					: index) * 50;

			setTimeout(function() {
				Velocity(el, { opacity: 0, height: 0 }, { complete: done });
			}, delay);
		},
		created() {
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
			&:hover {
				/**/
			}
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
