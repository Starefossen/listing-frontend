/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { PageContainer } from 'ndla-ui';
import { injectT } from 'ndla-i18n';

import Masthead from '../Masthead';
import Footer from './components/Footer';
import { getLocale } from '../Locale/localeSelectors';

export class App extends React.Component {
  getChildContext() {
    return {
      locale: this.props.locale,
    };
  }

  render() {
    const { t } = this.props;
    return (
      <PageContainer>
        <Helmet
          title="NDLA"
          meta={[
            { name: 'description', content: t('meta.description') },
          ]}
        />

        <Masthead t={t} />

        <Switch>
          <Route path="/listing" component={ListingPage} />
        </Switch>
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
