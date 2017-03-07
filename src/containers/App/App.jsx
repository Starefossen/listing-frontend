/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { PageContainer } from 'ndla-ui';

import Masthead from '../Masthead';
import Footer from './components/Footer';
import { getLocale } from '../Locale/localeSelectors';
import { injectT } from '../../i18n';

export class App extends React.Component {
  getChildContext() {
    return {
      locale: this.props.locale,
    };
  }

  render() {
    const { children, t } = this.props;
    return (
      <PageContainer>
        <Helmet
          title="NDLA"
          meta={[
            { name: 'description', content: t('meta.description') },
          ]}
        />

        <Masthead t={t} />
        {children}
        <Footer t={t} />
      </PageContainer>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string.isRequired,
};

App.childContextTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps)(injectT(App));
