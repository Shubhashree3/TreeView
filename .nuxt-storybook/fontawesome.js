import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeLayers,
  FontAwesomeLayersText,
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import {
  fas as fortawesomefreesolidsvgicons_fas
} from '@fortawesome/free-solid-svg-icons'

library.add(
  fortawesomefreesolidsvgicons_fas
)

config.autoAddCss = false

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('FontAwesomeLayers', FontAwesomeLayers)
Vue.component('FontAwesomeLayersText', FontAwesomeLayersText)
