import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
    onScanSuccess: (decodedText: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(true);
    const [width, setWidth] = useState<number>(600); // Default width before resize

    useEffect(() => {
        // This ensures window is only accessed in the browser
        const handleResize = () => {
            setWidth(window.innerWidth < 600 ? window.innerWidth * 0.9 : 600);
        };

        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth < 600 ? window.innerWidth * 0.9 : 600); // Initialize width on client-side
            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                'reader',
                { fps: 10, qrbox: { width: width, height: width } }, // Responsive box
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
        } else {
            // If scanner already initialized, stop and reinitialize with updated config
            scannerRef.current.clear();
            const scanner = new Html5QrcodeScanner(
                'reader',
                { fps: 10, qrbox: { width: width, height: width } },
                false
            );
            scanner.render(
                (decodedText) => {
                    onScanSuccess(decodedText);
                    scanner.clear();
                    setIsScanning(false);
                },
                (errorMessage) => {
                    console.log('Scan failed: ', errorMessage);
                }
            );
            scannerRef.current = scanner; // Update ref to the new scanner
        }

        return () => {
            scannerRef.current?.clear();
        };
    }, [onScanSuccess, width]);

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
            <div id="reader" style={{ width: '100%', maxWidth: `${width}px`, margin: 'auto' }} />
        </>
    );
};

export default BarcodeScanner;
