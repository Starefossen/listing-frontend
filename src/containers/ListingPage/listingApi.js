/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Foreløpig rigget for mock objekter. Egen oppgave gjøre det faktiske kallet til nye listing-api .

import fetch from 'isomorphic-fetch';
import { choiceIdent } from '../../util/listingHelpers';
import { resolveJsonOrRejectWithError, apiResourceUrl, headerWithAccessToken } from '../../util/apiHelpers';

const baseUrl = apiResourceUrl('/listing-api/v1/listing');

export const fetchListing = (id, locale, token) => fetch(`${baseUrl}/${id}`, { headers: headerWithAccessToken(token) }).then(resolveJsonOrRejectWithError);

function mockListing(id) {
  return JSON.parse(`
    {"title": "Hammer",
     "description": "Kort tekst for Hammer for subject ${id}", 
     "coverPhotoUrl": "https://test.api.ndla.no/image-api/v1/raw/skyss_vergrei_plakater_a3-4.jpg?cropStart=200,200&cropEnd=400,400", 
     "articleApiId": 187, 
     "labels": [
       {
        "type": "Fag", 
        "labels": ["betongfaget", "murerfaget", "tømrerfaget"]
        },
        {
         "type": "Kategori",
         "labels": ["personlig verktøy"]
        },
        {
         "type": "Nyttig hjemme",
         "labels": ["oppussing", "forsvar"]
        },
        {
         "labels" : ["myke fag", "voksenlivet", "metalurgi"]
        }
     ]
     }`);
}

function mockListing2(id) {
  return JSON.parse(`
    {"title": "Meter og blyant",
     "description": "Kort tekst for Meter og blyant for subject ${id}", 
     "coverPhotoUrl": "https://test.api.ndla.no/image-api/v1/raw/sp7a2995.jpg?cropStart=200,200&cropEnd=400,400", 
     "articleApiId": 188, 
     "labels": [
       {
        "type": "Fag", 
        "labels": ["betongfaget", "tømrerfaget", "elektrofaget" ]
        },
        {
         "type": "Kategori",
         "labels": ["måleverktøy", "personlig verktøy"]
        },
        { "type": null,
         "labels" : ["voksenlivet", "oppussing"]
        },
        { 
         "labels" : ["dugnadsånd"]
        }
     ]
     }`);
}

function mockListing3(id) {
  return JSON.parse(`
    {"title": "Noe annet",
     "description": "Kort tekst for Meter og blyant for subject ${id}", 
     "coverPhotoUrl": "https://test.api.ndla.no/image-api/v1/raw/tad7ebce.jpg?cropStart=200,200&cropEnd=400,400", 
     "articleApiId": 188, 
     "labels": [
       {
        "type": "Fag", 
        "labels": ["other"]
        }
     ]
     }`);
}

/*
 * For optemizing, labels are flattend to a array of options which are the id's of the filter checkboxes,
 * so that this does not need to be done for every filter choice.
 * */
function listingsFlattLabels(labels) {
  // console.log('labels', labels);
  return labels.map(label =>
    // console.log('label:', label);
     label.labels.map(l => choiceIdent(label.type, l)));
}


/* eslint-disable no-param-reassign*/
export const fetchListingFunMock = (id) => {
  const mockListings = [1, 2].map(() => mockListing(id)).concat([8].map(() => mockListing2(id))).concat([3, 6].map(() => mockListing3(id)));

  const m = mockListings.map((listing) => {
    const listingsFlattLabels2 = listingsFlattLabels(listing.labels);
    listing.filterChoices = listingsFlattLabels2.reduce((a, b) => a.concat(b), []);
    return listing;
  });

  return m;
};
/* eslint-disable no-param-reassign*/