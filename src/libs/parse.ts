import { parseISO, isValid } from 'date-fns';
import { sanitizeDate } from './sanitize-date';


export function parse(date): Date {
  if (typeof date === 'string') {
    date = parseISO(sanitizeDate(date));
  }

  return isValid(date) ? date : null;
}
