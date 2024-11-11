import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
    onScanSuccess: (decodedText: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(true);

    useEffect(() => {
        if (!scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                'reader',
                { fps: 10, qrbox: { width: 500, height: 300 } },
                false
            );

            scanner.render(
                (decodedText) => {
                    onScanSuccess(decodedText);
                    scanner.clear(); // Dừng quét sau khi quét thành công
                    setIsScanning(false);
                },
                (errorMessage) => {
                    console.log('Scan failed: ', errorMessage);
                }
            );

            scannerRef.current = scanner;
        }

        return () => {
            scannerRef.current?.clear();
        };
    }, [onScanSuccess]);

    const handleResumeScanning = () => {
        if (scannerRef.current) {
            setIsScanning(true);
            scannerRef.current.render(
                (decodedText) => {
                    onScanSuccess(decodedText);
                    scannerRef.current?.clear();
                    setIsScanning(false);
                },
                (errorMessage) => {
                    console.log('Scan failed: ', errorMessage);
                }
            );
        }
    };

    return (
        <>
            {!isScanning && (
                <button onClick={handleResumeScanning}>Quét lại</button>
            )}
            <div id="reader" style={{ width: '600px' }} />
        </>
    );
};

export default BarcodeScanner;
