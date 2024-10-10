import 

export default function GetStatusColor (status)  {
  switch (status) {
    case "Failed":
      return "red";
    case "Successful":
      return "green";
    case "Pending":
      return "rgba(120, 120, 120, 1)";
    default:
      return "red";
  }
};
