import { format, subDays } from 'date-fns'

const ACTIVE_TAB_DATA = 'ACTIVE_TAB_DATA'
const APPS_IDS_AND_NAMES_BY_ACCOUNT_ID = 'APPS_IDS_AND_NAMES_BY_ACCOUNT_ID'
const BUTTON_SELECTED_DATA = 'BUTTON_SELECTED_DATA'
const DASHBOARD_LOADER_STATUS = 'DASHBOARD_LOADER_STATUS'
const DATE_DATA = 'DATE_DATA'
const GROUPBY_VAR_DATA = 'GROUPBY_VAR_DATA'
const STATS_DATA = 'STATS_DATA'
const RANGE_DATA = 'RANGE_DATA'

const state = {
  activeTab: 'tab-date',
  // Save app names in from the beginning in Dashboard view
  appsNamesAndIds: '',
  appsNamesAndIdsFormatted: {},
  buttonSelectedStat: 'money',
  dashboardLoaderStatus: true,
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
  appsNamesAndIdsGetter (state) {
    return state.appsNamesAndIds
  },
  appsNamesAndIdsFormattedGetter (state, getters) {
    getters.appsNamesAndIdsGetter.map((item) => {
      state.appsNamesAndIdsFormatted[item._id] = item.name
    })
    return state.appsNamesAndIdsFormatted
  },
  rangeGetter (state) {
    return state.range
  },

  rangeOfDays (state) {
    console.log(state.date.startDate, state.date.endDate)
     /* eslint no-global-assign:off */
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }

    function customGetDateInterval (startDate, stopDate) {
      stopDate = stopDate.addDays(1) // para que también incluya la última
      let dateArray = []
      let currentDate = startDate
      while (currentDate <= stopDate) {
        dateArray.push(currentDate.toISOString().split('T')[0])
        currentDate = currentDate.addDays(1)
      }
      return dateArray
    }

    customGetDateInterval(state.date.startDate, state.date.endDate)
  },
  buttonSelectedGetter (state) {
    return state.buttonSelectedStat
  },
  dashboardLoaderStatusGetter (state) {
    return state.dashboardLoaderStatus
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
        if (state.activeTab === 'tab-app') {
          return state.appsNamesAndIdsFormatted[withoutSymbol[1]]
        } else {
          return withoutSymbol[1]
        }
      } else {
        return label
      }
    }
    if (getters.statsDatatableDataGetter) {
      getters.statsDatatableDataGetter.map(item => {
        let addFormattedLabel = Object.assign({}, item, {
          formattedLabel: formatLabel(item.label) })
        newArray.push(addFormattedLabel)
      })
    }
    return newArray
  },
  statsDataFormattedGetter (state, getters) {
    // Mi codigo
    // if (state.groupBy.length === 1) {
    //   let object = {}
    //   object['data'] = {}
    //   if (getters.statsDatatableDataGetter) {
    //     getters.statsDataGetter.rowData.map(item => {
    //       object['data'][item.label] = item[`${state.buttonSelectedStat}`]
    //     })
    //   }
    //   return object.data
    // } else {
    //   let data = []
    //   let object = {}
    //   object['name'] = 'Requests'
    //   object['data'] = {}
    //   if (getters.statsDatatableDataGetter) {
    //     getters.statsDataGetter.rowData.map(item => {
    //       object['data'][item.label] = item[`${state.buttonSelectedStat}`]
    //     })
    //     data.push(object)
    //   }
    //   console.log(data)
    //   return data
    // }
    var labelsFirstKey = {
      '20180201': '2018-02-01',
      '20180202': '2018-02-02',
      '20180203': '2018-02-03',
      '20180204': '2018-02-04',
      // '20180205': '2018-02-05',
      '20180206': '2018-02-06',
      '20180207': '2018-02-07',
      '20180208': '2018-02-08',
      '20180209': '2018-02-09',
      '20180210': '2018-02-10'
    }
    var labelsSecondKey = ''
    if (state.activeTab === 'tab-app' && getters.appsNamesAndIdsGetter) {
      labelsSecondKey = getters.appsNamesAndIdsFormattedGetter
    } else if (state.activeTab === 'tab-country') {
      labelsSecondKey = {
        'AD': 'aaaaaaaaaaaaaa'
      }
    } else if (state.activeTab === 'tab-format') {
      labelsSecondKey = {
        'banner': 'Banner'
      }
    }

    function statsToChartJsFormat (rowData, labelsFirstKey, labelsSecondKey) {
      labelsFirstKey = labelsFirstKey || {}
      labelsSecondKey = labelsSecondKey || {}
      let chartData = {}
      rowData.map(item => {
        let labelKeys = item.label.split('--||--')
          // console.log(labelKeys[0])
          // console.log(labelKeys[1])
          // console.log(item)
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
                  // console.log(key + " -> " + item[key])
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
          Object.keys(unordered).sort().forEach(function (key) {
            ordered[key] = unordered[key]
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
  activeTabAction ({commit}, activeTab) {
    commit(ACTIVE_TAB_DATA, activeTab)
  },
  appsNamesAndIdsAction ({commit}, data) {
    commit(APPS_IDS_AND_NAMES_BY_ACCOUNT_ID, data)
  },
  buttonSelectedAction ({commit}, selected) {
    commit(BUTTON_SELECTED_DATA, selected)
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
}

export default {
  state,
  getters,
  mutations,
  actions
}
