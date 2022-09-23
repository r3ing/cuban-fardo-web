import { FormControl, InputGroup } from "react-bootstrap";

export function Filter(props) {
  

  const handleOnChange = (bsq) => {
    const search = bsq.target.value.toLowerCase();

    const data = props.data.filter((e) => {
      let name = e.name.toLowerCase();
      let lastName = e.lastName.toLowerCase();
      let phone = e.phone;
      return (
        name.indexOf(search) > -1 || lastName.indexOf(search) > -1 || phone.indexOf(search) > -1);
    });

    props.handleSearch(data);
  };

  return (
    <InputGroup>
      <FormControl
        placeholder="Search..."
        aria-label="Search"
        onChange={handleOnChange}
        className="ml-2"
      />
      <InputGroup.Text>
        <i className="material-icons">search</i>
      </InputGroup.Text>
    </InputGroup>
  );
}
