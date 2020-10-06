/*
 *
 * Stock config actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_STOCK_CONFIG,
  GET_STOCK_CONFIG_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getStockConfig() {
  return {
    type: GET_STOCK_CONFIG,
  };
}

export function getStockConfigSuccess(payload) {
  return {
    type: GET_STOCK_CONFIG_SUCCESS,
    payload,
  };
}
