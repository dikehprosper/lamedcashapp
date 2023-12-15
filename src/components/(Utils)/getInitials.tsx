function GetInitials(name: any) {
  const data = name;
  console.log(data)
  const fullName = data?.name;
  const initials = fullName?.split(" ").map((word: any) => word[0]?.toUpperCase());
  const result = initials?.join(""); // This will output "DP"
  return result;
}

export default GetInitials;
