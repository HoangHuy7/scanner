// components/BarcodeGenerator.tsx
import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeGeneratorProps {
    value: string;
}

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({ value }) => {
    const barcodeRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, value, {
                format: 'CODE128',
                width: 2,
                height: 50,
                displayValue: true,
            });
        }
    }, [value]);

    return <canvas ref={barcodeRef} />;
};

export default BarcodeGenerator;
