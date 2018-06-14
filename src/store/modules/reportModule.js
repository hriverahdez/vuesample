import { format, subDays } from 'date-fns'

const ACTIVE_TAB_DATA = 'ACTIVE_TAB_DATA'
const BUTTON_SELECTED_DATA = 'BUTTON_SELECTED_DATA'
const DATE_DATA = 'DATE_DATA'
const GROUPBY_VAR_DATA = 'GROUPBY_VAR_DATA'
const STATS_DATA = 'STATS_DATA'
const RANGE_DATA = 'RANGE_DATA'

const state = {
  activeTab: 'tab-date',
  buttonSelectedStat: 'money',
  date: {
    endDate: format(new Date(), 'YYYY-MM-DD'),
    startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD')
  },
  groupBy: ['DATE'],
  networkStats: [],
  statsDataFormatted: [],
  range: []
}

const getters = {
  activeTabGetter (state) {
    return state.activeTab
  },
  rangeGetter (state) {
    return state.range
  },
  buttonSelectedGetter (state) {
    return state.buttonSelectedStat
  },
  dateGetter (state) {
    return state.date
  },
  groupByGetter (state) {
    return state.groupBy
  },
  statsDataGetter (state) {
    return state.networkStats
  },
  // Datatable Dashboard data
  statsDatatableDataGetter (state, getters) {
    return getters.statsDataGetter.rowData
  },
  dashboardDatatableDataWithFormattedLabelGetter (state, getters) {
    let newArray = []
    function formatLabel (label) {
      if (label.includes('--||--')) {
        let withoutSymbol = label.split('--||--')
        return withoutSymbol[1]
      } else {
        return label
      }
    }
    if (getters.statsDatatableDataGetter) {
      getters.statsDatatableDataGetter.map(item => {
        let addFormattedLabel = Object.assign({}, item, { formattedLabel: formatLabel(item.label) })
        newArray.push(addFormattedLabel)
      })
    }
    return newArray
  },
  statsDataFormattedGetter (state, getters) {
    if (state.groupBy.length === 1) {
      let object = {}
      object['data'] = {}
      if (getters.statsDatatableDataGetter) {
        getters.statsDataGetter.rowData.map(item => {
          object['data'][item.label] = item[`${state.buttonSelectedStat}`]
        })
      }
      return object.data
    } else {
      let data = []
      let object = {}
      object['name'] = 'Requests'
      object['data'] = {}
      if (getters.statsDatatableDataGetter) {
        getters.statsDataGetter.rowData.map(item => {
          object['data'][item.label] = item[`${state.buttonSelectedStat}`]
        })
        data.push(object)
      }
      console.log(data)
      return data
    }
  }
}

const mutations = {
  [RANGE_DATA] (state, range) {
    state.range = range
  },
  [ACTIVE_TAB_DATA] (state, activeTab) {
    state.activeTab = activeTab
  },
  [BUTTON_SELECTED_DATA] (state, buttonSelected) {
    state.buttonSelectedStat = buttonSelected
  },
  [DATE_DATA] (state, date) {
    state.date = date
  },
  [GROUPBY_VAR_DATA] (state, val) {
    if (val !== 'DATE') {
      if (val === 'NETWORK') {
        state.groupBy = ['DATE', 'SOURCE']
      } else {
        state.groupBy = ['DATE', val]
      }
    } else {
      state.groupBy = ['DATE']
    }
  },
  [STATS_DATA] (state, data) {
    state.networkStats = data
  }
}

const actions = {
  rangeAction ({commit}, range) {
    commit(RANGE_DATA, range)
  },
  activeTabAction ({commit}, activeTab) {
    commit(ACTIVE_TAB_DATA, activeTab)
  },
  buttonSelectedAction ({commit}, selected) {
    commit(BUTTON_SELECTED_DATA, selected)
  },
  getDateAction ({commit}, dateRange) {
    commit(DATE_DATA, dateRange)
  },
  groupByVarDataAction ({commit}, val) {
    commit(GROUPBY_VAR_DATA, val)
  },
  statsDataAction ({commit}, data) {
    commit(STATS_DATA, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
