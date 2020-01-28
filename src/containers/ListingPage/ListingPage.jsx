/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ListView, { activeAlphabet } from '@ndla/listview';
import { OneColumn } from 'ndla-ui';

import { mapConceptToListItem } from '../../util/listingHelpers';
import * as actions from './listingActions';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';

const ListingPage = (props) => {
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('category');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const { fetchListing, match: { params } } = props;
    fetchListing(params.subjectId);
  }, []);

  const listItems = props.listings.listings.map(concept => mapConceptToListItem(concept, props.listings.subjectName));

  return (
    <OneColumn>
      <Helmet title={'NDLA Utlisting'} />
        <ListView
          items={listItems}
          alphabet={activeAlphabet(listItems)}
          viewStyle={viewType}
          onSelectItem={() => { }}
          onChangedViewStyle={({ v }) => setViewType(v)}
          filters={filters}
        />
    </OneColumn>
  );
}

ListingPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  listings: PropTypes.exact({
    subjectName: PropTypes.string,
    categories: PropTypes.exact({
      main: PropTypes.string.isRequired,
      sub: PropTypes.string.isRequired
    }),
    listings: PropTypes.arrayOf(CoverShape)
  }),
  locale: PropTypes.string.isRequired,
  fetchListing: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchListing: actions.fetchListing,
};

const mapStateToProps = state => ({
  listings: state.listings,
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
