/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { combineReducers } from 'redux';

import locale from './containers/Locale/localeReducer';
import listings from './containers/ListingPage/listingReducer';
import subjects from './containers/Subject/subjectReducer';

const rootReducers = combineReducers({
  listings,
  locale,
  subjects,
});

export default rootReducers;
