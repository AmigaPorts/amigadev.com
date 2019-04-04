<template>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th
          v-for="(version, index) in versions"
          :key="index">{{ version.ext }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(download, index) in downloads"
        :key="index">
        <td>{{ index }}</td>
        <td
          v-for="(dl, index) in versions"
          :key="index">
          <a
            v-if="download[index]"
            :href="download[index].link"
            :title="'Download ' + index"
            itemprop="downloadUrl">
            <strong>
              <i class="far fa-arrow-alt-circle-down"/>
              {{ download[index].modifiedDate }}
            </strong>
          </a>
        </td>
      </tr>
    </tbody>
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
			type: Object,
			default: null
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
