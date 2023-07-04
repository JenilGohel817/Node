import { SearchAuth } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, Setvalues] = SearchAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/search/${values.keyword}`
      );
      Setvalues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search..."
          value={values.keyword}
          onChange={(e) => Setvalues({ ...values, keyword: e.target.value })}
          aria-label="search"
        />
        <button type="submit">search</button>
      </form>
    </>
  );
};

export default SearchInput;
