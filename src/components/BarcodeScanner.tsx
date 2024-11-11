import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
    onScanSuccess: (decodedText: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(true);
    const [width, setWidth] = useState<number>(600); // Default width before resize

    // Handle resize events
    useEffect(() => {
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

    // Initialize the scanner and handle qrbox resize
    useEffect(() => {
        // Only initialize if scannerRef is not set yet
        if (scannerRef.current === null) {
            const scanner = new Html5QrcodeScanner(
                'reader',
                { fps: 10, qrbox: { width, height: width } }, // Responsive box
                false
            );

            scanner.render(
                (decodedText) => {
                    onScanSuccess(decodedText);
                    scanner.clear(); // Stop scanning after successful scan
                    setIsScanning(false);
                },
                (errorMessage) => {
                    console.log('Scan failed: ', errorMessage);
                }
            );

            scannerRef.current = scanner;
        } else {
            // If scanner already exists, just update qrbox size dynamically
            scannerRef.current.clear(); // Clear existing scanner
            const scanner = new Html5QrcodeScanner(
                'reader',
                { fps: 10, qrbox: { width, height: width } }, // Updated qrbox size
                false
            );

            scanner.render(
                (decodedText) => {
                    onScanSuccess(decodedText);
                    scanner.clear(); // Stop scanning after successful scan
                    setIsScanning(false);
                },
                (errorMessage) => {
                    console.log('Scan failed: ', errorMessage);
                }
            );

            scannerRef.current = scanner; // Update reference to new scanner
        }

        return () => {
            scannerRef.current?.clear();
        };
    }, [onScanSuccess, width]); // Re-run when width changes

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
            <div
                id="reader"
                style={{ width: '100%', maxWidth: `${width}px`, margin: 'auto' }}
            />
        </>
    );
};

export default BarcodeScanner;
