import moment from 'moment'
const intervalMap = {
  dd: {
    startDate: endDate => endDate,
    interval: 'day',
  },
  dw: {
    // 6 days, since date range is inclusive,
    startDate: endDate => moment(endDate).subtract(6, 'days'),
    interval: 'week',
  },
  dm: {
    startDate: endDate => moment(endDate).subtract(30, 'days'),
    interval: 'month',
  },
  dt: {
    startDate: () => moment(0),
  },
}
export default class Sourceforge extends BaseJsonService {
  async fetch({ interval, project, folder }) {
    }stats/json`
    const endDate = moment().subtract(24, 'hours')
    const startDate = intervalMap[interval].startDate(endDate)
    const options = {
      searchParams: {
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
      },
    }
  }
