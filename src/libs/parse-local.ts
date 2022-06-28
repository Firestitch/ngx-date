import { isValid } from 'date-fns';
import { parse } from './parse';
import { sanitizeDate } from './sanitize-date';


export function parseLocal(date): Date {
  let date1 = date;
  if (typeof date === 'string') {
      
    if(date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date += 'T00:00:00';
    }

    if(!date.match(/[+-]\d{2}:\d{2}$/)) {
      date += '+00:00';
    }        

    date1 = parse(sanitizeDate(date));
    
    date1 = new Date(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate(), date1.getUTCHours(), date1.getUTCMinutes(), date1.getUTCSeconds(), date1.getUTCMilliseconds());
  }


  return isValid(date1) ? date1 : null;
}

