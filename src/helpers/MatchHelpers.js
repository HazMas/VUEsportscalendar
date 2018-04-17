import moment from 'moment'

function isScheduled (match) {
  return match.status === 'scheduled' && !moment(this.match.start_date).isBefore(moment())
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

function isTeamLoser (match, teamId) {
  if (!isFinished(match)) {
    return false
  }
  if (match.team_a.id === teamId) {
    return parseInt(match.result_a) < parseInt(match.result_b)
  } else {
    return parseInt(match.result_b) < parseInt(match.result_a)
  }
}

export {isScheduled, isFinished, isLive, startTime, startFullDate, isTeamLoser}
