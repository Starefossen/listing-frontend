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
import { getAccessToken } from '../App/sessionSelectors';

/* eslint-disable no-param-reassign*/
export function* fetchListing() {
  // This is to be done better in issue #256, its's like this for the demo.
  const locale = yield select(getLocale);
  const token = yield select(getAccessToken);
  const listing1 = yield call(api.fetchListing, 1, locale, token);
  const listing2 = yield call(api.fetchListing, 2, locale, token);
  const listing3 = yield call(api.fetchListing, 3, locale, token);
  const listing4 = yield call(api.fetchListing, 4, locale, token);
  const listing5 = yield call(api.fetchListing, 5, locale, token);
  const listing6 = yield call(api.fetchListing, 6, locale, token);
  const listing7 = yield call(api.fetchListing, 7, locale, token);


  const listingArray = [listing1].concat(listing2, listing3, listing4, listing5, listing6, listing7);

  const arrayWithfilterChoices = listingArray.map((listing) => {
    const listingsFlattLabels2 = listingsFlattLabels(listing.labels);
    listing.filterChoices = listingsFlattLabels2.reduce((a, b) => a.concat(b), []);
    return listing;
  });

  yield put(actions.setListing(arrayWithfilterChoices));
}
/* eslint-disable no-param-reassign*/

export function* watchFetchListing() {
  while (true) {
    const { payload: id } = yield take(actions.fetchListing);
    // const id = yield take(constants.FETCH_LISTING);
    // const current = yield select(getListing(id));
    // console.log("current: ", current);

    yield call(fetchListing, id);
  }
}

export default [
  watchFetchListing,
];