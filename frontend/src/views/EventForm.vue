<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="slot-machine" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="Event Name" horizontal>
              <b-input v-model="form.name" required />
            </b-field>
            <b-field label="Event Description" horizontal>
              <b-input type="textarea" v-model="form.description" required />
            </b-field>
            <b-field label="Event Lead Analyst" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Event Type" horizontal>
              <b-select v-model="form.event_type">
                <option v-for="(event_type, index) in event_types" :key="index" :value="event_type">
                  {{ event_type }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Event Version" horizontal>
              <b-input v-model="form.version" reaadonly />
            </b-field>
            <b-field label="Assessment Date" horizontal>
              <b-input v-model="form.created" required />
            </b-field>
            <hr>
            <b-field label="Organization Name" horizontal>
              <b-input v-model="form.organization" required />
            </b-field>
            <b-field label="Security Classification Title Guide" horizontal>
              <b-input v-model="form.sctg" required />
            </b-field>
            <hr>
            <b-field label="Event Classification" horizontal>
              <b-select v-model="form.event_classification">
                <option v-for="(event_classification, index) in event_classifications" :key="index" :value="event_classification">
                  {{ event_classification }}
                </option>
              </b-select>
            </b-field>
           <b-field label="Declassification Date" horizontal>
              <b-input v-model="form.declassified_date" required />
            </b-field>
           <b-field label="Customer Name" horizontal>
              <b-input v-model="form.customer_name" required />
            </b-field>
            <hr>
            <b-field label="Derived From" horizontal>
              <b-input v-model="form.derived" placeholder="analyst initials" required />
            </b-field>
            <b-field label="Lead Analysts">
              <div class="control">
                <b-button type="is-primary is-small is-outlined is-rounded" @click="add">+ Add Lead Analysts</b-button>
              </div>
            </b-field>
            <b-field label="Analysts">
              <div class="control">
                <b-button type="is-primary is-small is-outlined is-rounded" @click="add">+ Add Analysts</b-button>
              </div>
            </b-field>
            <b-table ref="btable"
              :checked-rows.sync="checkedRows"
              :checkable="checkable"
              :loading="isLoading"
              :paginated="paginated"
              :per-page="perPage"
              :striped="true"
              :hoverable="true"
              default-sort="name"
              :data='clients'>

              <b-table-column label="Analyst Initials" field="initials" sortable v-slot="props">
                {{ props.row.initials }}
              </b-table-column>
              <b-table-column label="First Name" field="first_name" sortable v-slot="props">
                <small class="has-text-grey">{{ props.row.first_name }}</small>
              </b-table-column>
              <b-table-column label="Last Name" field="last_name" sortable v-slot="props">
                <small class="has-text-grey">{{ props.row.last_name }}</small>
              </b-table-column>

              <section class="section" slot="empty">
                <div class="content has-text-grey has-text-centered">
                  <template v-if="isLoading">
                    <p>
                      <b-icon icon="dots-horizontal" size="is-large"/>
                    </p>
                    <p>Fetching data...</p>
                    </template>
                    <template v-else>
                      <p>
                        <b-icon icon="emoticon-sad" size="is-large"/>
                      </p>
                      <p>Nothing's here&hellip;</p>
                    </template>
                  </div>
                </section>
              </b-table>
            </form>
          </card-component>
      </tiles>
      <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <router-link to="/events">
              <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
            </router-link>
          </div>
          <div class="control">
            <router-link slot="right" to="/events" class="button is-primary is-outlined">
             Cancel
            </router-link>
          </div>
        </b-field>
      </b-field>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import EventService from '@/services/EventServices'
import LogServices from '@/services/LogTransactionServices'

export default {
  name: 'EventForm',
  components: { CardComponent, Tiles, HeroBar, TitleBar },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: {},
      oldForm: null,
      createdReadable: null,
      isProfileExists: false,
      event_type: null,
      event_classification: null,
      event_types: [
        'CVPA',
        'CVI',
        'VOF'
      ],
      event_classifications: [
        'Top Secret',
        'Secret',
        'Confidential',
        'Classified',
        'Unclassified'
      ]
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'New Event'
      }

      return [
        'Analyst',
        'Events',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Event Detailed View'
      }
    },
    heroRouterLinkTo () {
      return '/events'
    },
    heroRouterLinkLabel () {
      return 'Back'
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Event Basic Information'
      } else {
        return 'New Event'
      }
    }
  },
  created () {
    this.getOldData()
    this.getData()
  },
  methods: {
    add () {
      return ''
    },
    async getOldData () {
      if (this.id) {
        EventService.getEventSingle(this.id)
          .then(response => {
            this.oldForm = response.data
          })
          .catch(e => {
            this.displayError(e)
          })
      }
    },
    async getData () {
      if (this.id) {
        EventService.getEventSingle(this.id)
          .then(response => {
            if (response.status === 200) {
              this.isProfileExists = true
              this.$set(this, 'form', response.data)
            }
          })
          .catch(e => {
            this.displayError(e)
          })
      }
    },
    async submit () {
      this.isLoading = true
      EventService.modifyEvent(this.id, this.form)
        .then(response => {
          if (response.status === 200) {
            this.isProfileExists = true
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    async logAction () {
      LogServices.logChangesFromEvent(this.oldForm, this.form)
        .then(response => {
          if (response.status === 200) {
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false
      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  }
}
</script>
