import moment from 'moment'

export const getFormattedDate = (date) => {
  if(date){
    const dt = moment(date);
    return(dt.format('DD-MMM-YYYY hh:MM'));
  }

  return date;
}