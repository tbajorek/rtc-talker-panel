import React from 'react';
import { Helmet } from 'react-helmet';

const PageMeta = (WrappedComponent) => {
  const helmetProps = [];
  if (WrappedComponent.charset !== 'undefined') {
    helmetProps.push(<meta key="charset" charSet={WrappedComponent.charset} />);
  } else {
    helmetProps.push(<meta key="charset" charSet="utf-8" />);
  }
  if (WrappedComponent.title !== 'undefined') {
    helmetProps.push(<title key="title">{WrappedComponent.title}</title>);
  }
  return class extends React.Component {
    render() {
      return (
          <React.Fragment>
            <Helmet key="helmet" titleTemplate="%s | Panel administracyjny RTC-Talker">
              {helmetProps}
            </Helmet>
            <WrappedComponent {...this.props} />
          </React.Fragment>
      );
    }
  };
};

export default PageMeta;
