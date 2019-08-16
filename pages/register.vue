<template>
  <div class="container text-center">

    <div
      v-if="roles"
      class="form-group">
      <h1 class="mb-3 mt-5">Jag vill gå med i Västernorrlandsgården!</h1>
      <div class="row">
        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="firstname"
            type="text"
            class="form-control my-2"
            placeholder="Förnamn">
        </div>
        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="lastname"
            type="text"
            class="form-control my-2"
            placeholder="Efternamn">
        </div>
        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="email"
            type="email"
            class="form-control my-2"
            placeholder="E-postadress">
        </div>
        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="email_again"
            type="email"
            class="form-control my-2"
            placeholder="Upprepa e-postadress">
        </div>
        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="organization"
            type="text"
            class="form-control my-2"
            placeholder="Företag">
        </div>
        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="organization_number"
            type="number"
            class="form-control my-2"
            placeholder="Organisationsnummer">
        </div>

        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="postal_address"
            type="text"
            class="form-control my-2"
            placeholder="Adress">
        </div>
        <div class="col-md-6">
          <input
            id="exampleFormControlInput1"
            v-model="city"
            type="text"
            class="form-control my-2"
            placeholder="Postort">
        </div>
      </div>
      <div
        v-for="(forRole, index) in roles"
        :key="index"
        class="radio pt-2">
        <label><input
          :value="forRole.key"
          type="radio"
          name="optradio"
          @click="changeRole(forRole.key)">{{ forRole.value }}</label>
      </div>
      <div class="my-3">
        <input
          id="defaultCheck1"
          v-model="checked"
          class="form-check-input"
          type="checkbox">
        <label
          class="form-check-label"
          for="defaultCheck1">
          Jag godkänner Västernorrlandsgårdens personuppgiftspolicy
        </label>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary amigadev-button"
          @click="sendRegisterRequest">
          Skicka
        </button>
      </div>
      <p class="mt-4">{{ repsponseMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
	auth: true,
	components: {},
	data() {
		return {
			repsponseMessage: '',
			roles: null,
			checked: false,
			firstname: '',
			lastname: '',
			organization: '',
			organization_number: '',
			postal_address: '',
			city: '',
			role: '',
			email: '',
			email_again: ''
		};
	},
	mounted() {
		this.getRoles();
	},
	methods: {
		async sendRegisterRequest() {
			if (this.checked && this.role && this.isEverythingChecked()) {
				var elm = document.getElementById('invite-message');
				try {
					const response = await this.$axios.$post('/v1/users/submit', {
						firstname: this.firstname,
						lastname: this.lastname,
						organization: this.organization,
						organization_number: this.organization_number,
						postal_address: this.postal_address,
						city: this.city,
						role: this.role,
						email: this.email,
						email_again: this.email_again
					});
					this.repsponseMessage =
						'Din registrering har nu skickats in. Västernorrlandsgården kommer inom kort godkänna din registrering.';
					this.clearFields();
				} catch (e) {
					//console.log('Something went wrong: ', e);
					this.repsponseMessage = 'Något gick fel. Var vänlig försök igen.';
				}
			} else {
				this.repsponseMessage = 'Alla fält är inte ifyllda.';
			}
		},
		async getRoles() {
			const roles = await this.$axios.$get('/v1/users/roles');
			this.roles = roles;
		},
		changeRole(newRole) {
			this.role = newRole;
		},
		isEverythingChecked() {
			if (
				this.firstname != '' &&
				this.lastname != '' &&
				this.organization != '' &&
				this.organization_number != '' &&
				this.postal_address != '' &&
				this.city != '' &&
				this.role != '' &&
				this.email != '' &&
				this.email_again != ''
			) {
				return true;
			} else {
				return false;
			}
		},
		clearFields() {
			this.firstname = '';
			this.lastname = '';
			this.organization = '';
			this.organization_number = '';
			this.postal_address = '';
			this.city = '';
			this.role = '';
			this.email = '';
			this.email_again = '';
		}
	}
};
</script>


<style lang="scss" scoped>
input {
	border-radius: 20px;
	color: black;

	&::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: black;
		opacity: 1; /* Firefox */
	}

	&:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: black;
	}

	&::-ms-input-placeholder {
		/* Microsoft Edge */
		color: black;
	}
}
</style>
