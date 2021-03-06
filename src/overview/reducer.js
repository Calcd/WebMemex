import update from 'lodash/fp/update'
import remove from 'lodash/fp/remove'
import { createReducer } from 'redux-act'

import { generatePageDocId } from 'src/page-storage'
import * as actions from './actions'


const defaultState = {
    currentPage: 0, // Pagination state
    searchResult: { docs: [], resultsExhausted: false }, // The current search result list
    // The current search input values
    currentQueryParams: {
        query: '',
        startDate: undefined,
        endDate: undefined,
    },
    isLoading: false,
    deleteConfirmProps: {
        isShown: false,
        url: undefined,
    },
}

function setQuery(state, query) {
    return {...state, currentQueryParams: {...state.currentQueryParams, query}}
}

function setStartDate(state, date) {
    return {...state, currentQueryParams: {...state.currentQueryParams, startDate: date}}
}

function setEndDate(state, date) {
    return {...state, currentQueryParams: {...state.currentQueryParams, endDate: date}}
}

function hideResultItem(state, url) {
    return update('searchResult.docs',
        docs => remove(doc => doc._id === generatePageDocId({ url }))(docs)
    )(state)
}

const showDeleteConfirm = (state, url) => ({
    ...state,
    deleteConfirmProps: {
        ...state.deleteConfirmProps,
        isShown: true,
        url,
    },
})

const hideDeleteConfirm = state => ({
    ...state,
    deleteConfirmProps: { ...state.deleteConfirmProps, isShown: false },
})

// Updates search result state by either overwriting or appending
const handleSearchResult = ({ overwrite }) => (state, newSearchResult) => {
    const searchResult = overwrite ? newSearchResult : {
        docs: [...state.searchResult.docs, ...newSearchResult.docs],
        resultsExhausted: newSearchResult.resultsExhausted,
    }

    return { ...state, searchResult }
}

export default createReducer({
    [actions.appendSearchResult]: handleSearchResult({ overwrite: false }),
    [actions.setSearchResult]: handleSearchResult({ overwrite: true }),
    [actions.nextPage]: state => ({ ...state, currentPage: state.currentPage + 1 }),
    [actions.resetPage]: state => ({ ...state, currentPage: defaultState.currentPage }),
    [actions.setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [actions.setQuery]: setQuery,
    [actions.setStartDate]: setStartDate,
    [actions.setEndDate]: setEndDate,
    [actions.showDeleteConfirm]: showDeleteConfirm,
    [actions.hideDeleteConfirm]: hideDeleteConfirm,
    [actions.hideResultItem]: hideResultItem,
}, defaultState)
