
const eventTarget = new EventTarget();

export function dispatch<D = unknown>(type: string, data: D) {
    const event = new CustomEvent(type, {
        detail: data
    });
    eventTarget.dispatchEvent(event)
}

export function addEvent<D = unknown>(type: string, listener: (d: D) => void) {
    const wrappedListener = (event: Event) => {
        const customEvent = event as CustomEvent<D>;
        listener(customEvent.detail);
    };

    eventTarget.addEventListener(type, wrappedListener);

    return () => eventTarget.removeEventListener(type, wrappedListener);
}