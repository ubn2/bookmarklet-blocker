const searchPattern = "javascript:"

const removeBookmarklet = (id, url) => {
    if (url.toLowerCase().startsWith(searchPattern)) {
        chrome.bookmarks.remove(id, null);
    }
}

const onCreatedCallback = (id, bookmark) => {
    const { url } = bookmark;
    removeBookmarklet(id, url);
}


const onChangedCallback = (id, changeInfo) => {
    const { url } = changeInfo
    removeBookmarklet(id, url);
}

const searchCallback = (bookmarks) => {
    if (bookmarks.length > 0) {
        for (const bookmark of bookmarks) {
            const { id, url } = bookmark
            removeBookmarklet(id, url)
        }
    }
}

chrome.bookmarks.onCreated.addListener(onCreatedCallback);

chrome.bookmarks.onChanged.addListener(onChangedCallback);

chrome.runtime.onInstalled.addListener(() => {
    const query = { query: searchPattern };
    chrome.bookmarks.search(query, searchCallback);
});