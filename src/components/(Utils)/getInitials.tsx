function GetInitials(name: any) {
  const data = name;
  const fullName = data?.name;
  const initials = fullName?.split(" ").map((word: any) => word[0]?.toUpperCase());
  const result = initials?.join(""); // This will output "DP"
  return result;
}

export default GetInitials;
