import moment from 'moment';

export function createHash (hashLength) {
  return Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
}


export function formatTime (time) {
  return time && moment(time).format('YYYY-MM-DD hh:mm') || time
}
