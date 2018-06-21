import { format, subDays } from 'date-fns'

const ACTIVE_TAB_DATA = 'ACTIVE_TAB_DATA'
const APPS_IDS_AND_NAMES_BY_ACCOUNT_ID = 'APPS_IDS_AND_NAMES_BY_ACCOUNT_ID'
const BUTTON_SELECTED_DATA = 'BUTTON_SELECTED_DATA'
const DASHBOARD_LOADER_STATUS = 'DASHBOARD_LOADER_STATUS'
const DATATABLE_DATA = 'DATATABLE_DATA'
const DATATABLE_GROUPBY = 'DATATABLE_GROUPBY'
const DATE_DATA = 'DATE_DATA'
const GROUPBY_VAR_DATA = 'GROUPBY_VAR_DATA'
const RANGE_DATA = 'RANGE_DATA'
const STATS_DATA = 'STATS_DATA'
// const SKIP_STATS_QUERY = 'SKIP_STATS_QUERY'
// const SKIP_DATATABLE_QUERY = 'SKIP_DATATABLE_QUERY'

const state = {
  activeTab: 'tab-date',
  // Save app names in from the beginning in Dashboard view
  appsNamesAndIds: '',
  appsNamesAndIdsFormatted: {},
  buttonSelectedStat: 'money',
  dashboardLoaderStatus: true,
  datatableData: '',
  datatableTotals: [],
  date: {
    endDate: format(new Date(), 'YYYY-MM-DD'),
    startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD')
    // endDate: '2018-02-10',
    // startDate: '2018-02-01'
  },
  dateArray: [],
  groupBy: ['DATE'],
  datatableGroupBy: 'DATE',
  networkStats: [],
  statsDataFormatted: [],
  // skipDashboardDataQuery: true,
  // skipDatatableDataQuery: true,
  range: []
}

const getters = {
  activeTabGetter (state) {
    return state.activeTab
  },
  appsNamesAndIdsGetter (state) {
    return state.appsNamesAndIds
  },
  appsNamesAndIdsFormattedGetter (state, getters) {
    if (getters.appsNamesAndIdsGetter) {
      getters.appsNamesAndIdsGetter.map((item) => {
        state.appsNamesAndIdsFormatted[item._id] = item.name
      })
      return state.appsNamesAndIdsFormatted
    }
  },
  buttonSelectedGetter (state) {
    return state.buttonSelectedStat
  },
  dashboardLoaderStatusGetter (state) {
    return state.dashboardLoaderStatus
  },
  dashboardDatatableDataWithFormattedLabelGetter (state, getters, rootState, rootGetters) {
    let newArray = []

    function addDays (startDate, numberOfDays) {
      let returnDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + numberOfDays,
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds())
      return returnDate
    }

    function customGetDateInterval (startDate, stopDate) {
      stopDate = addDays(stopDate, 1) // para que también incluya la última
      let dateArray = {}
      let currentDate = startDate
      while (currentDate <= stopDate) {
        let currentDateString = currentDate.toISOString().split('T')[0]
        dateArray[currentDateString.replace(/-/g, '')] = currentDateString
        currentDate = addDays(currentDate, 1)
      }
      state.dateArray = dateArray
      return dateArray
    }

    customGetDateInterval(new Date(state.date.startDate), new Date(state.date.endDate))

    function formatLabel (label) {
      if (state.activeTab === 'tab-app') {
        return state.appsNamesAndIdsFormatted[label]
      } else if (state.activeTab === 'tab-date') {
        return state.dateArray[label]
      } else if (state.activeTab === 'tab-country' && rootGetters.countriesFormattedGetter) {
        return rootState.globalModule.countriesFormatted[label]
      } else if (state.activeTab === 'tab-format' && rootGetters.formatsGetter) {
        return rootState.globalModule.formats[label]
      } else if (state.activeTab === 'tab-network' && rootGetters.networksKeysGetter) {
        return rootState.globalModule.networks[label]
      }
    }
    if (getters.datatableDataGetter) {
      getters.datatableDataGetter.map(item => {
        let addFormattedLabel = Object.assign({}, item, {
          formattedLabel: formatLabel(item.label) })
        newArray.push(addFormattedLabel)
      })
    }
    return newArray
  },
  datatableDataGetter (state) {
    return state.datatableData.rowData
  },
  datatableTotalsDataGetter (state, getters) {
    if (getters.datatableDataGetter) {
      state.datatableTotals.push(state.datatableData.total)
    }
    return state.datatableTotals
  },
  datatableGroupByGetter (state) {
    return state.datatableGroupBy
  },
  dateGetter (state) {
    return state.date
  },
  groupByGetter (state) {
    return state.groupBy
  },
  rangeGetter (state) {
    return state.range
  },
  statsDataGetter (state) {
    return state.networkStats
  },
  // Datatable Dashboard data
  statsDatatableDataGetter (state, getters) {
    return getters.statsDataGetter.rowData
  },
  // skipDashboardDataQueryGetter (state) {
  //   return state.skipDashboardDataQuery
  // },
  // skipDatatableDataQueryGetter (state) {
  //   return state.skipDatatableDataQuery
  // },
  statsDataFormattedGetter (state, getters, rootState, rootGetters) {
    let labelsFirstKey = state.dateArray
    let labelsSecondKey = ''

    if (state.activeTab === 'tab-app' && getters.appsNamesAndIdsGetter) {
      labelsSecondKey = getters.appsNamesAndIdsFormattedGetter
    } else if (state.activeTab === 'tab-country') {
      labelsSecondKey = rootGetters.countriesFormattedGetter
    } else if (state.activeTab === 'tab-format' && rootGetters.formatsGetter) {
      labelsFirstKey = rootGetters.formatsGetter
    } else if (state.activeTab === 'tab-network' && rootGetters.networksKeysGetter) {
      labelsSecondKey = rootGetters.networksKeysGetter
    }

    function statsToChartJsFormat (rowData, labelsFirstKey, labelsSecondKey) {
      labelsFirstKey = labelsFirstKey || {}
      labelsSecondKey = labelsSecondKey || {}
      let chartData = {}
      rowData.map(item => {
        let labelKeys = item.label.split('--||--')
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
            if (key !== 'label') {
                      // tratamiento para chartData
              if (typeof chartData[key] === 'undefined') {
                chartData[key] = {}
              }
              let secondaryKey = (typeof labelKeys[1] !== 'undefined') ? labelKeys[1] : 'total'
              if (typeof chartData[key][secondaryKey] === 'undefined') {
                          // si tenemos la label en el listado de labels primarias, la cogemos, si no la key pasa a ser la label
                let label = (typeof labelsSecondKey[secondaryKey] !== 'undefined') ? labelsSecondKey[secondaryKey] : secondaryKey
                chartData[key][secondaryKey] = {
                  name: label,
                  data: {}
                }
              }
              let label = (typeof labelsFirstKey[labelKeys[0]] !== 'undefined') ? labelsFirstKey[labelKeys[0]] : labelKeys[0]
              chartData[key][secondaryKey]['data'][label] = item[key]
            }
          }
        }
      })
      // some final treatment on chartdata
      let finalChartData = {}
      for (var key in chartData) {
        finalChartData[key] = []
        for (var key2 in chartData[key]) {
          let unordered = chartData[key][key2]['data']
          let ordered = {}
          Object.keys(unordered).sort().forEach(function (key3) {
            ordered[key3] = unordered[key3]
          })
          finalChartData[key].push({
            name: chartData[key][key2]['name'],
            data: sortObjectByKey(chartData[key][key2]['data'])
          })
        }
        finalChartData[key] = sortObjectByValueAlphabetically(finalChartData[key], 'name')
      }
      return finalChartData
    }

    function sortObjectByValueAlphabetically (unordered, key) {
      var ordered = unordered.slice(0)
      ordered.sort(function (a, b) {
        var x = a[key].toLowerCase()
        var y = b[key].toLowerCase()
        return x < y ? -1 : x > y ? 1 : 0
      })

      return ordered
    }

    function sortObjectByKey (unordered) {
      // https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
      let ordered = {}
      Object.keys(unordered).sort().forEach(function (key) {
        ordered[key] = unordered[key]
      })

      return ordered
    }

    if (state.networkStats.rowData && state.appsNamesAndIdsFormatted) {
      return statsToChartJsFormat(state.networkStats.rowData, labelsFirstKey, labelsSecondKey)
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
  [APPS_IDS_AND_NAMES_BY_ACCOUNT_ID] (state, data) {
    state.appsNamesAndIds = data
  },
  [BUTTON_SELECTED_DATA] (state, buttonSelected) {
    state.buttonSelectedStat = buttonSelected
  },
  [DASHBOARD_LOADER_STATUS] (state, status) {
    state.dashboardLoaderStatus = status
  },
  [DATATABLE_DATA] (state, data) {
    state.datatableData = data
  },
  [DATATABLE_GROUPBY] (state, val) {
    if (val === 'NETWORK') {
      state.datatableGroupBy = 'SOURCE'
    } else {
      state.datatableGroupBy = val
    }
  },
  [DATE_DATA] (state, date) {
    state.date = date
  },
  [GROUPBY_VAR_DATA] (state, val) {
    if (val !== 'DATE') {
      if (val === 'NETWORK') {
        state.groupBy = ['DATE', 'SOURCE']
      } else if (val === 'FORMAT') {
        state.groupBy = ['FORMAT']
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
  // [SKIP_STATS_QUERY] (state, status) {
  //   state.skipDashboardDataQuery = status
  // },
  // [SKIP_DATATABLE_QUERY] (state, status) {
  //   state.skipDatatableDataQuery = status
  // }
}

const actions = {
  activeTabAction ({commit}, activeTab) {
    commit(ACTIVE_TAB_DATA, activeTab)
  },
  appsNamesAndIdsAction ({commit}, data) {
    commit(APPS_IDS_AND_NAMES_BY_ACCOUNT_ID, data)
  },
  buttonSelectedAction ({commit}, selected) {
    commit(BUTTON_SELECTED_DATA, selected)
  },
  datatableDataAction ({commit}, data) {
    commit(DATATABLE_DATA, data)
  },
  datatableGroupByAction ({commit}, data) {
    commit(DATATABLE_GROUPBY, data)
  },
  dashboardLoaderStatusAction ({commit}, status) {
    commit(DASHBOARD_LOADER_STATUS, status)
  },
  getDateAction ({commit}, dateRange) {
    commit(DATE_DATA, dateRange)
  },
  groupByVarDataAction ({commit}, val) {
    commit(GROUPBY_VAR_DATA, val)
  },
  rangeAction ({commit}, range) {
    commit(RANGE_DATA, range)
  },
  statsDataAction ({commit}, data) {
    commit(STATS_DATA, data)
  }
  // skipDashboardDataQueryAction ({commit}, status) {
  //   commit(SKIP_STATS_QUERY, status)
  // },
  // skipDatatableDataQueryAction ({commit}, status) {
  //   commit(SKIP_DATATABLE_QUERY, status)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
