"use client"

import React, { useState} from 'react';
import BarcodeGenerator from "@/components/BarcodeGenerator";
import BarcodeScanner from '@/components/BarcodeScanner';
import BarcodeScanner2 from "@/components/BarcodeScanner2";
// import BarcodeScanner2 from "@/components/BarcodeScanner2";

const PageScan: React.FC = () => {
    const [barcodeValue, setBarcodeValue] = useState('123456789');
    const [scannedResult, setScannedResult] = useState('');
    return (
        <div>
            <h1>Tạo mã Barcode</h1>
            <BarcodeGenerator value={barcodeValue}/>
            <input
                type="text"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                placeholder="Nhập giá trị mã Barcode"
            />

            <h1>Quét mã Barcode</h1>
            {/*<BarcodeScanner onScanSuccess={(result) => setScannedResult(result)}/>*/}
            <BarcodeScanner2 />
            {/*<BarcodeScanner2 onScanSuccess={(result) => setScannedResult(result)}/>*/}
        </div>
    );
};

export default PageScan;
