export const PAGE_SIZE = 10

export const RESULT_TYPES = {
    UNKNOWN: 'unknown',
    BOOKMARK: 'bookmark',
    VISIT: 'visit',
}

export const SEARCH_CONN_NAME = 'search-bg-ui-runtime-connection'

/** Commands used for BG <-> UI bi-directional communication actions */
export const CMDS = {
    SEARCH: `${SEARCH_CONN_NAME}/SEARCH`,
    RESULTS: `${SEARCH_CONN_NAME}/RESULTS`,
    ERROR: `${SEARCH_CONN_NAME}/ERROR`,
}
