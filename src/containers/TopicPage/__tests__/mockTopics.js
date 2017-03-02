/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const topics = [
  {
    id: 'urn:topic:1',
    name: 'Idéutvikling og mediedesign',
    parent: undefined,
  },
  {
    id: 'urn:topic:1_1',
    name: 'Mediedesign',
    parent: 'urn:topic:1',
  },
  {
    id: 'urn:topic:1_2',
    name: 'Idéutvikling',
    parent: 'urn:topic:1',
  },
  {
    id: 'urn:topic:1_2_1',
    name: 'Mediebransjen',
    parent: 'urn:topic:1_2',
  },
  {
    id: 'urn:topic:2',
    name: 'Mediekommunikasjon',
    parent: undefined,
  },
];