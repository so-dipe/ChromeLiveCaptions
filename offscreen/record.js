chrome.runtime.onMessage.addListener(async (message) => {
    if (message.target !== 'offscreen') return;

    if (message.type === 'start-recording') {
        const media = await navigator.mediaDevices.getUserMedia({
            audio : {
                mandatory: {
                    chromeMediaSource: 'tab',
                    chromeMediaSourceId: message.data
                },
            },
            video: false
        });
    };

    const output = new AudioContext();
    const source = output.createMediaStreamSource(media);
    source.connect(output.destination);
});