import Moment from "moment";
const formatDate = (inputDate: any) => {
  const date = new Date(inputDate);
  Moment.locale("en");
  var dt = inputDate;

  const formattedDate = Moment(dt).format("DD - MM - YYYY hh:mm a");

  return formattedDate;
};
export default formatDate;
