// vue-i18n import
import {i18n} from '@/config/i18n'

const state = {
  networksInfo: {
    '1003': {
      'name': 'Adcolony',
      'params_by_network': {
        'api_key': {
          'label': i18n.t('networks_info.addcolony1003.api_key.label'),
          'help_text': i18n.t('networks_info.addcolony1003.api_key.help_text')
        }
      }
    },
    '1008': {
      'name': 'Applovin',
      'params_by_network': {
        'report_key': {
          'label': i18n.t('networks_info.applovin1008.report_key.label'),
          'help_text': i18n.t('networks_info.applovin1008.report_key.help_text')
        },
        'sdk_key': {
          'label': i18n.t('networks_info.applovin1008.sdk_key.label'),
          'help_text': i18n.t('networks_info.applovin1008.sdk_key.help_text')
        }
      }
    }
  }
}

const getters = {
  networksInfoGetter (state) {
    return state.networksInfo
  }
}

export default {
  state,
  getters
}
