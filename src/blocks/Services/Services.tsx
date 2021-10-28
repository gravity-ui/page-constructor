import React from 'react';
import {ServicesBlockProps} from 'units/constructor/models';
import ServicesLayout from 'units/services/containers/Layout/Layout';

const Services: React.FC<ServicesBlockProps> = (props) => <ServicesLayout {...props} />;

export default Services;
