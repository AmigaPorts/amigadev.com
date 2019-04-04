<template>
  <div
    id="amigadev-invite-popover">
    <label for="amigadev-invite-email">Bjud in fler producenter till Västernorrlandsgården!</label>
    <div class="input-group mb-3 mb-md-1">
      <input
        id="amigadev-invite-email"
        v-model="email"
        type="email"
        name="email"
        class="form-control"
        placeholder="Ange e-postadress här"
        aria-label="Ange e-postadress här"
        aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button
          class="btn btn-primary"
          type="button"
          @click="sendInvite">Bjud in</button>
      </div>
    </div>
    <div
      id="invite-message"
      class="opacity-0 alert"
      role="alert">
      <small>{{ popoverMessage }}</small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button,
button:hover,
button:focus,
button:active {
	outline: solid 4px white;
	outline-offset: -4px;
	font-size: 12px;
}
input {
	border-color: white;
	border-radius: 0;
	font-size: 12px;
}
button {
	padding: 0.375rem 0.75rem;
}
</style>

<script>
export default {
	data() {
		return {
			email: '',
			popoverShow: false,
			popoverMessage: ''
		};
	},
	methods: {
		async sendInvite() {
			var elm = document.getElementById('invite-message');

			try {
				const response = await this.$axios.$post('/v1/invite', {
					email: this.email
				});

				if (elm.classList.contains('opacity-0')) {
					elm.classList.remove('opacity-0');
					elm.classList.add('fade-out');
				}

				if (elm.classList.contains('alert-success')) {
					elm.classList.remove('alert-success');
				}

				if (elm.classList.contains('alert-danger')) {
					elm.classList.remove('alert-danger');
				}

				elm.classList.add('alert-success');

				elm.innerHTML = '<small>' + response.message + '</small>';
				var newone = elm.cloneNode(true);
				elm.parentNode.replaceChild(newone, elm);

				this.popoverMessage = response.message;
				this.popoverShow = true;
			} catch (e) {
				if (elm.classList.contains('opacity-0')) {
					elm.classList.remove('opacity-0');
					elm.classList.add('fade-out');
				}

				if (elm.classList.contains('alert-success')) {
					elm.classList.remove('alert-success');
				}

				if (elm.classList.contains('alert-danger')) {
					elm.classList.remove('alert-danger');
				}

				elm.classList.add('alert-danger');

				elm.innerHTML = '<small>' + e.response.data.message + '</small>';
				var newone = elm.cloneNode(true);
				elm.parentNode.replaceChild(newone, elm);

				this.popoverMessage = e.response.data.message;
				this.popoverShow = true;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.opacity-0 {
	opacity: 0;
}
.fade-out {
	opacity: 0;
	animation: fadeOut ease 5s;
	-webkit-animation: fadeOut ease 5s;
	-moz-animation: fadeOut ease 5s;
	-o-animation: fadeOut ease 5s;
	-ms-animation: fadeOut ease 5s;
}

@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	30% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-moz-keyframes fadeOut {
	0% {
		opacity: 1;
	}
	30% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-webkit-keyframes fadeOut {
	0% {
		opacity: 1;
	}
	30% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-o-keyframes fadeOut {
	0% {
		opacity: 1;
	}
	30% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-ms-keyframes fadeOut {
	0% {
		opacity: 1;
	}
	30% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
