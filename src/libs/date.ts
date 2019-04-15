import { parseISO, isValid } from 'date-fns';


export function date(value) {
  let dateObject = typeof value === 'string' ? parseISO(value) : value;

  if (!isValid(dateObject)) {
    dateObject = null;
  }

  return dateObject;
}
