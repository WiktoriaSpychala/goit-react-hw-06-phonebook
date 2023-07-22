import PropTypes from 'prop-types';

export const Filter = ({ onChange }) => (
  <div>
    <p>Find contact by name</p>
    <input type="text" name="filter" onChange={onChange} />
  </div>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
