chrome.action.onClicked.addListener(async (tab) => {
    const existingContexts = await chrome.runtime.getContexts();

    const offScreenDocument = existingContexts.find(
        (context) => context.contextType === 'OFFSCREEN_DOCUMENT'
    );

    if (!offScreenDocument) {
        await chrome.offscreen.createDocument({
            url: 'record.html',
            reasons: ['USER_MEDIA'],
            justification: 'I want to record from chrome.tabCapture API'
        });
    }

    const streamId = await chrome.tabCapture.getMediaStreamId({
        targetTabId: tab.id
    });

    chrome.runtime.sendMessage({
        type: 'start-recording',
        target: 'offscreen',
        data: streamId
    });
});