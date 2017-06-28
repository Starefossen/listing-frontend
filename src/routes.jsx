/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


export function toArticle(articleId) {
  return `/article/${articleId}`;
}

export function toListing(listingId) {
  return `/listing/${listingId}`;
}
