declare module 'react-barcode-reader' {
    import { Component } from 'react';

    interface BarcodeError {
        message: string;
    }

    interface BarcodeReaderProps {
        onError: (error: BarcodeError) => void; // Cập nhật kiểu ở đây
        onScan: (data: string) => void;
        style?: React.CSSProperties;
    }

    export default class BarcodeReader extends Component<BarcodeReaderProps> {}
}
