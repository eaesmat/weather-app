import PropTypes from 'prop-types';

import './Damage.css';

const Damage = (props) => {
  const {
    intensity,
    color,
  } = props;
  return (
    <div className="dmg-container">
      <div
        style={{
          background: `linear-gradient(to bottom, ${color} 0%, transparent ${1.1 * (intensity - 1)}%)`,
        }}
      />
      <div
        style={{
          background: `linear-gradient(to right, ${color} 0%, transparent ${1.5 * (intensity - 1)}%)`,
        }}
      />
      <div
        style={{
          background: `linear-gradient(to left, ${color} 0%, transparent ${1.5 * (intensity - 1)}%)`,
        }}
      />
      <div
        style={{
          background: `linear-gradient(to top, ${color} 0%, transparent ${1.1 * (intensity - 1)}%)`,
        }}
      />
    </div>
  );
};

Damage.propTypes = {
  intensity: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Damage;
