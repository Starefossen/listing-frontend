/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { call, select, put, take } from 'redux-saga-effects';
import { getLocale } from '../Locale/localeSelectors';
import * as actions from './listingActions';
import * as api from './listingApi';
import { listingsFlattLabels } from './../../util/listingHelpers';

/* eslint-disable no-param-reassign */
export function* fetchListingByTheme(id) {
  const locale = yield select(getLocale);
  const listings = yield call(api.fetchListingByTheme, locale, id);

  if (!listings.results) {
    yield put(actions.setListing([]));
  } else {
    const arrayWithfilterChoices = listings.results.map((listing) => {
      const listingFilterChoices = listingsFlattLabels(listing.labels);
      listing.filterChoices = listingFilterChoices.reduce((a, b) => a.concat(b), []);
      return listing;
    }).sort((a, b) => a.title.localeCompare(b.title));

    yield put(actions.setListing(arrayWithfilterChoices));
  }
}
/* eslint-disable no-param-reassign */

export function* watchFetchListingByTheme() {
  while (true) {
    const { payload: listingId } = yield take(actions.fetchListing);
    yield call(fetchListingByTheme, listingId);
  }
}

/* eslint-disable no-param-reassign */
// export function* fetchOembed(url) {
//   console.log('export function* fetch oembed', url);
//   const oembed = yield call(api.fetchOembed, url);
//   console.log('res oembed yield', oembed);
//   console.log('html:',oembed.html);
//   yield put(actions.setOembed(oembed.html));
// }
// /* eslint-disable no-param-reassign */
//
// export function* watchFetchOembed() {
//   console.log('* watchFetchOembed');
//   while (true) {
//     yield take(actions.fetchOembed);
//     yield call(fetchOembed, 'test');
//   }
//
// }

export default [
  watchFetchListingByTheme,
  // watchFetchOembed,
];
