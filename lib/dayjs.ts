import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr.js';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.locale('fr');
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);
dayjs.extend(relativeTime);

export type { Dayjs };
export { dayjs };
