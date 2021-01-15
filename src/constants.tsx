const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const MONTH_STATUS = {
  NEW: 'New',
  DONE: 'Done',
  PROCESS: 'On Process',
  NEW_BUTTON: 'NEW BUTTON',
};

// prettier-ignore
const ICONS: { [key:string]: string } = {
  Done: 'fa-check-circle',
  OnProcess: 'fa-spinner',
  NEW_BUTTON: 'fa-hand-sparkles',
};
const LAST_MONTH = 11;
const FIRST_MONTH = 0;
const productStatuses = {
  NEW: 'New',
  DONE: 'Reviewed - Done',
  SKIPPED: 'Skipped',
  SUBMITTED: 'Submitted',
  WAITING: 'Reviewed - Waiting For Payment',
  CANCELLED: 'Cancelled',
};
const statusOptions = [
  productStatuses.NEW,
  productStatuses.DONE,
  productStatuses.SKIPPED,
  productStatuses.SUBMITTED,
  productStatuses.WAITING,
  productStatuses.CANCELLED,
];
export {
  Months,
  LAST_MONTH,
  FIRST_MONTH,
  MONTH_STATUS,
  ICONS,
  statusOptions,
  productStatuses,
};
