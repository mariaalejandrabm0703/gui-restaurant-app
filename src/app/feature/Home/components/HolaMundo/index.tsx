import * as PropTypes from 'prop-types';
import * as React from 'react';

interface HolaMundoProps {
  msg: string;
}

export const HolaMundo: React.FC<HolaMundoProps> = ({ msg }) => <h1>{msg}</h1>;

HolaMundo.propTypes = {
  msg: PropTypes.string.isRequired,
};
