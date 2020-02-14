/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl } from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/concept-api/v1/concepts');

export const fetchListing = (pageSize) => fetch(`${baseListingUrl}?page-size=${pageSize}`).then(resolveJsonOrRejectWithError);
export const fetchListingBySubject = (subjectId, pageSize) => fetch(`${baseListingUrl}?subjects=${subjectId}&page-size=${pageSize}`).then(resolveJsonOrRejectWithError);
export const fetchTags = (subjectId) => fetch(`${baseListingUrl}/tags/?subjects=${subjectId}`).then(resolveJsonOrRejectWithError);
export const fetchConcept = (conceptId) => fetch(`${baseListingUrl}/${conceptId}`).then(resolveJsonOrRejectWithError);