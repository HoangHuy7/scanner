// src/@types/quagga.d.ts
declare module 'quagga' {
    interface QuaggaConfig {
        inputStream: {
            type: string;
            constraints?: MediaStreamConstraints;
            target?: HTMLElement | null;
        };
        decoder: {
            readers: string[];
        };
    }

    interface QuaggaResult {
        codeResult: {
            code: string;
            format: string;
        };
        // Thêm các thuộc tính khác nếu cần
    }

    export function init(config: QuaggaConfig, callback: (err: Error | null) => void): void;
    export function start(): void;
    export function stop(): void;
    export function onDetected(callback: (result: QuaggaResult) => void): void;
    export function reset(): void;
}
