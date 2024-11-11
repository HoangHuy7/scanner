import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScannerComponent: React.FC = () => {
    const videoRef = useRef<any>();
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                },
                target: videoRef.current,
            },
            decoder: {
                readers: ['code_128_reader']
            }
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((result) => {
            console.log(result.codeResult.code);
            setData(result.codeResult.code);
        });

        return () => {
            Quagga.stop();
        };
    }, []);

    return (
        <div className="scanner-container">
            <h1>Quét mã vạch</h1>
            <div ref={videoRef} className="video-container" />
            {data && <p className="result">Mã quét được: {data}</p>}
        </div>
    );
};

export default BarcodeScannerComponent;
