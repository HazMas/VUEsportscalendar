import moment from 'moment'

function isScheduled (match) {
  return match.status === 'scheduled'
}

function isFinished (match) {
  return match.status === 'finished'
}

function isLive (match) {
  return (!this.isScheduled(match) && !this.isFinished(match)) || (moment(this.match.start_date).isBefore(moment()) && this.isScheduled(match))
}

function startFullDate (match) {
  return moment(match.start_date).locale('es').format('dddd DD MMMM')
}

function startTime (match) {
  return moment(match.start_date).format('HH:mm')
}

export {isScheduled, isFinished, isLive, startTime, startFullDate}
