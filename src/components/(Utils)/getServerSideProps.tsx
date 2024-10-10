export async function getServerSideProps() {
  // Fetch data from your API or other source
  const apiUrl = "https://api.example.com/data";
  const response = await fetch(apiUrl);
  const data = await response.json();

  // Pass the data as props to the component
  return {
    props: { data },
  };
}

export default getServerSideProps;
