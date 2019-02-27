import { format } from 'date-fns';


export function simpleFormat(date) {
  return format(date, 'yyyy-MM-dd\'T\'HH:mm:ssxxxxx');
}
