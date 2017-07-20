import debounce from 'lodash/debounce'

import { makeRemotelyCallable } from 'src/util/webextensionRPC'
import { maybeLogPageVisit } from './log-page-visit'
import initPauser from './pause-logging'
import { PAUSE_STORAGE_KEY } from '..'

const isPaused = async () =>
    (await browser.storage.local.get(PAUSE_STORAGE_KEY))[PAUSE_STORAGE_KEY] || false

// Allow logging pause state toggle to be called from other scripts
const toggleLoggingPause = initPauser()
makeRemotelyCallable({ toggleLoggingPause })

// Debounced functions fro each tab are stored here
const tabs = {}

// Listens for url changes of the page
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url && tab.url) {
        // Check if we already have a debounced function for this tab and cancel it
        if (tabs[tabId]) tabs[tabId].cancel()

        // Create debounced function and call it
        tabs[tabId] = debounce(async () => {
            // Bail-out if logging paused
            if (await isPaused()) return

            return maybeLogPageVisit({url: tab.url, tabId: tabId})
        }, 10000)
        tabs[tabId]()
    }
})
